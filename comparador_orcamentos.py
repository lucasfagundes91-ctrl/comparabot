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
RE_ANALISAR = re.compile(r"\b(anali[sz]\w*|compar\w*|decid\w*|finaliz\w*|qual (escolho|compro|levo)|ver (an[aá]lise|resultado))\b", re.I)
RE_CANCELAR = re.compile(r"\b(cancel|sair|para(r)?|chega|encerr)\b", re.I)
RE_NOVO     = re.compile(r"\b(novo|recomeç|de novo|outra vez|reinicia)\b", re.I)
RE_AJUDA    = re.compile(r"\b(ajuda|help|como (usa|funciona)|oi|ol[aá]|bom dia|boa tarde|boa noite)\b", re.I)
RE_ASSINAR  = re.compile(r"\b(assinar|plano|pagar|upgrade|liberar|quero (mais|pago))\b", re.I)

LINK_PAGAMENTO = os.environ.get("LINK_PAGAMENTO", "https://luquisys.com.br/comparabot/assinar")


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
    "Retorne APENAS um objeto JSON puro, sem texto e sem markdown:\n"
    '{"itens":[{"descricao":"nome do item","qtd":1,"unidade":"un","preco":0.00,"total":0.00}],'
    '"frete":0.00,"desconto":0.00,"outras_despesas":0.00,"total_orcamento":0.00}\n\n'
    "REGRAS (siga à risca):\n"
    "1. preco = PREÇO UNITÁRIO do item — coluna 'P.Unit.', 'Preço Unl', 'Vl.Unit', "
    "'Unitário' ou similar. NUNCA use a coluna de total da linha como preco.\n"
    "2. total = TOTAL DA LINHA do item — coluna 'Total', 'Vl.Total', 'Subtotal'.\n"
    "3. qtd = quantidade do item — coluna 'Qtd', 'Qtde', 'Qtd.Ped'.\n"
    "4. Números estão em formato brasileiro: PONTO separa milhar, VÍRGULA separa decimal. "
    'Converta para ponto decimal. Ex: "1.293,60"->1293.60 ; "16.360,00"->16360.00 ; '
    '"40,90"->40.90 ; "5,2685"->5.2685.\n'
    "5. Extraia TODOS os itens de produto na lista 'itens'.\n"
    "6. frete = valor do frete (0 se não houver). desconto = valor do desconto/abatimento "
    "(número positivo, 0 se não houver). outras_despesas = outras taxas/despesas (0 se não houver).\n"
    "7. total_orcamento = o VALOR TOTAL FINAL impresso no orçamento — 'Valor Total', "
    "'Valor Líquido', 'Total a Pagar', 'Total (R$)'. É o que o cliente paga. 0 se não houver.\n"
    '8. Se algum campo de item faltar: qtd=1, unidade="un", total = qtd*preco.'
)

def _num(v):
    try:
        return float(v or 0)
    except (TypeError, ValueError):
        return 0.0

def _parse_orcamento(text):
    """Extrai o objeto {itens, frete, desconto, outras_despesas, total_orcamento}."""
    m = re.search(r"\{[\s\S]*\}", text)
    if not m:
        return {"itens": [], "frete": 0.0, "desconto": 0.0, "outras_despesas": 0.0, "total_orcamento": 0.0}
    try:
        data = json.loads(m.group())
    except Exception:
        return {"itens": [], "frete": 0.0, "desconto": 0.0, "outras_despesas": 0.0, "total_orcamento": 0.0}
    itens = []
    for it in data.get("itens", []):
        if not isinstance(it, dict):
            continue
        qtd   = _num(it.get("qtd")) or 1.0
        preco = _num(it.get("preco") or it.get("valor"))
        total = _num(it.get("total")) or (qtd * preco)
        itens.append({
            "descricao": str(it.get("descricao") or it.get("nome") or ""),
            "qtd": qtd,
            "unidade": str(it.get("unidade") or "un"),
            "preco": preco,
            "total": total,
        })
    return {
        "itens": itens,
        "frete": _num(data.get("frete")),
        "desconto": _num(data.get("desconto")),
        "outras_despesas": _num(data.get("outras_despesas")),
        "total_orcamento": _num(data.get("total_orcamento")),
    }

def _ocr_imagem(img_bytes, mt):
    b64 = base64.standard_b64encode(img_bytes).decode()
    msg = claude.messages.create(model="claude-sonnet-4-6", max_tokens=2000,
        messages=[{"role": "user", "content": [
            {"type": "image", "source": {"type": "base64", "media_type": mt, "data": b64}},
            {"type": "text", "text": f"Extraia os dados deste orçamento.\n{_JSON_INSTRUCAO}"},
        ]}])
    dados = _parse_orcamento(msg.content[0].text)
    print(f"[OCR imagem] {len(dados['itens'])} itens | frete={dados['frete']} "
          f"desc={dados['desconto']} total={dados['total_orcamento']} :: {dados}")
    return dados

def _extrair_texto(texto):
    msg = claude.messages.create(model="claude-sonnet-4-6", max_tokens=2000,
        messages=[{"role": "user", "content": f"Extraia os dados do orçamento.\n{_JSON_INSTRUCAO}\n\n{texto}"}])
    dados = _parse_orcamento(msg.content[0].text)
    print(f"[OCR texto] {len(dados['itens'])} itens | frete={dados['frete']} "
          f"desc={dados['desconto']} total={dados['total_orcamento']} :: {dados}")
    return dados


def _fmt_brl(n):
    return f"R$ {n:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

def _item_total(it):
    """Total da linha extraído do documento; cai pra qtd*preco se faltar."""
    return it.get("total") or (it["qtd"] * it["preco"])

def _soma_itens(orc):
    return sum(_item_total(it) for it in orc["itens"])

def _orc_total(orc):
    """Total final do orçamento. Usa o total impresso no documento se houver;
    senão soma itens + frete + outras despesas - desconto."""
    impresso = orc.get("total_orcamento") or 0
    if impresso:
        return impresso
    return (_soma_itens(orc) + orc.get("frete", 0)
            + orc.get("outras_despesas", 0) - orc.get("desconto", 0))

def _bloco_orc(orc):
    linhas = [f"## {orc['nome']} — Total final: {_fmt_brl(_orc_total(orc))}"]
    for it in orc["itens"]:
        linhas.append(f"- {it['descricao']}: {it['qtd']} {it['unidade']} × {_fmt_brl(it['preco'])} = {_fmt_brl(_item_total(it))}")
    linhas.append(f"Subtotal itens: {_fmt_brl(_soma_itens(orc))}")
    if orc.get("frete"):
        linhas.append(f"Frete: +{_fmt_brl(orc['frete'])}")
    if orc.get("outras_despesas"):
        linhas.append(f"Outras despesas: +{_fmt_brl(orc['outras_despesas'])}")
    if orc.get("desconto"):
        linhas.append(f"Desconto: -{_fmt_brl(orc['desconto'])}")
    return "\n".join(linhas)

def _analisar(orcamentos):
    bloco = "\n\n".join(_bloco_orc(o) for o in orcamentos)
    prompt = (
        "Você é especialista em compras. Analise os orçamentos abaixo e responda "
        "em português, formatado para WhatsApp (*negrito*, emojis, listas com traço).\n\n"
        f"{bloco}\n\n"
        "Instruções:\n"
        "- O 'Total final' de cada orçamento já inclui frete, despesas e desconto.\n"
        "- O mesmo produto aparece com nomes diferentes entre fornecedores "
        "(ex: 'FERRO CA-50 10mm' = 'VERGALHAO CA50 10MM') — agrupe-os.\n"
        "- Cuidado com unidades diferentes (preço por barra vs por kg): só compare "
        "preços na mesma unidade; se não der pra comparar um item, avise.\n\n"
        "Estruture a resposta EXATAMENTE assim:\n"
        "*📊 Resumo* — total final de cada fornecedor e a diferença em R$ e %.\n"
        "*🔎 Item a item* — para cada produto, diga qual fornecedor está mais barato "
        "e por quanto. Marque o vencedor de cada item com ✅.\n"
        "*🛒 Melhor combinação* — comprando cada item no fornecedor mais barato, "
        "qual o total e quanto economiza vs fechar tudo num só lugar.\n"
        "*⚠️ Atenção* — frete alto, desconto, item faltando, unidade incompatível.\n"
        "*🏆 Recomendação* — veredito direto: fechar tudo com quem, ou se vale dividir.\n\n"
        "Seja objetivo. Máximo ~1400 caracteres."
    )
    msg = claude.messages.create(model="claude-sonnet-4-6", max_tokens=1500,
        messages=[{"role": "user", "content": prompt}])
    return msg.content[0].text.strip()


MSG_BOAS_VINDAS = (
    "👋 Olá! Sou o *ComparaBot* da *Luquisys* — comparo orçamentos pra você na hora.\n\n"
    "📋 Me manda a *foto* ou o *texto* do primeiro orçamento.\n\n"
    "_Plano gratuito: {restantes} comparação(ões) disponível(eis) este mês._\n"
    "_Saiba mais: luquisys.com.br/comparabot_"
)
MSG_LIMITE = (
    "⚠️ Você atingiu o limite de *{limite} comparações gratuitas* este mês.\n\n"
    "Para continuar, assine por *R$ 19/mês*:\n"
    f"👉 {LINK_PAGAMENTO}\n\n"
    "💡 *Dica:* o ComparaBot Pro vem *grátis* pra quem assina qualquer outro sistema da Luquisys (BankPro, LuquiPDV, FarmPro, etc).\n"
    "_Conheça: luquisys.com.br_\n\n"
    "_Suas comparações voltam em 1º do próximo mês._"
)
MSG_CANCELADO   = "Tudo bem! Sessão encerrada. Me chama quando precisar. 👋"
MSG_PRECISA_2   = "Preciso de pelo menos *2 orçamentos* para comparar. Manda mais um! 📋"
MSG_LIMITE_5    = "Já tenho 5 orçamentos — máximo! Digite *analisar* para comparar ou *novo* para recomeçar."
MSG_ERRO_IMAGEM = "Não consegui ler a imagem. 😕 Tenta uma foto mais nítida, ou digita os itens:\n_5 sacos cimento R$35 cada_"
MSG_ERRO_TEXTO  = "Não consegui identificar itens. 🤔\nEx: _Cimento 5 sacos R$35 cada_"
MSG_ASSINAR     = (
    f"Para assinar o plano ilimitado por *R$ 19/mês*:\n👉 {LINK_PAGAMENTO}\n\n"
    "💡 Ou ganhe *grátis* assinando qualquer outro sistema Luquisys (BankPro, LuquiPDV, FarmPro, etc): luquisys.com.br"
)

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
        dados = _ocr_imagem(img_bytes, mt)
    except Exception as e:
        return f"{MSG_ERRO_IMAGEM}\n_(Detalhe: {e})_"
    if not dados["itens"]:
        return MSG_ERRO_IMAGEM
    return _salvar_orc(phone, s, dados)

def _processar_texto(phone, s, body):
    try:
        dados = _extrair_texto(body)
    except Exception as e:
        return f"Erro ao processar texto: {e}"
    if not dados["itens"]:
        return MSG_ERRO_TEXTO
    return _salvar_orc(phone, s, dados)

def _salvar_orc(phone, s, dados):
    n     = len(s["orcamentos"])
    nome  = f"Fornecedor {n + 1}"
    itens = dados["itens"]
    orc = {
        "nome": nome,
        "itens": itens,
        "frete": dados["frete"],
        "desconto": dados["desconto"],
        "outras_despesas": dados["outras_despesas"],
        "total_orcamento": dados["total_orcamento"],
    }
    s["orcamentos"].append(orc)
    s["state"] = "coletando"
    _save(phone, s)
    preview = "\n".join(f"  • {it['descricao']}: {it['qtd']} {it['unidade']} · {_fmt_brl(it['preco'])}" for it in itens[:4])
    mais = f"\n  _(...+{len(itens)-4} itens)_" if len(itens) > 4 else ""
    extras = ""
    if orc["frete"]:
        extras += f"\n  _frete +{_fmt_brl(orc['frete'])}_"
    if orc["outras_despesas"]:
        extras += f"\n  _outras despesas +{_fmt_brl(orc['outras_despesas'])}_"
    if orc["desconto"]:
        extras += f"\n  _desconto -{_fmt_brl(orc['desconto'])}_"
    return (f"✅ *{nome} salvo!* ({len(itens)} item(s) · total {_fmt_brl(_orc_total(orc))})\n\n"
            f"{preview}{mais}{extras}\n\n{_msg_proximo(n + 1)}")
