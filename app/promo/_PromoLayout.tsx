import Link from "next/link";
import { buildWhatsappLink, type PromoData } from "./_data";

export function PromoLayout({ promo }: { promo: PromoData }) {
  const waLink = buildWhatsappLink(promo);

  return (
    <main className="radial-bg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/luqsys-logo.png"
            alt="Luqsys"
            className="h-10 w-10 rounded-lg"
          />
          <span className="text-sm font-semibold tracking-[0.2em] text-gold">
            LUQSYS
          </span>
        </Link>
        <Link
          href={promo.produtoPath}
          className="text-sm text-neutral-400 transition hover:text-gold"
        >
          Página do {promo.produto} →
        </Link>
      </nav>

      <section className="mx-auto max-w-3xl px-6 pb-10 pt-12 text-center sm:pt-16">
        <span className="inline-block animate-pulse rounded-full border border-gold bg-gold-dark/40 px-4 py-1 text-xs font-bold tracking-wider text-gold">
          {promo.hero.selo}
        </span>
        <div className="mt-6 text-5xl">{promo.produtoIcone}</div>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
          <span className="gold-gradient-text">{promo.hero.titulo}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-neutral-300 sm:text-lg">
          {promo.hero.subtitulo}
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-14">
        <div className="rounded-3xl border-2 border-gold bg-gradient-to-br from-gold-dark/30 to-bg-card p-8 text-center shadow-gold sm:p-10">
          <p className="text-sm font-bold uppercase tracking-wider text-gold">
            {promo.oferta.descontoLabel}
          </p>
          <div className="mt-4 flex items-baseline justify-center gap-3">
            <span className="text-2xl font-medium text-neutral-500 line-through">
              {promo.oferta.precoOriginal}
              {promo.oferta.sufixoPreco}
            </span>
            <span className="text-6xl font-black text-white sm:text-7xl">
              {promo.oferta.precoPromo}
              <span className="text-2xl font-medium text-neutral-400">
                {promo.oferta.sufixoPreco}
              </span>
            </span>
          </div>
          {promo.oferta.detalhe && (
            <p className="mt-4 text-sm text-neutral-400">
              {promo.oferta.detalhe}
            </p>
          )}

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-bold text-bg transition hover:bg-gold-bright sm:w-auto sm:px-12"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Falar no WhatsApp agora →
          </a>
          {promo.garantia && (
            <p className="mt-4 text-xs text-neutral-500">{promo.garantia}</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          O que você leva
        </h2>
        <ul className="mx-auto mt-8 grid gap-3">
          {promo.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 rounded-xl border border-neutral-900 bg-bg-soft px-5 py-4 text-sm text-neutral-200 sm:text-base"
            >
              <span className="mt-0.5 text-lg text-gold">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {promo.depoimentos.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Quem já usa
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {promo.depoimentos.map((d) => (
              <figure
                key={d.nome}
                className="rounded-2xl border border-neutral-900 bg-bg-card p-6"
              >
                <blockquote className="text-sm leading-relaxed text-neutral-200">
                  “{d.texto}”
                </blockquote>
                <figcaption className="mt-4 text-xs text-neutral-400">
                  <span className="font-semibold text-gold">{d.nome}</span>
                  {d.cargo && <span> · {d.cargo}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Pronto pra ativar essa condição?
        </h2>
        <p className="mt-3 text-neutral-400">
          Chama no WhatsApp que a gente libera tua conta no mesmo dia.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-10 py-4 text-base font-bold text-bg transition hover:bg-gold-bright"
        >
          Falar no WhatsApp →
        </a>
      </section>

      <footer className="border-t border-neutral-900 px-6 py-8 text-center text-xs text-neutral-500">
        <p>
          <Link href="/" className="hover:text-gold">
            Luqsys
          </Link>{" "}
          · Oferta {promo.utmCampaign} · © {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
