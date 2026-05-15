import Link from "next/link";

const produtos = [
  {
    slug: "comparabot",
    nome: "ComparaBot",
    tagline: "Compare orçamentos no WhatsApp em segundos",
    descricao:
      "Manda foto ou texto de 2 a 5 orçamentos e o bot extrai itens, compara preço por preço e diz onde comprar pra economizar mais.",
    status: "disponível",
  },
];

export default function Home() {
  return (
    <main className="radial-bg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Luquisys" className="h-9 w-9" />
          <span className="text-sm font-semibold tracking-[0.2em] text-gold">
            LUQUISYS
          </span>
        </div>
        <a
          href="#produtos"
          className="text-sm text-neutral-400 transition hover:text-gold"
        >
          Produtos
        </a>
      </nav>

      <section className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center sm:pt-32">
        <div className="mb-10 flex justify-center">
          <img
            src="/logo.svg"
            alt="Luquisys"
            className="h-28 w-28 drop-shadow-gold sm:h-36 sm:w-36"
          />
        </div>
        <h1 className="gold-gradient-text text-5xl font-black tracking-tight sm:text-7xl">
          LUQUISYS
        </h1>
        <p className="mt-4 text-xs tracking-[0.35em] text-gold-dim sm:text-sm">
          SISTEMAS DE GESTÃO EMPRESARIAL
        </p>
        <p className="mx-auto mt-10 max-w-2xl text-lg text-neutral-300 sm:text-xl">
          Soluções práticas que economizam tempo e dinheiro pra pequenas e
          médias empresas. Bots, automações e sistemas feitos pra rodar no dia
          a dia, não pra ficar em apresentação.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="#produtos"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-bg transition hover:bg-gold-bright"
          >
            Ver produtos
          </Link>
          <a
            href="mailto:contato@luquisys.com.br"
            className="rounded-full border border-gold-dim px-6 py-3 text-sm font-semibold text-gold transition hover:border-gold"
          >
            Falar com a gente
          </a>
        </div>
      </section>

      <section
        id="produtos"
        className="mx-auto max-w-6xl border-t border-neutral-900 px-6 py-20"
      >
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Nossos produtos
        </h2>
        <p className="mt-3 text-center text-neutral-400">
          Um portfólio que cresce conforme a gente valida o que funciona.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-neutral-900 bg-bg-card p-6 transition hover:border-gold-dim hover:shadow-gold"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gold">{p.nome}</h3>
                <span className="rounded-full border border-emerald-700/50 bg-emerald-950/40 px-2 py-0.5 text-xs text-emerald-400">
                  {p.status}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-neutral-200">
                {p.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                {p.descricao}
              </p>
              <span className="mt-6 text-sm font-semibold text-gold transition group-hover:translate-x-1">
                Conhecer →
              </span>
            </Link>
          ))}

          <div className="flex flex-col rounded-2xl border border-dashed border-neutral-800 p-6">
            <h3 className="text-xl font-bold text-neutral-500">Em breve</h3>
            <p className="mt-2 text-sm text-neutral-500">
              Mais produtos chegando conforme validamos novas ideias.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-900 px-6 py-10 text-center text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Luquisys. Todos os direitos reservados.</p>
        <p className="mt-1">luquisys.com.br</p>
      </footer>
    </main>
  );
}
