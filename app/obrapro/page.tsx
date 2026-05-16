import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "ObraPro — Controle financeiro de obras",
  description:
    "Multi-obra com etapas, investidores, gastos com OCR e relatórios por etapa. Pra construtora pequena e média que quer parar de furar orçamento.",
};

export default function ObraProPage() {
  return (
    <ProductLayout
      icone="🏗️"
      nome="ObraPro"
      tagline="Sua obra dentro do orçamento"
      descricao={
        <>
          Controle financeiro de <strong className="text-white">múltiplas obras</strong>{" "}
          com etapas, investidores e gastos com OCR de notas. Pra construtora
          pequena que quer parar de furar orçamento.
        </>
      }
      ctaPrimaria={{
        label: "Falar com vendas",
        href: "mailto:contato@luquisys.com.br?subject=Quero%20o%20ObraPro",
      }}
      ctaSecundaria={{ label: "Ver planos", href: "#planos" }}
      passos={[
        {
          n: "1",
          titulo: "Cadastra obras e etapas",
          texto:
            "Cada obra com orçamento previsto, etapas (fundação, alvenaria, acabamento), investidores e percentuais.",
        },
        {
          n: "2",
          titulo: "Lança gastos por etapa",
          texto:
            "Nota fiscal por foto (OCR). Cada gasto vai pra etapa certa. Vê na hora se está dentro ou estourando.",
        },
        {
          n: "3",
          titulo: "Relatório pro investidor",
          texto:
            "Fechamento por obra, por etapa, por investidor. Exporta PDF/Excel. Transparência total.",
        },
      ]}
      features={[
        "Múltiplas obras simultâneas",
        "Etapas com orçamento previsto × realizado",
        "Investidores com percentual de participação",
        "OCR de notas fiscais por foto",
        "Categorias de gasto (material, mão de obra, etc)",
        "Relatórios por obra/etapa/investidor",
        "Multi-usuário com papéis (admin/editor/viewer)",
        "Exportação PDF e Excel",
      ]}
      planos={[
        {
          nome: "ObraPro",
          publico: "Controle financeiro completo de obras",
          precoLabel: "R$ 119",
          precoDe: "R$ 149",
          features: [
            "Obras ilimitadas",
            "Etapas e investidores ilimitados",
            "OCR de notas ilimitado",
            "Usuários ilimitados com permissões",
            "Relatórios e exportação",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar agora",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20ObraPro",
          destaque: true,
        },
      ]}
      ctaFinalTitulo="Pare de furar o orçamento"
      ctaFinalTexto="Combine com ComparaBot pra cotar material antes de comprar."
    appUrl="https://obrapro.luquisys.com.br"
    />
  );
}
