import Link from "next/link";
import type { ReactNode } from "react";

export type Plano = {
  nome: string;
  precoLabel: string;
  precoDe?: string;
  publico: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  destaque?: boolean;
};

export type Passo = { n: string; titulo: string; texto: string };

export type ProductPageProps = {
  icone: string;
  nome: string;
  tagline: string;
  descricao: ReactNode;
  ctaPrimaria?: { label: string; href: string };
  ctaSecundaria?: { label: string; href: string };
  rodapeHero?: string;
  passos?: Passo[];
  passosTitulo?: string;
  features: string[];
  featuresTitulo?: string;
  planos: Plano[];
  bonusLuquisys?: boolean;
  ctaFinalTitulo?: string;
  ctaFinalTexto?: string;
};

export function ProductLayout({
  icone,
  nome,
  tagline,
  descricao,
  ctaPrimaria,
  ctaSecundaria,
  rodapeHero,
  passos,
  passosTitulo = "Como funciona",
  features,
  featuresTitulo = "O que ele faz",
  planos,
  bonusLuquisys = true,
  ctaFinalTitulo,
  ctaFinalTexto,
}: ProductPageProps) {
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
          UM SISTEMA LUQUISYS
        </span>
        <div className="mt-6 text-5xl">{icone}</div>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
          <span className="gold-gradient-text">{nome}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-neutral-200 sm:text-lg">
          {tagline}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl">
          {descricao}
        </p>

        {(ctaPrimaria || ctaSecundaria) && (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {ctaPrimaria && (
              <a
                href={ctaPrimaria.href}
                target={
                  ctaPrimaria.href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  ctaPrimaria.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-bg transition hover:bg-gold-bright"
              >
                {ctaPrimaria.label}
              </a>
            )}
            {ctaSecundaria && (
              <a
                href={ctaSecundaria.href}
                className="rounded-full border border-gold-dim px-7 py-3 text-sm font-semibold text-gold transition hover:border-gold"
              >
                {ctaSecundaria.label}
              </a>
            )}
          </div>
        )}

        {rodapeHero && (
          <p className="mt-4 text-xs text-neutral-500">{rodapeHero}</p>
        )}
      </section>

      {passos && passos.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            {passosTitulo}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {passos.map((s) => (
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
      )}

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {featuresTitulo}
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
          Sem fidelidade. Cancele quando quiser.
        </p>

        <div
          className={`mt-12 grid gap-6 ${
            planos.length === 1
              ? "sm:max-w-md sm:mx-auto"
              : planos.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {planos.map((p) => (
            <div
              key={p.nome}
              className={`relative rounded-2xl border p-8 ${
                p.destaque
                  ? "border-gold-dim bg-bg-card shadow-gold"
                  : "border-neutral-900 bg-bg-card"
              }`}
            >
              {p.destaque && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-xs font-bold text-bg">
                  MAIS POPULAR
                </span>
              )}
              <h3
                className={`text-xl font-bold ${p.destaque ? "text-gold" : ""}`}
              >
                {p.nome}
              </h3>
              <p className="mt-1 text-sm text-neutral-400">{p.publico}</p>
              <div className="mt-6">
                {p.precoDe && (
                  <p className="text-sm text-neutral-500 line-through">
                    {p.precoDe}/mês
                  </p>
                )}
                <p className="text-4xl font-black">
                  {p.precoLabel}
                  {!p.precoLabel.includes("/") &&
                    !p.precoLabel.toLowerCase().includes("grátis") && (
                      <span className="text-base font-medium text-neutral-500">
                        /mês
                      </span>
                    )}
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-neutral-300">
                {p.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
              <a
                href={p.ctaHref}
                target={p.ctaHref.startsWith("http") ? "_blank" : undefined}
                rel={
                  p.ctaHref.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
                  p.destaque
                    ? "bg-gold text-bg hover:bg-gold-bright"
                    : "border border-gold-dim text-gold hover:border-gold"
                }`}
              >
                {p.ctaLabel}
              </a>
            </div>
          ))}
        </div>

        {bonusLuquisys && (
          <div className="mt-8 rounded-2xl border border-gold-dim bg-gradient-to-br from-gold-dark/40 to-bg-card p-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-block rounded-full border border-gold-dim/60 bg-gold-dark/30 px-3 py-1 text-xs font-bold tracking-wider text-gold">
                  BÔNUS LUQUISYS
                </span>
                <p className="mt-3 text-sm text-neutral-200 sm:text-base">
                  Assinando o {nome},{" "}
                  <strong className="text-white">
                    você ganha o ComparaBot Pro
                  </strong>{" "}
                  (R$ 9/mês) <strong className="text-gold">de graça</strong>{" "}
                  — comparações ilimitadas no WhatsApp.
                </p>
              </div>
              <Link
                href="/comparabot"
                className="shrink-0 rounded-full border border-gold-dim px-5 py-2 text-sm font-semibold text-gold transition hover:border-gold"
              >
                Saiba mais →
              </Link>
            </div>
          </div>
        )}
      </section>

      {(ctaFinalTitulo || ctaPrimaria) && (
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            {ctaFinalTitulo || `Pronto pra começar com o ${nome}?`}
          </h2>
          {ctaFinalTexto && (
            <p className="mt-4 text-neutral-400">{ctaFinalTexto}</p>
          )}
          {ctaPrimaria && (
            <a
              href={ctaPrimaria.href}
              target={
                ctaPrimaria.href.startsWith("http") ? "_blank" : undefined
              }
              rel={
                ctaPrimaria.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="mt-8 inline-block rounded-full bg-gold px-8 py-4 text-base font-semibold text-bg transition hover:bg-gold-bright"
            >
              {ctaPrimaria.label}
            </a>
          )}
        </section>
      )}

      <footer className="border-t border-neutral-900 px-6 py-10 text-center text-sm text-neutral-500">
        <p>
          <Link href="/" className="hover:text-gold">
            Luquisys
          </Link>{" "}
          · {nome} · © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
