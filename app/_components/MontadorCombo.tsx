"use client";

import { useMemo, useState } from "react";

type Sistema = {
  slug: string;
  nome: string;
  icone: string;
  tagline: string;
  preco: number;
};

const SISTEMAS: Sistema[] = [
  { slug: "pdvpro", nome: "PDV Pro", icone: "🛒", tagline: "Varejo / loja física", preco: 199 },
  { slug: "farmpro", nome: "FarmPro", icone: "🌾", tagline: "Gestão rural", preco: 119 },
  { slug: "obrapro", nome: "ObraPro", icone: "🏗️", tagline: "Obras por etapa", preco: 119 },
  { slug: "solarpro", nome: "SolarPro", icone: "☀️", tagline: "Empresa solar", preco: 89 },
  { slug: "aluguelpro", nome: "AluguelPro", icone: "🏠", tagline: "Imóveis e aluguéis", preco: 99 },
  { slug: "frotapro", nome: "FrotaPro", icone: "🚚", tagline: "Frota PME", preco: 49 },
  { slug: "pontopro", nome: "PontoPro", icone: "⏱️", tagline: "Ponto eletrônico", preco: 49 },
  { slug: "contabilidadepro", nome: "ContabilidadePro", icone: "📊", tagline: "Software + contador", preco: 199 },
  { slug: "bankpro", nome: "BankPro", icone: "🏦", tagline: "Finanças pessoais", preco: 49 },
  { slug: "viagempro", nome: "ViagemPro", icone: "🧳", tagline: "Planejador de viagens", preco: 49 },
  { slug: "milhaspro", nome: "MilhasPro", icone: "🎫", tagline: "Passagens em milhas", preco: 49 },
];

const FAIXAS = [
  { min: 2, pct: 0.05 },
  { min: 3, pct: 0.10 },
  { min: 4, pct: 0.15 },
  { min: 5, pct: 0.20 },
  { min: 6, pct: 0.25 },
  { min: 7, pct: 0.30 },
  { min: 8, pct: 0.35 },
  { min: 9, pct: 0.40 },
  { min: 10, pct: 0.45 },
  { min: 11, pct: 0.50 },
];

function descontoFor(qtd: number) {
  let d = 0;
  for (const f of FAIXAS) if (qtd >= f.min) d = f.pct;
  return d;
}

function fmt(v: number) {
  return v.toLocaleString("pt-BR");
}

export function MontadorCombo() {
  const [sel, setSel] = useState<Set<string>>(new Set());

  const escolhidos = useMemo(
    () => SISTEMAS.filter((s) => sel.has(s.slug)),
    [sel]
  );

  const qtd = escolhidos.length;
  const somaCheia = escolhidos.reduce((acc, s) => acc + s.preco, 0);
  const desconto = descontoFor(qtd);
  const total = Math.round(somaCheia * (1 - desconto));
  const economia = somaCheia - total;
  const incluiComparaBot = qtd >= 1;

  const proximaFaixa = FAIXAS.find((f) => qtd < f.min);

  function toggle(slug: string) {
    setSel((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function limpar() {
    setSel(new Set());
  }

  const mailtoBody = encodeURIComponent(
    `Pacote escolhido:\n` +
      escolhidos.map((s) => `• ${s.nome} (R$ ${s.preco}/mês)`).join("\n") +
      (incluiComparaBot ? `\n• ComparaBot Pro (incluso grátis)` : "") +
      `\n\nSoma cheia: R$ ${somaCheia}/mês\n` +
      `Desconto: ${(desconto * 100).toFixed(0)}% (R$ ${economia}/mês)\n` +
      `TOTAL: R$ ${total}/mês\n\n` +
      `Quero contratar esse pacote.`
  );
  const mailto = `mailto:contato@luqsys.com.br?subject=${encodeURIComponent(
    "Quero esse pacote Luqsys"
  )}&body=${mailtoBody}`;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SISTEMAS.map((s) => {
          const on = sel.has(s.slug);
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => toggle(s.slug)}
              className={`group flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                on
                  ? "border-gold bg-gold-dark/20 shadow-gold"
                  : "border-neutral-900 bg-bg-card hover:border-gold-dim"
              }`}
            >
              <div
                className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm font-bold ${
                  on
                    ? "border-gold bg-gold text-bg"
                    : "border-neutral-700 text-transparent"
                }`}
                aria-hidden
              >
                ✓
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.icone}</span>
                  <span className={`font-bold ${on ? "text-gold" : "text-white"}`}>
                    {s.nome}
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-400">{s.tagline}</p>
                <p className="mt-2 text-sm font-semibold text-neutral-200">
                  R$ {s.preco}
                  <span className="text-xs font-normal text-neutral-500">/mês</span>
                </p>
              </div>
            </button>
          );
        })}

        <div
          className={`flex items-start gap-3 rounded-2xl border border-gold-dim/60 bg-gradient-to-br from-gold-dark/30 to-bg-card p-4 ${
            qtd === 0 ? "opacity-60" : ""
          }`}
        >
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-gold bg-gold text-bg text-sm font-bold">
            ✓
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">📑</span>
              <span className="font-bold text-gold">ComparaBot</span>
              <span className="rounded-full border border-gold-dim/60 bg-gold-dark/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                bônus
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-400">Compare orçamentos no WhatsApp</p>
            <p className="mt-2 text-sm font-semibold text-neutral-300">
              {qtd === 0 ? (
                <>R$ 9<span className="text-xs font-normal text-neutral-500">/mês</span></>
              ) : (
                <span className="text-emerald-400">Grátis no seu pacote ✓</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 mt-8 z-30">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gold-dim bg-bg-card/95 p-5 shadow-gold backdrop-blur">
          {qtd === 0 ? (
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="text-sm font-medium text-neutral-300">
                  Selecione os sistemas que você quer
                </p>
                <p className="text-xs text-neutral-500">
                  +5% off por sistema adicional · pegando os 11 = <strong className="text-gold">50% off</strong>
                </p>
              </div>
              <span className="rounded-full border border-neutral-800 px-4 py-2 text-xs text-neutral-500">
                0 sistemas
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold">
                    seu pacote
                  </span>
                  <span className="text-sm text-neutral-400">
                    {qtd} sistema{qtd > 1 ? "s" : ""}
                    {incluiComparaBot ? " + ComparaBot grátis" : ""}
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  {desconto > 0 && (
                    <span className="text-sm text-neutral-500 line-through">
                      R$ {fmt(somaCheia)}
                    </span>
                  )}
                  <span className="text-3xl font-black text-white">
                    R$ {fmt(total)}
                  </span>
                  <span className="text-sm font-medium text-neutral-500">/mês</span>
                  {desconto > 0 && (
                    <span className="ml-1 rounded-full bg-emerald-900/40 border border-emerald-700/40 px-2 py-0.5 text-xs font-bold text-emerald-400">
                      -{(desconto * 100).toFixed(0)}% · economia R$ {fmt(economia)}/mês
                    </span>
                  )}
                </div>
                {proximaFaixa && (
                  <p className="mt-1 text-xs text-gold-dim">
                    Adicione mais {proximaFaixa.min - qtd} sistema
                    {proximaFaixa.min - qtd > 1 ? "s" : ""} e o desconto sobe pra{" "}
                    {(proximaFaixa.pct * 100).toFixed(0)}%
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={limpar}
                  className="rounded-full border border-neutral-800 px-4 py-2 text-xs font-medium text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-200"
                >
                  Limpar
                </button>
                <a
                  href={mailto}
                  className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-bg transition hover:bg-gold-bright"
                >
                  Quero esse pacote →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
