import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "SolarPro — Gestão pra integrador de energia solar",
  description:
    "Orçamentos, projetos, OCR de faturas Copel, acompanhamento de obras e financeiro pra empresa de energia solar fotovoltaica.",
};

export default function SolarProPage() {
  return (
    <ProductLayout
      icone="☀️"
      nome="SolarPro"
      tagline="Gestão completa pro integrador solar"
      descricao={
        <>
          Orçamentos, projetos, <strong className="text-white">OCR de faturas</strong>,
          acompanhamento de obras e financeiro — feito pra empresa de energia
          solar fotovoltaica pequena e média.
        </>
      }
      ctaPrimaria={{
        label: "Falar com vendas",
        href: "mailto:contato@luqsys.com.br?subject=Quero%20o%20SolarPro",
      }}
      ctaSecundaria={{ label: "Ver planos", href: "#planos" }}
      passos={[
        {
          n: "1",
          titulo: "Cadastra cliente e projeto",
          texto:
            "Dados do cliente, consumo (kWh) por foto da fatura via OCR, projeto fotovoltaico, equipamentos.",
        },
        {
          n: "2",
          titulo: "Gera orçamento e contrato",
          texto:
            "Orçamento profissional com economia projetada e payback. Contrato pronto pra assinar. Acompanhamento da instalação.",
        },
        {
          n: "3",
          titulo: "Controle financeiro da empresa",
          texto:
            "Contas a pagar/receber, comissão de vendedor, cobranças do cliente. Tudo num sistema só.",
        },
      ]}
      features={[
        "OCR de fatura de energia (Copel, etc)",
        "Cálculo automático de payback",
        "Orçamento profissional em PDF",
        "Acompanhamento de obras",
        "Financeiro: contas a pagar/receber",
        "Cobranças recorrentes",
        "Comissão de vendedor",
        "Multi-usuário",
      ]}
      planos={[
        {
          nome: "Básico",
          publico: "Integrador começando",
          precoLabel: "R$ 49",
          features: [
            "Até 10 propostas/mês",
            "OCR de fatura (até 20/mês)",
            "1 usuário",
            "Orçamento PDF",
            "Sem financeiro",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Básico",
          ctaHref: "https://www.asaas.com/c/gvkazy8583uxptbj",
        },
        {
          nome: "Pro",
          publico: "Empresa solar completa",
          precoLabel: "R$ 89",
          precoDe: "R$ 119",
          features: [
            "Clientes e projetos ilimitados",
            "OCR de faturas ilimitado",
            "Orçamentos profissionais em PDF",
            "Acompanhamento de obras",
            "Financeiro completo",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Pro",
          ctaHref: "https://www.asaas.com/c/wy6zkhm3k7otovzd",
          destaque: true,
        },
        {
          nome: "Empresa",
          publico: "Rede de integradores/franquia",
          precoLabel: "R$ 179",
          features: [
            "Tudo do Pro",
            "Multi-filial",
            "Comissões por vendedor",
            "Dashboard consolidado",
            "API pra distribuidor",
            "Suporte prioritário",
          ],
          ctaLabel: "Assinar Empresa",
          ctaHref: "https://www.asaas.com/c/rsu497dzfvpwbmp6",
        },
      ]}
      ctaFinalTitulo="Seu negócio solar organizado"
      ctaFinalTexto="Combine com PontoPro (instaladores) e ContabilidadePro pro fechamento."
    appUrl="https://solarpro.luqsys.com.br"
    assinarUrl="https://www.asaas.com/c/wy6zkhm3k7otovzd"
    />
  );
}
