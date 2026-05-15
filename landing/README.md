# Luquisys — landing

Next.js 15 (App Router) + Tailwind. Páginas:

- `/` — Institucional Luquisys
- `/comparabot` — Página do produto ComparaBot

## Dev local

```bash
cd landing
npm install
npm run dev
```

Abre em http://localhost:3000.

## Deploy no Vercel

A partir da sua máquina (não roda do sandbox do Claude por causa do allowlist):

```bash
cd landing
npx vercel              # primeiro deploy (preview)
npx vercel --prod       # deploy de produção
```

Na primeira vez o Vercel pergunta:

- **Set up and deploy?** → Y
- **Which scope?** → sua conta
- **Link to existing project?** → N (na primeira)
- **Project name** → `luquisys`
- **In which directory is your code located?** → `./` (já estamos em `landing/`)

Alternativa: importar o repo `comparabot` em https://vercel.com/new e configurar:

- **Root Directory:** `landing`
- **Framework Preset:** Next.js (autodetectado)

## Domínio

Depois do primeiro deploy, em Vercel → Project → Settings → Domains, adicionar:

- `luquisys.com.br`
- `www.luquisys.com.br`

O Vercel mostra os registros DNS pra apontar (CNAME ou A). Adiciona esses
registros no Cloudflare (DNS → Records → Add record), com proxy laranja
ligado ou desligado conforme instrução do Vercel.
