# ComparaBot — Contexto para Claude Code

## O que é este projeto
Bot de WhatsApp que compara orçamentos. Usuário manda fotos ou textos de 2 a 5 orçamentos,
Claude Vision extrai os itens e Claude gera análise comparativa. SaaS com plano free
(3 comparações/mês) e pago (R$19/mês, ilimitado).

## Marca
ComparaBot é o primeiro produto sob a marca-guarda-chuva *Luquisys — Sistemas de Gestão*.
Domínio institucional: luquisys.com.br. URL do produto: luquisys.com.br/comparabot.
Novos produtos seguem o mesmo padrão (luquisys.com.br/<produto>).

## Stack
- **Backend (bot):** FastAPI + Uvicorn | Twilio WhatsApp | Anthropic (claude-sonnet-4-6) | PostgreSQL — deploy Railway
- **Landing (web):** Next.js 15 + React 19 + Tailwind — deploy Vercel
- Mesmo repo, separação por arquivos. Vercel usa `.vercelignore` pra ignorar Python; Railway usa NIXPACKS que ignora Next.js automaticamente.

## Arquivos
### Backend (Railway)
- `main.py` — FastAPI, webhook Twilio, endpoint /admin/ativar-pago
- `comparador_orcamentos.py` — lógica do bot: sessões, OCR, análise
- `database.py` — PostgreSQL: tabelas usuarios_bot e uso_mensal
- `railway.json` — start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Landing (Vercel)
- `app/page.tsx` — homepage Luquisys (institucional)
- `app/comparabot/page.tsx` — página do produto ComparaBot
- `app/layout.tsx`, `app/globals.css` — layout + estilos
- `public/logo.svg` — logo Luquisys
- `package.json`, `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs` — config Next/Tailwind
- `.vercelignore` — exclui arquivos Python do deploy Vercel

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
- Modelo sempre: claude-sonnet-4-6

## Próximas features
- [ ] Landing page Luquisys (luquisys.com.br) + página do produto (luquisys.com.br/comparabot)
- [ ] Webhook de pagamento automático (Stripe/Hotmart → /admin/ativar-pago)
- [ ] Histórico de comparações por usuário
- [ ] Nomear fornecedores no chat
