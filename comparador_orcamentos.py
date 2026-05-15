"""
comparador_orcamentos.py
========================
Lógica do bot de comparação de orçamentos via WhatsApp.
Aceita fotos (OCR via Claude Vision) e textos livres.
Suporta 2 a 5 orçamentos por sessão.
"""

import os
import re
import json
import base64
import requests
import anthropic
from typing import Optional

import database as db

claude = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

RE_ATIVAR   = re.compile(r"\b(compar|or[çc]amento|or[çc]ar|mais barato|melhor pre[çc]o|cot[ao])\b", re.I)
RE_ANALISAR = re.compile(r"\b(anali[sz]|comparar|compara|decide|qual (escolho|compro|levo)|ver (an[aá]lise|resultado))\b", re.I)
RE_CANCELAR = re.compile(r"\b(cancel|sair|para(r)?|chega|encerr)\b", re.I)
RE_NOVO     = re.compile(r"\b(novo|recomeç|de novo|outra vez|reinicia)\b", re.I)
RE_AJUDA    = re.compile(r"\b(ajuda|help|como (usa|funciona)|oi|ol[aá]|bom dia|boa tarde|boa noite)\b", re.I)
RE_ASSINAR  = re.compile(r"\b(assinar|plano|pagar|upgrade|liberar|quero (mais|pago))\b", re.I)

LINK_PAGAMENTO = os.environ.get("LINK_PAGAMENTO", "https://seusite.com/assinar")


def _session(phone):
    """Sessão persistida no Postgres — sobrevive a restart/redeploy do Railway.
    Retorna a sessão salva, ou uma transitória 'idle' (só vai pro banco no _save)."""
    s = db.get_sessao(phone)
    if s is None:
        return {"state": "idle", "orcamentos": []}
    return s

def _save(phone, s):
    db.salvar_sessao(phone, s["state"], s["orcamentos"])

def _reset(phone):
    db.deletar_sessao(phone)


def _baixar_midia(url):
    r = requests.get(url, auth=(os.environ["TWILIO_ACCOUNT_SID"], os.environ["TWILIO_AUTH_TOKEN"]), timeout=20)
    r.raise_for_status()
    mt = r.headers.get("Content-Type", "image/jpeg").split(";")[0]
    return r.content, mt


_JSON_INSTRUCAO = (
    "Retorne APENAS um array JSON puro, sem texto e sem markdown:\n"
    '[{"descricao":"nome do item","qtd":1,"unidade":"un","preco":0.00,"total":0.00}]\n\n'
    "REGRAS (siga à risca):\n"
    "1. preco = PREÇO UNITÁRIO do item — coluna 'P.Unit.', 'Preço Unl', 'Vl.Unit', "
    "'Unitário' ou similar. NUNCA use a coluna de total da linha como preco.\n"
    "2. total = TOTAL DA LINHA do item — coluna 'Total', 'Vl.Total', 'Subtotal'.\n"
    "3. qtd = quantidade do item — coluna 'Qtd', 'Qtde', 'Qtd.Ped', 'Qtde'.\n"
    "4. Números estão em formato brasileiro: PONTO separa milhar, VÍRGULA separa decimal. "
    'Converta para ponto decimal. Ex: "1.293,60"->1293.60 ; "16.360,00"->16360.00 ; '
    '"40,90"->40.90 ; "5,2685"->5.2685.\n'
    "5. Extraia TODOS os itens de produto. IGNORE linhas de frete, desconto, impostos "
    "e total geral do orçamento.\n"
    '6. Se algum campo faltar: qtd=1, unidade="un", e total = qtd*preco.'
)

def _parse_itens(text):
    m = re.search(r"\[[\s\S]*\]", text)
    if not m:
        return []
    try:
        data = json.loads(m.group())
    except Exception:
        return []
    itens = []
    for it in data:
        if not isinstance(it, dict):
            continue
        qtd   = float(it.get("qtd") or 1)
        preco = float(it.get("preco") or it.get("valor") or 0)
        total = float(it.get("total") or 0) or (qtd * preco)
        itens.append({
            "descricao": str(it.get("descricao") or it.get("nome") or ""),
            "qtd": qtd,
            "unidade": str(it.get("unidade") or "un"),
            "preco": preco,
            "total": total,
        })
    return itens

def _ocr_imagem(img_bytes, mt):
    b64 = base64.standard_b64encode(img_bytes).decode()
    msg = claude.messages.create(model="claude-sonnet-4-6", max_tokens=1500,
        messages=[{"role": "user", "content": [
            {"type": "image", "source": {"type": "base64", "media_type": mt, "data": b64}},
            {"type": "text", "text": f"Extraia todos os itens deste orçamento.\n{_JSON_INSTRUCAO}"},
        ]}])
    itens = _parse_itens(msg.content[0].text)
    print(f"[OCR imagem] {len(itens)} itens: {itens}")
    return itens

def _extrair_texto(texto):
    msg = claude.messages.create(model="claude-sonnet-4-6", max_tokens=1500,
        messages=[{"role": "user", "content": f"Extraia os itens do orçamento.\n{_JSON_INSTRUCAO}\n\n{texto}"}])
    itens = _parse_itens(msg.content[0].text)
    print(f"[OCR texto] {len(itens)} itens: {itens}")
    return itens


def _fmt_brl(n):
    return f"R$ {n:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

def _item_total(it):
    """Total da linha extraído do documento; cai pra qtd*preco se faltar."""
    return it.get("total") or (it["qtd"] * it["preco"])

def _orc_total(orc):
    return sum(_item_total(it) for it in orc["itens"])

def _bloco_orc(orc):
    linhas = [f"## {orc['nome']} — Total: {_fmt_brl(_orc_total(orc))}"]
    for it in orc["itens"]:
        linhas.append(f"- {it['descricao']}: {it['qtd']} {it['unidade']} × {_fmt_brl(it['preco'])} = {_fmt_brl(_item_total(it))}")
    return "\n".join(linhas)

def _analisar(orcamentos):
    bloco = "\n\n".join(_bloco_orc(o) for o in orcamentos)
    prompt = (
        "Você é especialista em análise de orçamentos. Compare os abaixo em português, "
        "formatado para WhatsApp (*negrito*, emojis, listas com traço).\n\n"
        f"{bloco}\n\n"
        "Inclua: *Resumo* (totais e %), *Item a item*, *Pontos de atenção*, *Recomendação*.\n"
        "Seja direto. Máximo ~900 caracteres."
    )
    msg = claude.messages.create(model="claude-sonnet-4-6", max_tokens=1200,
        messages=[{"role": "user", "content": prompt}])
    return msg.content[0].text.strip()


MSG_BOAS_VINDAS = (
    "👋 Olá! Sou o *ComparaBot* — comparo orçamentos pra você na hora.\n\n"
    "📋 Me manda a *foto* ou o *texto* do primeiro orçamento.\n\n"
    "_Plano gratuito: {restantes} comparação(ões) disponível(eis) este mês._"
)
MSG_LIMITE = (
    "⚠️ Você atingiu o limite de *{limite} comparações gratuitas* este mês.\n\n"
    "Para continuar, assine por *R$ 19/mês*:\n"
    f"👉 {LINK_PAGAMENTO}\n\n"
    "_Suas comparações voltam em 1º do próximo mês._"
)
MSG_CANCELADO   = "Tudo bem! Sessão encerrada. Me chama quando precisar. 👋"
MSG_PRECISA_2   = "Preciso de pelo menos *2 orçamentos* para comparar. Manda mais um! 📋"
MSG_LIMITE_5    = "Já tenho 5 orçamentos — máximo! Digite *analisar* para comparar ou *novo* para recomeçar."
MSG_ERRO_IMAGEM = "Não consegui ler a imagem. 😕 Tenta uma foto mais nítida, ou digita os itens:\n_5 sacos cimento R$35 cada_"
MSG_ERRO_TEXTO  = "Não consegui identificar itens. 🤔\nEx: _Cimento 5 sacos R$35 cada_"
MSG_ASSINAR     = f"Para assinar o plano ilimitado por *R$ 19/mês*:\n👉 {LINK_PAGAMENTO}"

def _msg_proximo(n):
    if n < 2:
        return "Manda o próximo orçamento (foto ou texto). 📋"
    restam = 5 - n
    return (f"Já tenho *{n} orçamento(s)*.\n\n"
            "• Manda mais foto/texto para adicionar\n"
            "• Digite *analisar* para comparar agora\n"
            + (f"_({restam} vaga(s) restante(s))_" if restam > 0 else "_(limite de 5 atingido)_"))


def handle(phone, body, media_url=None, media_type=None, num_media=0):
    phone = phone.replace("whatsapp:", "").strip()
    body  = (body or "").strip()
    s     = _session(phone)
    state = s["state"]

    if RE_CANCELAR.search(body) and state != "idle":
        _reset(phone)
        return MSG_CANCELADO

    if RE_NOVO.search(body):
        _reset(phone); s = _session(phone); state = "idle"

    if RE_ASSINAR.search(body):
        return MSG_ASSINAR

    if state == "idle":
        if not (RE_ATIVAR.search(body) or RE_AJUDA.search(body) or num_media > 0):
            return ""
        pode, usadas, limite = db.pode_comparar(phone)
        if not pode:
            return MSG_LIMITE.format(limite=limite)
        s["state"] = "coletando"
        _save(phone, s)
        if num_media > 0 and media_url:
            return _processar_midia(phone, s, media_url, media_type)
        return MSG_BOAS_VINDAS.format(restantes=limite - usadas)

    if state == "coletando":
        n = len(s["orcamentos"])

        if RE_ANALISAR.search(body) and not num_media:
            if n < 2:
                return MSG_PRECISA_2
            pode, _, _ = db.pode_comparar(phone)
            if not pode:
                return MSG_LIMITE.format(limite=db.LIMITE_FREE)
            try:
                analise = _analisar(s["orcamentos"])
            except Exception as e:
                return f"Erro ao gerar análise: {e}"
            db.incrementar_comparacao(phone)
            resumos = "\n".join(f"  {i+1}. *{o['nome']}* — {_fmt_brl(_orc_total(o))}"
                                for i, o in enumerate(s["orcamentos"]))
            resposta = f"📊 *Comparativo de Orçamentos*\n\n{resumos}\n\n{analise}\n\n_Digite *novo* para comparar outros orçamentos._"
            _reset(phone)
            return resposta

        if n >= 5:
            return MSG_LIMITE_5
        if num_media > 0 and media_url:
            return _processar_midia(phone, s, media_url, media_type)
        if body and len(body) >= 8:
            return _processar_texto(phone, s, body)
        return "Me manda a foto ou o texto do orçamento. 📋"

    return ""


def _processar_midia(phone, s, media_url, media_type):
    try:
        img_bytes, mt = _baixar_midia(media_url)
        itens = _ocr_imagem(img_bytes, mt)
    except Exception as e:
        return f"{MSG_ERRO_IMAGEM}\n_(Detalhe: {e})_"
    if not itens:
        return MSG_ERRO_IMAGEM
    return _salvar_orc(phone, s, itens)

def _processar_texto(phone, s, body):
    try:
        itens = _extrair_texto(body)
    except Exception as e:
        return f"Erro ao processar texto: {e}"
    if not itens:
        return MSG_ERRO_TEXTO
    return _salvar_orc(phone, s, itens)

def _salvar_orc(phone, s, itens):
    n = len(s["orcamentos"])
    nome = f"Fornecedor {n + 1}"
    s["orcamentos"].append({"nome": nome, "itens": itens})
    s["state"] = "coletando"
    _save(phone, s)
    total = sum(_item_total(it) for it in itens)
    preview = "\n".join(f"  • {it['descricao']}: {it['qtd']} {it['unidade']} · {_fmt_brl(it['preco'])}" for it in itens[:4])
    mais = f"\n  _(...+{len(itens)-4} itens)_" if len(itens) > 4 else ""
    return (f"✅ *{nome} salvo!* ({len(itens)} item(s) · {_fmt_brl(total)})\n\n"
            f"{preview}{mais}\n\n{_msg_proximo(n + 1)}")
