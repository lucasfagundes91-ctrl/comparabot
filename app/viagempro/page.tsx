import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "ViagemPro — Planejador de viagens com IA",
  description:
    "Roteiro dia a dia, comparador carro × avião × ônibus, sugestões de restaurantes e assistente IA — tudo em um app de viagens.",
};

export default function ViagemProPage() {
  return (
    <ProductLayout
      icone="🧳"
      nome="ViagemPro"
      tagline="Planeje sua viagem do roteiro ao restaurante"
      descricao={
        <>
          IA monta o <strong className="text-white">roteiro dia a dia</strong>,
          compara <strong className="text-white">carro × avião × ônibus</strong>
          , sugere onde comer e responde dúvidas durante a viagem.
        </>
      }
      ctaPrimaria={{
        label: "Falar com a gente",
        href: "mailto:contato@luquisys.com.br?subject=Quero%20o%20ViagemPro",
      }}
      ctaSecundaria={{ label: "Ver planos", href: "#planos" }}
      passos={[
        {
          n: "1",
          titulo: "Conta a viagem",
          texto:
            "Destino, datas, quantas pessoas, orçamento, estilo (família, casal, mochilão). Ou descubra um destino pelo orçamento.",
        },
        {
          n: "2",
          titulo: "IA monta o roteiro",
          texto:
            "Atividades dia a dia editáveis. Compara transporte. Sugere restaurantes (com favoritos). Tudo em segundos.",
        },
        {
          n: "3",
          titulo: "Assistente durante a viagem",
          texto:
            "Chat contextual: 'qual o melhor caminho daqui pro hotel?', 'onde almoçar perto?'. Como um guia local no bolso.",
        },
      ]}
      features={[
        "Roteiro dia a dia gerado por IA",
        "Comparador carro × avião × ônibus",
        "Sugestões de restaurantes com favoritos",
        "Modo 'descubra um destino'",
        "Assistente IA contextual durante a viagem",
        "Múltiplas viagens salvas",
        "Edição manual de qualquer atividade",
        "Compartilhamento do roteiro",
      ]}
      planos={[
        {
          nome: "Básico",
          publico: "Pra viajantes ocasionais",
          precoLabel: "R$ 19",
          features: [
            "Até 2 viagens ativas",
            "Roteiro básico por IA",
            "Comparador de transporte",
            "Sem assistente IA durante viagem",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Básico",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20ViagemPro%20B%C3%A1sico",
        },
        {
          nome: "Pro",
          publico: "Pra quem viaja sempre",
          precoLabel: "R$ 49",
          features: [
            "Viagens ilimitadas",
            "Roteiros completos por IA",
            "Comparador de transporte",
            "Sugestões de restaurantes",
            "Assistente IA durante a viagem",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Pro",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20ViagemPro",
          destaque: true,
        },
        {
          nome: "Família",
          publico: "Pra viajar em grupo",
          precoLabel: "R$ 89",
          features: [
            "Tudo do Pro",
            "Até 5 pessoas compartilhando",
            "Lista de bagagem compartilhada",
            "Divisão de despesas",
            "Roteiro colaborativo",
            "Suporte prioritário",
          ],
          ctaLabel: "Assinar Família",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20ViagemPro%20Fam%C3%ADlia",
        },
      ]}
      ctaFinalTitulo="Sua próxima viagem planejada em minutos"
      ctaFinalTexto="Sem ficar 3 horas no Google Maps. A IA monta, você ajusta."
    appUrl="https://viagempro.luquisys.com.br"
    />
  );
}
