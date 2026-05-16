import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ComparaBot — Compare orçamentos no WhatsApp",
  description:
    "Manda foto ou texto de 2 a 5 orçamentos pro WhatsApp e receba em segundos qual fornecedor é mais barato, item a item.",
};

const WHATSAPP_LINK =
  "https://wa.me/15559312876?text=" +
  encodeURIComponent("Oi! Quero comparar orçamentos.");

const steps = [
  {
    n: "1",
    titulo: "Manda os orçamentos",
    texto:
      "Foto, PDF ou texto colado — de 2 a 5 orçamentos por comparação. Tudo direto no WhatsApp.",
  },
  {
    n: "2",
    titulo: "A IA extrai e compara",
    texto:
      "Claude Vision lê cada item, identifica produtos iguais com nomes diferentes e considera frete, desconto e despesas.",
  },
  {
    n: "3",
    titulo: "Recebe o veredito",
    texto:
      "Resumo por fornecedor, item a item com vencedor de cada, melhor combinação dividindo a compra e recomendação direta.",
  },
];

const features = [
  "Funciona com foto, PDF ou texto livre",
  "Entende formato brasileiro (R$ 1.293,60)",
  "Agrupa o mesmo item escrito de jeitos diferentes",
  "Considera frete, desconto e outras despesas",
  "Sugere a melhor combinação dividindo a compra",
  "Mensagens curtas e diretas, formato WhatsApp",
];

export default function ComparaBot() {
  return (
    <main className="radial-bg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Luquisys" className="h-9 w-9" />
          <span className="text-sm font-semibold tracking-[0.2em] text-gold">
            LUQUISYS
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-neutral-400 transition hover:text-gold"
        >
          ← Voltar
        </Link>
      </nav>

      <section className="mx-auto max-w-4xl px-6 pb-16 pt-12 text-center sm:pt-20">
        <span className="inline-block rounded-full border border-gold-dim/60 bg-gold-dark/30 px-3 py-1 text-xs font-medium tracking-wider text-gold">
          UM PRODUTO LUQUISYS
        </span>
        <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
          <span className="gold-gradient-text">ComparaBot</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl">
          Manda <strong className="text-white">foto ou texto</strong> de 2 a 5
          orçamentos no WhatsApp e receba em <strong className="text-white">segundos</strong>{" "}
          qual fornecedor é mais barato — item a item.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-bg transition hover:bg-gold-bright"
          >
            Começar grátis no WhatsApp
          </a>
          <a
            href="#planos"
            className="rounded-full border border-gold-dim px-7 py-3 text-sm font-semibold text-gold transition hover:border-gold"
          >
            Ver planos
          </a>
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          3 comparações grátis por mês. Sem cadastro.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Como funciona
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-neutral-900 bg-bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-bg font-bold">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {s.texto}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          O que ele faz
        </h2>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 rounded-xl border border-neutral-900 bg-bg-soft px-4 py-3 text-sm text-neutral-200"
            >
              <span className="mt-0.5 text-gold">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="planos" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Planos</h2>
        <p className="mt-3 text-center text-neutral-400">
          Comece grátis. Assine quando precisar de mais — ou ganhe junto com outro sistema Luquisys.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-neutral-900 bg-bg-card p-8">
            <h3 className="text-xl font-bold">Grátis</h3>
            <p className="mt-1 text-sm text-neutral-400">
              Pra testar e usar de vez em quando
            </p>
            <p className="mt-6 text-4xl font-black">
              R$ 0<span className="text-base font-medium text-neutral-500">/mês</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-neutral-300">
              <li>✓ 3 comparações por mês</li>
              <li>✓ Até 5 orçamentos por comparação</li>
              <li>✓ Foto, PDF ou texto</li>
              <li>✓ 1 número WhatsApp</li>
            </ul>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-full border border-gold-dim px-6 py-3 text-center text-sm font-semibold text-gold transition hover:border-gold"
            >
              Começar agora
            </a>
          </div>

          <div className="relative rounded-2xl border border-gold-dim bg-bg-card p-8 shadow-gold">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-xs font-bold text-bg">
              MAIS POPULAR
            </span>
            <h3 className="text-xl font-bold text-gold">Pro</h3>
            <p className="mt-1 text-sm text-neutral-400">
              Pra quem compara toda semana
            </p>
            <p className="mt-6 text-4xl font-black">
              R$ 9<span className="text-base font-medium text-neutral-500">/mês</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-neutral-300">
              <li>✓ Comparações <strong className="text-white">ilimitadas</strong></li>
              <li>✓ Até 5 orçamentos por comparação</li>
              <li>✓ Foto, PDF ou texto</li>
              <li>✓ 1 número WhatsApp</li>
              <li>✓ Suporte prioritário</li>
            </ul>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-bg transition hover:bg-gold-bright"
            >
              Assinar Pro
            </a>
          </div>

          <div className="rounded-2xl border border-neutral-900 bg-bg-card p-8">
            <h3 className="text-xl font-bold">Equipe</h3>
            <p className="mt-1 text-sm text-neutral-400">
              Pra família ou equipe pequena
            </p>
            <p className="mt-6 text-4xl font-black">
              R$ 29<span className="text-base font-medium text-neutral-500">/mês</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-neutral-300">
              <li>✓ Tudo do Pro</li>
              <li>✓ Até 5 números WhatsApp</li>
              <li>✓ Histórico compartilhado</li>
              <li>✓ Relatório mensal por número</li>
              <li>✓ Suporte prioritário</li>
            </ul>
            <a
              href="mailto:contato@luquisys.com.br?subject=Quero%20o%20ComparaBot%20Equipe"
              className="mt-8 block rounded-full border border-gold-dim px-6 py-3 text-center text-sm font-semibold text-gold transition hover:border-gold"
            >
              Falar com a gente
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gold-dim bg-gradient-to-br from-gold-dark/40 to-bg-card p-8 shadow-gold">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <span className="inline-block rounded-full border border-gold-dim/60 bg-gold-dark/30 px-3 py-1 text-xs font-bold tracking-wider text-gold">
                BÔNUS LUQUISYS
              </span>
              <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Grátis pra clientes Luquisys
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
                Assinando <strong className="text-gold">qualquer outro sistema da Luquisys</strong> (BankPro, PDV Pro, FarmPro, ObraPro, PontoPro e outros), o <strong className="text-white">ComparaBot Pro vem incluso sem custo extra</strong> — comparações ilimitadas no WhatsApp.
              </p>
            </div>
            <Link
              href="/#trilhas"
              className="shrink-0 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-bg transition hover:bg-gold-bright"
            >
              Ver sistemas Luquisys
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Pronto pra economizar na próxima compra?
        </h2>
        <p className="mt-4 text-neutral-400">
          Sem cadastro, sem app. Só manda os orçamentos no WhatsApp.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-gold px-8 py-4 text-base font-semibold text-bg transition hover:bg-gold-bright"
        >
          Abrir no WhatsApp
        </a>
      </section>

      <footer className="border-t border-neutral-900 px-6 py-10 text-center text-sm text-neutral-500">
        <p>
          <Link href="/" className="hover:text-gold">
            Luquisys
          </Link>{" "}
          · ComparaBot · © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
