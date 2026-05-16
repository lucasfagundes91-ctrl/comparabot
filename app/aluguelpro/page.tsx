import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "AluguelPro — Administração de imóveis e aluguéis",
  description:
    "Controle de contratos, cobrança recorrente, repasse a proprietários, reajuste IGP-M/IPCA e relatórios pro proprietário. Pra pequena administradora.",
};

export default function AluguelProPage() {
  return (
    <ProductLayout
      icone="🏠"
      nome="AluguelPro"
      tagline="Sua administração de imóveis no controle"
      descricao={
        <>
          Contratos, <strong className="text-white">cobrança recorrente</strong>,
          repasse a proprietários, reajuste por IGP-M/IPCA, relatórios.
          Pra pequena administradora ou proprietário de vários imóveis.
        </>
      }
      ctaPrimaria={{
        label: "Falar com vendas",
        href: "mailto:contato@luquisys.com.br?subject=Quero%20o%20AluguelPro",
      }}
      ctaSecundaria={{ label: "Ver planos", href: "#planos" }}
      passos={[
        {
          n: "1",
          titulo: "Cadastra imóveis e contratos",
          texto:
            "Imóveis, proprietários, inquilinos, contratos com vencimento, índice de reajuste e taxa de administração.",
        },
        {
          n: "2",
          titulo: "Cobrança automática",
          texto:
            "Boleto/Pix recorrente pro inquilino. Lembrete antes do vencimento. Cobrança automática de quem atrasou.",
        },
        {
          n: "3",
          titulo: "Repasse e relatório",
          texto:
            "Após recebido, calcula sua taxa, repassa pro proprietário e gera demonstrativo. Reajuste anual automático.",
        },
      ]}
      features={[
        "Contratos com vencimento e reajuste automático",
        "Cobrança recorrente (boleto/Pix)",
        "Repasse automático ao proprietário",
        "Taxa de administração configurável",
        "Demonstrativos pro proprietário (PDF)",
        "Reajuste IGP-M/IPCA automático",
        "Multi-proprietário e multi-imóvel",
        "Histórico financeiro por imóvel",
      ]}
      planos={[
        {
          nome: "AluguelPro",
          publico: "Administração de imóveis",
          precoLabel: "R$ 99",
          features: [
            "Imóveis e contratos ilimitados",
            "Cobrança recorrente",
            "Repasse automático",
            "Reajustes automáticos",
            "Demonstrativos PDF",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar agora",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20AluguelPro",
          destaque: true,
        },
      ]}
      ctaFinalTitulo="Sua carteira de imóveis no controle"
      ctaFinalTexto="Combine com ContabilidadePro pro imposto certinho."
    appUrl="https://aluguelpro.luquisys.com.br"
    />
  );
}
