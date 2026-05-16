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
        href: "mailto:contato@luquisys.com.br?subject=Quero%20o%20SolarPro",
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
          nome: "SolarPro",
          publico: "Gestão completa pra empresa solar",
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
          ctaLabel: "Assinar agora",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20SolarPro",
          destaque: true,
        },
      ]}
      ctaFinalTitulo="Seu negócio solar organizado"
      ctaFinalTexto="Combine com PontoPro (instaladores) e ContabilidadePro pro fechamento."
    appUrl="https://solarpro.luquisys.com.br"
    />
  );
}
