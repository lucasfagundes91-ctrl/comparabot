import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "PDV Pro — PDV + ERP completo pra loja",
  description:
    "Frente de caixa, estoque, financeiro, NF-e, etiquetas com código de barras, comissões e atendimento WhatsApp por IA. Tudo em um sistema.",
};

export default function PDVProPage() {
  return (
    <ProductLayout
      icone="🛒"
      nome="PDV Pro"
      tagline="PDV + ERP completo pra loja física"
      descricao={
        <>
          13 módulos cobrindo do <strong className="text-white">caixa</strong>{" "}
          até a <strong className="text-white">contabilidade</strong>: PDV,
          estoque, financeiro, NF-e, etiquetas, comissões e atendimento WhatsApp
          por IA — tudo em um sistema.
        </>
      }
      ctaPrimaria={{
        label: "Falar com vendas",
        href: "mailto:contato@luquisys.com.br?subject=Quero%20o%20PDV%20Pro",
      }}
      ctaSecundaria={{ label: "Ver planos", href: "#planos" }}
      passos={[
        {
          n: "1",
          titulo: "Cadastra a loja",
          texto:
            "Produtos (com CSV em massa), fornecedores, clientes, fabricantes. Etiquetas com código de barras impressas direto.",
        },
        {
          n: "2",
          titulo: "Opera o caixa",
          texto:
            "Frente de caixa fluida com busca rápida, crediário, troco automático, sangria/suprimento. Abre e fecha o caixa com 1 clique.",
        },
        {
          n: "3",
          titulo: "Vende pelo WhatsApp",
          texto:
            "Luluzinha (IA) atende o cliente, qualifica o pedido e cria um rascunho. Você confirma e vira venda real no PDV.",
        },
      ]}
      features={[
        "PDV com crediário, troco e múltiplas formas de pagamento",
        "Compras geram contas a pagar e atualizam estoque",
        "Financeiro: contas a pagar, a receber, receitas, despesas",
        "NF-e via Focus NFe (Simples Nacional)",
        "Etiquetas com código de barras (JsBarcode)",
        "Comissão por vendedor",
        "Devolução total ou parcial",
        "Atendimento WhatsApp com IA (Luluzinha) — incluso",
        "Relatórios + export Excel",
        "Dashboard com vendas, estoque baixo, top produtos",
      ]}
      planos={[
        {
          nome: "PDV Pro",
          publico: "PDV + ERP + WhatsApp com IA",
          precoLabel: "R$ 97",
          precoDe: "R$ 129",
          features: [
            "13 módulos completos",
            "Usuários ilimitados",
            "Produtos e clientes ilimitados",
            "NF-e ilimitada (token Focus NFe à parte)",
            "Atendimento WhatsApp com IA (Luluzinha)",
            "Suporte por e-mail e WhatsApp",
          ],
          ctaLabel: "Assinar agora",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20PDV%20Pro",
          destaque: true,
        },
      ]}
      ctaFinalTitulo="A loja inteira em um sistema só"
      ctaFinalTexto="Combine com ContabilidadePro e PontoPro pra um varejo 100% no controle."
    />
  );
}
