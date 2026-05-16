# Luqsys — Contexto para Claude Code

## O que é este repo
Casa da marca-guarda-chuva **Luqsys — Sistemas de Gestão**. Hospeda dois deploys distintos a partir do mesmo repositório:

1. **Landing institucional (Vercel)** — Next.js 15 + React 19 + Tailwind, na raiz. Páginas por produto em `app/<produto>/page.tsx`. URLs sempre no formato `www.luqsys.com.br/<produto>` (path-based, nunca subdomínio).
2. **ComparaBot (Railway)** — bot WhatsApp original da Luqsys, FastAPI + Twilio + Anthropic + Postgres. Vive em `bot/`. SaaS free 3/mês, pago R$19/mês.

Cada nova landing de produto vira uma rota em `app/<produto>/page.tsx`. Backends próprios de cada produto vivem em seus próprios repos.

## Estrutura
```
luqsys/
├── app/                          # Next.js (Vercel)
│   ├── page.tsx                  # home Luqsys (www.luqsys.com.br)
│   ├── comparabot/page.tsx       # www.luqsys.com.br/comparabot
│   ├── bankpro/page.tsx          # www.luqsys.com.br/bankpro
│   ├── farmpro/, frotapro/, pdvpro/, ...
│   ├── _components/              # shared
│   ├── layout.tsx, globals.css
├── public/                       # assets Next
├── bot/                          # ComparaBot (Railway)
│   ├── main.py                   # FastAPI + webhook Twilio
│   ├── comparador_orcamentos.py  # lógica do bot
│   ├── database.py               # Postgres
│   ├── requirements.txt
│   └── railway.json              # startCommand: uvicorn main:app
├── package.json, next.config.mjs, tailwind.config.ts, tsconfig.json
├── .vercelignore                 # ignora bot/
└── .gitignore
```

## Deploys
- **Vercel** projeto `luquisys` (team `luqui-sys`). Auto-deploy no push em main. `.vercelignore` exclui `bot/`. Domínio: `www.luqsys.com.br`.
- **Railway** projeto `comparabot` (id `5020e58b-e0c9-448e-a78d-6c90c8794a38`), serviço `comparabot` com **root directory = `bot/`**. Postgres anexado. Auto-deploy no push em main. Domínio: `https://comparabot-production.up.railway.app`. Webhook Twilio aponta pra `/webhook/whatsapp`.

## Variáveis de ambiente (Railway)
ANTHROPIC_API_KEY, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER, DATABASE_URL (Postgres), LINK_PAGAMENTO (default `https://www.luqsys.com.br/comparabot/assinar`), ADMIN_SECRET.

## Fluxo do bot
idle → coletando → [analisar] → idle. Sessões por telefone, TTL 60min, máx 5 orçamentos, mín 2.

## Padrões
- URLs sempre `www.luqsys.com.br/<produto>` — nunca subdomínio (`produto.luqsys.com.br`) nem só path raiz
- Validar Python: `python3 -m py_compile bot/main.py bot/comparador_orcamentos.py bot/database.py`
- Commits: `vX.Y: descrição breve`
- WhatsApp: *negrito*, _itálico_, máx 1500 chars (`_dividir`)
- Modelo Anthropic: `claude-sonnet-4-6`

## Token Railway
Token de conta em `~/.railway_token`. Usar como `RAILWAY_API_TOKEN` (não `RAILWAY_TOKEN`).
