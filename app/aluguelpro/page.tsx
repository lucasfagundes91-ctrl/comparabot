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
        href: "mailto:contato@luqsys.com.br?subject=Quero%20o%20AluguelPro",
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
          nome: "Básico",
          publico: "Proprietário com poucos imóveis",
          precoLabel: "R$ 59",
          features: [
            "Até 10 imóveis",
            "Contratos com reajuste",
            "Cobrança manual (PIX/boleto)",
            "1 usuário",
            "Demonstrativo simples",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Básico",
          ctaHref: "https://www.asaas.com/c/o10vzdh38yuwb2eo",
        },
        {
          nome: "Pro",
          publico: "Pequena administradora",
          precoLabel: "R$ 99",
          features: [
            "Imóveis e contratos ilimitados",
            "Cobrança recorrente automática",
            "Repasse automático",
            "Reajustes IGP-M/IPCA automáticos",
            "Demonstrativos PDF",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Pro",
          ctaHref: "https://www.asaas.com/c/mhw1a1fe2i14hit6",
          destaque: true,
        },
        {
          nome: "Empresa",
          publico: "Administradora com várias filiais",
          precoLabel: "R$ 199",
          features: [
            "Tudo do Pro",
            "Multi-administradora",
            "Portal do proprietário",
            "Portal do inquilino",
            "API + integrações",
            "Suporte prioritário",
          ],
          ctaLabel: "Assinar Empresa",
          ctaHref: "https://www.asaas.com/c/yvfvq42xetpq1i59",
        },
      ]}
      ctaFinalTitulo="Sua carteira de imóveis no controle"
      ctaFinalTexto="Combine com ContabilidadePro pro imposto certinho."
    appUrl="https://aluguelpro.luqsys.com.br"
    assinarUrl="https://www.asaas.com/c/mhw1a1fe2i14hit6"
    />
  );
}
