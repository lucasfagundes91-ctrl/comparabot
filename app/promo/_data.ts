export type Depoimento = {
  nome: string;
  texto: string;
  cargo?: string;
};

export type PromoData = {
  slug: string;
  produto: string;
  produtoIcone: string;
  produtoPath: string;
  hero: {
    selo: string;
    titulo: string;
    subtitulo: string;
  };
  oferta: {
    descontoLabel: string;
    precoOriginal: string;
    precoPromo: string;
    sufixoPreco?: string;
    detalhe?: string;
  };
  bullets: string[];
  depoimentos: Depoimento[];
  garantia?: string;
  whatsappMsg: string;
  utmCampaign: string;
  expiraEm?: string;
};

const WHATSAPP_NUMERO = "5545991077788";

export function buildWhatsappLink(promo: PromoData): string {
  const msg = encodeURIComponent(promo.whatsappMsg);
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${msg}`;
}

export const promos: Record<string, PromoData> = {
  "bankpro-50off": {
    slug: "bankpro-50off",
    produto: "BankPro",
    produtoIcone: "🏦",
    produtoPath: "/bankpro",
    hero: {
      selo: "OFERTA POR TEMPO LIMITADO",
      titulo: "BankPro com 50% OFF nos 3 primeiros meses",
      subtitulo:
        "Toda a sua vida financeira no controle pelo WhatsApp e no app web. Sem planilha, sem complicação.",
    },
    oferta: {
      descontoLabel: "50% OFF · primeiros 3 meses",
      precoOriginal: "R$ 49",
      precoPromo: "R$ 24",
      sufixoPreco: "/mês",
      detalhe: "Depois R$ 49/mês. Cancele quando quiser, sem multa.",
    },
    bullets: [
      "Lança gasto pelo WhatsApp em segundos (texto, foto ou áudio)",
      "Importa OFX de qualquer banco brasileiro",
      "Controla família inteira no mesmo painel",
      "Assistente IA pra responder qualquer pergunta financeira",
      "Cancele quando quiser — sem fidelidade",
    ],
    depoimentos: [],
    garantia: "7 dias de garantia. Não curtiu? Devolvemos 100% do valor.",
    whatsappMsg:
      "Oi Lucas! Vim da promo BankPro 50% OFF e quero ativar minha conta.",
    utmCampaign: "bankpro-50off",
  },
};
