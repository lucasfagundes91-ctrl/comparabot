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
          nome: "Básico",
          publico: "1-2 obras simultâneas",
          precoLabel: "R$ 69",
          features: [
            "Até 2 obras ativas",
            "OCR de notas (até 100/mês)",
            "1 usuário",
            "Etapas e investidores",
            "Relatórios básicos",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Básico",
          ctaHref: "https://www.asaas.com/c/9klwm6prnwg1bjk2",
        },
        {
          nome: "Pro",
          publico: "Construtora ativa",
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
          ctaLabel: "Assinar Pro",
          ctaHref: "https://www.asaas.com/c/gj85zr3wdfwp28vp",
          destaque: true,
        },
        {
          nome: "Empresa",
          publico: "Construtora com várias frentes",
          precoLabel: "R$ 249",
          features: [
            "Tudo do Pro",
            "Multi-empresa (CNPJs)",
            "API pra integrações",
            "Relatório por investidor (PDF custom)",
            "Onboarding dedicado",
            "Suporte prioritário",
          ],
          ctaLabel: "Assinar Empresa",
          ctaHref: "https://www.asaas.com/c/qf8m56k3w21dhmha",
        },
      ]}
      ctaFinalTitulo="Pare de furar o orçamento"
      ctaFinalTexto="Combine com ComparaBot pra cotar material antes de comprar."
    appUrl="https://obrapro.luquisys.com.br"
    assinarUrl="https://www.asaas.com/c/gj85zr3wdfwp28vp"
    />
  );
}
