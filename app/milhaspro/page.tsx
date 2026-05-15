import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "MilhasPro — Passagens em milhas pro cidadão comum",
  description:
    "Buscador de passagens em milhas (Smiles, TudoAzul) com veredito automático: Ótimo, Bom, Ok ou Caro. Em português, sem jargão.",
};

export default function MilhasProPage() {
  return (
    <ProductLayout
      icone="🎫"
      nome="MilhasPro"
      tagline="Passagens em milhas em português, sem jargão"
      descricao={
        <>
          Procure passagens em <strong className="text-white">Smiles</strong> e{" "}
          <strong className="text-white">TudoAzul</strong> e receba na hora o
          veredito:{" "}
          <span className="text-gold">Ótimo · Bom · Ok · Caro</span>. O app
          decide pra você se vale a pena.
        </>
      }
      ctaPrimaria={{
        label: "Falar com a gente",
        href: "mailto:contato@luquisys.com.br?subject=Quero%20o%20MilhasPro",
      }}
      ctaSecundaria={{ label: "Ver planos", href: "#planos" }}
      passos={[
        {
          n: "1",
          titulo: "Cadastra suas milhas",
          texto:
            "Saldo Smiles, TudoAzul, validade, CPM atual. O app calcula o valor real do milheiro pra você.",
        },
        {
          n: "2",
          titulo: "Busca destino ou janela",
          texto:
            "Modo 'pra onde dá pra ir' com suas milhas, ou 'tenho um destino, quando voa mais barato'. Janela de datas.",
        },
        {
          n: "3",
          titulo: "Veredito automático",
          texto:
            "Cada oferta vem com selo: Ótimo, Bom, Ok, Caro. Você não precisa entender cURL, milhas/R$ ou inglês.",
        },
      ]}
      features={[
        "Dados reais de Smiles e TudoAzul (sem demo)",
        "Veredito automático em cada oferta",
        "Suas milhas com alerta de vencimento",
        "Rotas monitoradas com teto de milhas",
        "Calculadora de valor do milheiro",
        "Assistente IA: 'vale a pena essa oferta?'",
        "Mobile-first, 100% em português",
        "Sem necessidade de cadastro nas companhias",
      ]}
      planos={[
        {
          nome: "MilhasPro",
          publico: "Buscas ilimitadas + alertas",
          precoLabel: "R$ 49",
          features: [
            "Buscas ilimitadas Smiles + TudoAzul",
            "Carteira de milhas com alerta de vencimento",
            "Rotas monitoradas",
            "Assistente IA",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar agora",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20MilhasPro",
          destaque: true,
        },
      ]}
      ctaFinalTitulo="Voe mais barato sem virar especialista"
      ctaFinalTexto="Suas milhas estão valendo a pena? O MilhasPro responde."
    />
  );
}
