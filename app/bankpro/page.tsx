import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "BankPro — Gestão financeira pessoal com IA e WhatsApp",
  description:
    "App + WhatsApp pra você controlar contas, cartões e investimentos da família com importação OFX, OCR de comprovantes e assistente IA.",
};

export default function BankProPage() {
  return (
    <ProductLayout
      icone="🏦"
      nome="BankPro"
      tagline="Sua vida financeira no app e no WhatsApp"
      descricao={
        <>
          Controla contas, cartões e investimentos da família inteira.{" "}
          <strong className="text-white">
            Lança gasto pelo WhatsApp em segundos
          </strong>{" "}
          ou importa OFX e deixa a IA categorizar tudo.
        </>
      }
      ctaPrimaria={{
        label: "Falar com a gente",
        href: "mailto:contato@luquisys.com.br?subject=Quero%20o%20BankPro",
      }}
      ctaSecundaria={{ label: "Ver planos", href: "#planos" }}
      passos={[
        {
          n: "1",
          titulo: "Cadastra suas contas",
          texto:
            "Conta corrente, poupança, investimento, cartões. Por pessoa (você, cônjuge, filhos). Importa OFX direto do banco.",
        },
        {
          n: "2",
          titulo: "Lança no WhatsApp",
          texto:
            "Manda 'Mercado 89,90 no Nubank' ou um áudio. O bot entende, categoriza e lança. OCR de comprovante também.",
        },
        {
          n: "3",
          titulo: "Vê o panorama",
          texto:
            "Dashboard com 30 dias móveis, fluxo de caixa, patrimônio total, gastos por categoria e cartão. Filtra por pessoa.",
        },
      ]}
      features={[
        "Multi-pessoa: separa patrimônio de cada um da família",
        "Importação OFX de qualquer banco brasileiro",
        "OCR de comprovante via foto no WhatsApp",
        "Cartão de crédito com fatura e parcelamento",
        "Investimentos: CDB, LCI, LCA, ações, tesouro",
        "Reconciliação de aplicação automática (CDI)",
        "Assistente IA pra responder perguntas das suas finanças",
        "Áudio no WhatsApp transcrito automaticamente",
      ]}
      planos={[
        {
          nome: "BankPro",
          publico: "App completo + WhatsApp ilimitado",
          precoLabel: "R$ 49",
          precoDe: "R$ 88",
          features: [
            "App web completo (sidebar, dashboards, relatórios)",
            "WhatsApp com IA: lançar, consultar, áudio, foto",
            "Multi-pessoa (você + família)",
            "Contas, cartões, investimentos ilimitados",
            "Importação OFX ilimitada",
            "Suporte prioritário",
          ],
          ctaLabel: "Assinar agora",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20BankPro",
          destaque: true,
        },
      ]}
      ctaFinalTitulo="Sua vida financeira no controle"
      ctaFinalTexto="Sem planilha, sem app que confunde. Lança pelo WhatsApp e pronto."
    />
  );
}
