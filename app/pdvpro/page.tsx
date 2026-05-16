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
        href: "mailto:contato@luqsys.com.br?subject=Quero%20o%20PDV%20Pro",
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
          nome: "Básico",
          publico: "Loja pequena começando",
          precoLabel: "R$ 99",
          features: [
            "PDV + Caixa + Estoque",
            "1 usuário",
            "Até 500 produtos",
            "Sem NF-e",
            "Sem WhatsApp IA",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Básico",
          ctaHref: "https://www.asaas.com/c/jhpczcfk1jp2k82s",
        },
        {
          nome: "Pro",
          publico: "A loja completa",
          precoLabel: "R$ 199",
          features: [
            "13 módulos completos",
            "Usuários ilimitados",
            "Produtos e clientes ilimitados",
            "NF-e ilimitada (token Focus NFe à parte)",
            "Atendimento WhatsApp com IA (Luluzinha)",
            "Suporte por e-mail e WhatsApp",
          ],
          ctaLabel: "Assinar Pro",
          ctaHref: "https://www.asaas.com/c/l3c8v5dx1nh84z0k",
          destaque: true,
        },
        {
          nome: "Empresa",
          publico: "Rede com várias lojas",
          precoLabel: "R$ 399",
          features: [
            "Tudo do Pro",
            "Até 5 lojas/filiais",
            "Dashboard consolidado",
            "API pra integrações",
            "Onboarding dedicado",
            "Suporte prioritário 24/7",
          ],
          ctaLabel: "Assinar Empresa",
          ctaHref: "https://www.asaas.com/c/0gfob8hswmye4emq",
        },
      ]}
      ctaFinalTitulo="A loja inteira em um sistema só"
      ctaFinalTexto="Combine com ContabilidadePro e PontoPro pra um varejo 100% no controle."
    appUrl="https://pdvpro.luqsys.com.br"
    assinarUrl="https://www.asaas.com/c/l3c8v5dx1nh84z0k"
    />
  );
}
