import Link from "next/link";
import { MontadorCombo } from "./_components/MontadorCombo";

type Produto = {
  slug: string;
  nome: string;
  icone: string;
  tagline: string;
  preco: string;
  precoDe?: string;
  badge?: string;
  appUrl?: string;
  semTrial?: boolean;
};

function trialHref(p: Produto) {
  const base = p.appUrl ?? `https://${p.slug}.luquisys.com.br`;
  return `${base}/cadastro?trial=1`;
}

function demoHref(p: Produto) {
  const base = p.appUrl ?? `https://${p.slug}.luquisys.com.br`;
  return `${base}/demo`;
}

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
        semTrial: true,
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


export default function Home() {
  return (
    <main className="radial-bg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <img src="/luqsys-logo.png" alt="Luqsys" className="h-10 w-10 rounded-lg" />
          <span className="text-sm font-semibold tracking-[0.2em] text-gold">
            LUQSYS
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="#trilhas" className="text-neutral-400 transition hover:text-gold">
            Sistemas
          </a>
          <a href="#bundles" className="text-neutral-400 transition hover:text-gold">
            Combos
          </a>
          <a href="#sob-medida" className="text-neutral-400 transition hover:text-gold">
            Sob medida
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
        <div className="mb-6 flex justify-center">
          <img
            src="/luqsys-logo.png"
            alt="Luqsys — Sistemas de Gestão"
            className="h-40 w-40 rounded-3xl drop-shadow-gold sm:h-52 sm:w-52"
          />
        </div>
        <h1 className="gold-gradient-text text-5xl font-black tracking-tight sm:text-7xl">
          LUQSYS
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
          ✦ <span className="text-gold">3 dias grátis</span> em qualquer sistema
          · sem cartão de crédito · ComparaBot vem de bônus
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
                  <div
                    key={p.slug}
                    className="group flex flex-col rounded-2xl border border-neutral-900 bg-bg-card p-6 transition hover:border-gold-dim hover:shadow-gold"
                  >
                    <Link href={`/${p.slug}`} className="flex flex-1 flex-col">
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
                        <span className="text-xs font-semibold text-neutral-500 transition group-hover:text-gold">
                          detalhes →
                        </span>
                      </div>
                    </Link>
                    {!p.semTrial && (
                      <div className="mt-5 grid grid-cols-2 gap-2 border-t border-neutral-900 pt-4">
                        <a
                          href={demoHref(p)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-gold-dim/60 px-3 py-2 text-center text-xs font-semibold text-gold transition hover:border-gold"
                        >
                          Ver demo
                        </a>
                        <a
                          href={trialHref(p)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-gold px-3 py-2 text-center text-xs font-semibold text-bg transition hover:bg-gold-bright"
                        >
                          Testar 3 dias
                        </a>
                      </div>
                    )}
                    {p.semTrial && (
                      <div className="mt-5 border-t border-neutral-900 pt-4">
                        <Link
                          href={`/${p.slug}`}
                          className="block rounded-full border border-gold-dim/60 px-3 py-2 text-center text-xs font-semibold text-gold transition hover:border-gold"
                        >
                          Como funciona →
                        </Link>
                      </div>
                    )}
                  </div>
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
          Monte seu pacote
        </h2>
        <p className="mt-3 text-center text-neutral-400">
          Escolha os sistemas que fazem sentido pra você — o desconto vai
          crescendo conforme você adiciona.
        </p>
        <p className="mt-2 text-center text-xs text-gold-dim">
          ✦ +5% off por sistema adicional · pegando os 11 ={" "}
          <strong className="text-gold">50% off</strong> · ComparaBot vem grátis junto
        </p>

        <div className="mt-10">
          <MontadorCombo />
        </div>
      </section>

      <section
        id="sob-medida"
        className="mx-auto max-w-6xl border-t border-neutral-900 px-6 py-20"
      >
        <div className="rounded-3xl border border-gold-dim bg-gradient-to-br from-gold-dark/30 via-bg-card to-bg-card p-8 sm:p-12 shadow-gold">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr,1fr]">
            <div>
              <span className="inline-block rounded-full border border-gold-dim/60 bg-gold-dark/30 px-3 py-1 text-xs font-bold tracking-wider text-gold">
                ✦ SOB MEDIDA
              </span>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Não achou o sistema que você precisa?
              </h2>
              <p className="mt-4 text-base text-neutral-300 sm:text-lg">
                Eu desenvolvo <strong className="text-white">sistema personalizado</strong>{" "}
                pra sua operação — do zero ou adaptando um dos meus 12 que já
                rodam. Mesmo padrão Luqsys: Flask + PostgreSQL, deploy próprio,
                código seu.
              </p>

              <ul className="mt-6 grid gap-2 text-sm text-neutral-300 sm:grid-cols-2">
                <li className="flex items-start gap-2">
                  <span className="text-gold">✓</span> Levantamento gratuito por
                  WhatsApp
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✓</span> Escopo + orçamento fechado
                  antes de começar
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✓</span> Entrega em sprints (2 a 4
                  semanas)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✓</span> Hospedagem + suporte
                  mensal opcional
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/5545991077788?text=Oi%20Lucas%2C%20quero%20um%20sistema%20personalizado"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-7 py-4 text-center text-sm font-semibold text-bg transition hover:bg-gold-bright"
              >
                Falar no WhatsApp
              </a>
              <a
                href="mailto:contato@luquisys.com.br?subject=Quero%20um%20sistema%20personalizado&body=Oi%20Lucas%2C%20preciso%20de%20um%20sistema%20pra%3A%20%5Bdescreva%20o%20que%20voc%C3%AA%20precisa%5D"
                className="rounded-full border border-gold-dim px-7 py-4 text-center text-sm font-semibold text-gold transition hover:border-gold"
              >
                Enviar e-mail
              </a>
              <p className="mt-1 text-center text-xs text-neutral-500">
                Conta o que você precisa — respondo em até 24h com
                proposta inicial.
              </p>
            </div>
          </div>
        </div>
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
        <p>© {new Date().getFullYear()} Luqsys. Todos os direitos reservados.</p>
        <p className="mt-1">luquisys.com.br</p>
      </footer>
    </main>
  );
}
