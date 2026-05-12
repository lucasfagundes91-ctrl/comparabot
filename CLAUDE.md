# ComparaBot — Contexto para Claude Code

## O que é este projeto
Bot de WhatsApp que compara orçamentos. Usuário manda fotos ou textos de 2 a 5 orçamentos,
Claude Vision extrai os itens e Claude gera análise comparativa. SaaS com plano free
(3 comparações/mês) e pago (R$19/mês, ilimitado).

## Stack
- FastAPI + Uvicorn | Twilio WhatsApp | Anthropic API (claude-sonnet-4-20250514) | PostgreSQL Railway
- Deploy: Railway — start command: uvicorn main:app --host 0.0.0.0 --port $PORT

## Arquivos
- main.py — FastAPI, webhook Twilio, endpoint /admin/ativar-pago
- comparador_orcamentos.py — lógica do bot: sessões, OCR, análise
- database.py — PostgreSQL: tabelas usuarios_bot e uso_mensal

## Variáveis de ambiente (Railway)
ANTHROPIC_API_KEY, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
TWILIO_WHATSAPP_NUMBER (ex: whatsapp:+15559312876),
DATABASE_URL (injetado pelo plugin Postgres),
LINK_PAGAMENTO, ADMIN_SECRET

## Fluxo do bot
idle → coletando → [analisar] → idle
Sessões isoladas por telefone, TTL 60min, máximo 5 orçamentos, mínimo 2 para analisar.

## Padrões
- Sempre validar: python3 -m py_compile main.py comparador_orcamentos.py database.py
- Commits: vX.Y: descrição breve
- Mensagens WhatsApp: *negrito*, _itálico_, máx 1500 chars (função _dividir cuida disso)
- Modelo sempre: claude-sonnet-4-20250514

## Próximas features
- [ ] Landing page de vendas
- [ ] Webhook de pagamento automático (Stripe/Hotmart → /admin/ativar-pago)
- [ ] Histórico de comparações por usuário
- [ ] Nomear fornecedores no chat
