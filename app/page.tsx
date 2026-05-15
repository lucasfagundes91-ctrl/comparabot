import Link from "next/link";

type Produto = {
  slug: string;
  nome: string;
  icone: string;
  tagline: string;
  preco: string;
  precoDe?: string;
  badge?: string;
};

type Trilha = {
  id: string;
  emoji: string;
  titulo: string;
  subtitulo: string;
  produtos: Produto[];
};

const trilhas: Trilha[] = [
  {
    id: "negocio",
    emoji: "🏪",
    titulo: "Para seu negócio",
    subtitulo: "Operação do dia a dia — vender, comprar, construir, controlar",
    produtos: [
      {
        slug: "pdvpro",
        nome: "PDV Pro",
        icone: "🛒",
        tagline: "PDV + ERP completo pra loja física",
        preco: "R$ 199",
      },
      {
        slug: "farmpro",
        nome: "FarmPro",
        icone: "🌾",
        tagline: "Gestão da fazenda: notas, livro caixa, folha, LCDPR",
        preco: "R$ 119",
      },
      {
        slug: "obrapro",
        nome: "ObraPro",
        icone: "🏗️",
        tagline: "Controle financeiro de obras por etapa",
        preco: "R$ 119",
        precoDe: "R$ 149",
      },
      {
        slug: "solarpro",
        nome: "SolarPro",
        icone: "☀️",
        tagline: "Gestão pra integrador de energia solar",
        preco: "R$ 89",
        precoDe: "R$ 119",
      },
      {
        slug: "aluguelpro",
        nome: "AluguelPro",
        icone: "🏠",
        tagline: "Administração de imóveis e aluguéis",
        preco: "R$ 99",
      },
      {
        slug: "frotapro",
        nome: "FrotaPro",
        icone: "🚚",
        tagline: "Gestão de frota PME com IPVA, seguro e manutenção",
        preco: "R$ 49",
        badge: "novo",
      },
    ],
  },
  {
    id: "conformidade",
    emoji: "🧾",
    titulo: "RH & Conformidade",
    subtitulo: "Funcionários, ponto e contabilidade — sem dor de cabeça com a lei",
    produtos: [
      {
        slug: "pontopro",
        nome: "PontoPro",
        icone: "⏱️",
        tagline: "Ponto eletrônico REP-P (Portaria 671/2021)",
        preco: "R$ 49 até 20 func",
      },
      {
        slug: "contabilidadepro",
        nome: "ContabilidadePro",
        icone: "📊",
        tagline: "Software + acompanhamento contábil humano",
        preco: "R$ 199",
      },
    ],
  },
  {
    id: "financas",
    emoji: "💰",
    titulo: "Suas finanças",
    subtitulo: "Controle pessoal e da família, no app e no WhatsApp",
    produtos: [
      {
        slug: "bankpro",
        nome: "BankPro",
        icone: "🏦",
        tagline: "Gestão financeira pessoal com IA e WhatsApp",
        preco: "R$ 49",
        badge: "app + WhatsApp",
      },
      {
        slug: "comparabot",
        nome: "ComparaBot",
        icone: "📑",
        tagline: "Compare orçamentos no WhatsApp em segundos",
        preco: "R$ 9",
        badge: "grátis c/ outro plano",
      },
    ],
  },
  {
    id: "viagens",
    emoji: "✈️",
    titulo: "Suas viagens",
    subtitulo: "Planejar com IA e voar mais barato com milhas",
    produtos: [
      {
        slug: "viagempro",
        nome: "ViagemPro",
        icone: "🧳",
        tagline: "Planejador de viagens com IA: roteiro, transporte, restaurantes",
        preco: "R$ 49",
      },
      {
        slug: "milhaspro",
        nome: "MilhasPro",
        icone: "🎫",
        tagline: "Buscador de passagens em milhas (Smiles, TudoAzul)",
        preco: "R$ 49",
      },
    ],
  },
];

const bundles = [
  {
    nome: "Combo Varejo Completo",
    inclui: "PDV Pro + PontoPro + ContabilidadePro + ComparaBot",
    publico: "Pra quem toca uma loja com funcionários",
    preco: "R$ 397",
    economia: "Economia ~R$ 50/mês",
  },
  {
    nome: "Combo Fazenda Completa",
    inclui: "FarmPro + SolarPro + PontoPro + ContabilidadePro",
    publico: "Produtor rural com energia solar e empregados",
    preco: "R$ 397",
    economia: "Economia ~R$ 60/mês",
  },
  {
    nome: "Combo Construtora",
    inclui: "ObraPro + AluguelPro + FrotaPro + ComparaBot",
    publico: "Constrói, aluga e tem veículos",
    preco: "R$ 227",
    economia: "Economia ~R$ 40/mês",
  },
  {
    nome: "Combo Pessoal",
    inclui: "BankPro + ViagemPro + MilhasPro + ComparaBot",
    publico: "Pra organizar a vida pessoal de ponta a ponta",
    preco: "R$ 119",
    economia: "Economia ~R$ 28/mês",
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
        <div className="flex items-center gap-6 text-sm">
          <a href="#trilhas" className="text-neutral-400 transition hover:text-gold">
            Sistemas
          </a>
          <a href="#bundles" className="text-neutral-400 transition hover:text-gold">
            Combos
          </a>
          <a
            href="mailto:contato@luquisys.com.br"
            className="text-neutral-400 transition hover:text-gold"
          >
            Contato
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 text-center sm:pt-24">
        <div className="mb-8 flex justify-center">
          <img
            src="/logo.svg"
            alt="Luquisys"
            className="h-24 w-24 drop-shadow-gold sm:h-32 sm:w-32"
          />
        </div>
        <h1 className="gold-gradient-text text-5xl font-black tracking-tight sm:text-7xl">
          LUQUISYS
        </h1>
        <p className="mt-4 text-xs tracking-[0.35em] text-gold-dim sm:text-sm">
          SISTEMAS DE GESTÃO EMPRESARIAL
        </p>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-neutral-300 sm:text-xl">
          12 sistemas práticos pra rodar seu negócio, organizar suas finanças e
          planejar suas viagens. Feitos pra usar no dia a dia, não pra ficar em
          apresentação.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="#trilhas"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-bg transition hover:bg-gold-bright"
          >
            Ver sistemas
          </Link>
          <Link
            href="#bundles"
            className="rounded-full border border-gold-dim px-6 py-3 text-sm font-semibold text-gold transition hover:border-gold"
          >
            Ver combos
          </Link>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          ✦ ComparaBot vem <span className="text-gold">grátis</span> com qualquer
          assinatura
        </p>
      </section>

      <section
        id="trilhas"
        className="mx-auto max-w-6xl border-t border-neutral-900 px-6 py-20"
      >
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Escolha sua trilha
        </h2>
        <p className="mt-3 text-center text-neutral-400">
          Cada sistema resolve uma dor específica — e se conecta com os outros.
        </p>

        <div className="mt-16 space-y-20">
          {trilhas.map((trilha) => (
            <div key={trilha.id}>
              <div className="mb-8 flex items-baseline gap-3">
                <span className="text-3xl">{trilha.emoji}</span>
                <div>
                  <h3 className="text-2xl font-bold sm:text-3xl">
                    {trilha.titulo}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-400">
                    {trilha.subtitulo}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {trilha.produtos.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="group flex flex-col rounded-2xl border border-neutral-900 bg-bg-card p-6 transition hover:border-gold-dim hover:shadow-gold"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{p.icone}</span>
                        <h4 className="text-lg font-bold text-gold">
                          {p.nome}
                        </h4>
                      </div>
                      {p.badge && (
                        <span className="rounded-full border border-gold-dim/60 bg-gold-dark/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-300">
                      {p.tagline}
                    </p>
                    <div className="mt-6 flex items-end justify-between">
                      <div>
                        {p.precoDe && (
                          <span className="block text-xs text-neutral-500 line-through">
                            {p.precoDe}/mês
                          </span>
                        )}
                        <span className="text-xl font-black text-white">
                          {p.preco}
                        </span>
                        {!p.preco.includes("/") && (
                          <span className="text-sm font-medium text-neutral-500">
                            /mês
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gold transition group-hover:translate-x-1">
                        Conhecer →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="bundles"
        className="mx-auto max-w-6xl border-t border-neutral-900 px-6 py-20"
      >
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Combos que combinam
        </h2>
        <p className="mt-3 text-center text-neutral-400">
          Sistemas que conversam entre si saem mais barato juntos.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {bundles.map((b) => (
            <div
              key={b.nome}
              className="rounded-2xl border border-neutral-900 bg-bg-card p-6 transition hover:border-gold-dim"
            >
              <h3 className="text-xl font-bold text-gold">{b.nome}</h3>
              <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                {b.publico}
              </p>
              <p className="mt-4 text-sm text-neutral-300">
                <span className="font-semibold text-white">Inclui:</span>{" "}
                {b.inclui}
              </p>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <span className="text-2xl font-black text-white">
                    {b.preco}
                  </span>
                  <span className="text-sm font-medium text-neutral-500">
                    /mês
                  </span>
                </div>
                <span className="text-xs font-medium text-emerald-400">
                  {b.economia}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-neutral-500">
          Quer um combo customizado?{" "}
          <a
            href="mailto:contato@luquisys.com.br"
            className="text-gold hover:underline"
          >
            Fala com a gente
          </a>
        </p>
      </section>

      <section className="mx-auto max-w-3xl border-t border-neutral-900 px-6 py-20 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Sistemas feitos pra <span className="gold-gradient-text">rodar</span>
        </h2>
        <p className="mt-4 text-neutral-400">
          Não somos consultoria, não somos enterprise. Somos software direto que
          resolve a dor da pequena e média empresa brasileira.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="#trilhas"
            className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-bg transition hover:bg-gold-bright"
          >
            Explorar sistemas
          </Link>
          <a
            href="mailto:contato@luquisys.com.br"
            className="rounded-full border border-gold-dim px-7 py-3 text-sm font-semibold text-gold transition hover:border-gold"
          >
            Falar com a gente
          </a>
        </div>
      </section>

      <footer className="border-t border-neutral-900 px-6 py-10 text-center text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Luquisys. Todos os direitos reservados.</p>
        <p className="mt-1">luquisys.com.br</p>
      </footer>
    </main>
  );
}
