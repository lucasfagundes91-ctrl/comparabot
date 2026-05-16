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

  "farmpro-safra": {
    slug: "farmpro-safra",
    produto: "FarmPro",
    produtoIcone: "🌾",
    produtoPath: "/farmpro",
    hero: {
      selo: "PROMO SAFRA 2026",
      titulo: "FarmPro Pro com 40% OFF nos 3 primeiros meses",
      subtitulo:
        "Livro caixa, LCDPR, folha rural, ponto eletrônico e caderno de campo num só lugar. Direto do celular, com OCR de nota.",
    },
    oferta: {
      descontoLabel: "40% OFF · primeiros 3 meses",
      precoOriginal: "R$ 119",
      precoPromo: "R$ 71",
      sufixoPreco: "/mês",
      detalhe: "Depois R$ 119/mês. Cancele quando quiser, sem multa.",
    },
    bullets: [
      "OCR de notas fiscais: foto → lançamento em 5 segundos",
      "Livro caixa rural + LCDPR pronto pro contador",
      "Folha rural e ponto eletrônico dos peões",
      "Caderno de campo digital por talhão",
      "WhatsApp pra lançar entrada/saída no campo",
      "Suporte por WhatsApp em horário comercial",
    ],
    depoimentos: [],
    garantia: "7 dias de garantia. Não curtiu? Devolvemos 100% do valor.",
    whatsappMsg:
      "Oi Lucas! Vim da promo FarmPro Safra 2026 e quero ativar minha conta.",
    utmCampaign: "farmpro-safra",
  },

  "pdvpro-implantacao-zero": {
    slug: "pdvpro-implantacao-zero",
    produto: "PDV Pro",
    produtoIcone: "🛒",
    produtoPath: "/pdvpro",
    hero: {
      selo: "CONDIÇÃO PRA NOVA LOJA",
      titulo: "PDV Pro com implantação grátis + 50% OFF no 1º mês",
      subtitulo:
        "13 módulos: PDV, estoque, financeiro, NF-e, fiscal, contabilidade. Sai da planilha hoje e roda no caixa amanhã.",
    },
    oferta: {
      descontoLabel: "Implantação grátis + 50% OFF no 1º mês",
      precoOriginal: "R$ 199",
      precoPromo: "R$ 99",
      sufixoPreco: "/mês",
      detalhe:
        "Implantação assistida normalmente custa R$ 497. Depois R$ 199/mês. Cancele quando quiser.",
    },
    bullets: [
      "PDV completo (frente de caixa + sangria + sangramento)",
      "Estoque com entrada por XML de nota",
      "Emissão de NF-e e NFC-e direto do sistema",
      "Financeiro: contas a pagar, receber e fluxo de caixa",
      "Relatórios fiscais prontos pro contador",
      "Migração da planilha/sistema antigo feita por nós",
      "Suporte por WhatsApp 6 dias por semana",
    ],
    depoimentos: [],
    garantia:
      "Se em 15 dias não estiver rodando, devolvemos 100% e ajudamos a voltar pra solução anterior.",
    whatsappMsg:
      "Oi Lucas! Vim da promo PDV Pro com implantação grátis e quero conversar.",
    utmCampaign: "pdvpro-implantacao-zero",
  },

  "frotapro-5veiculos": {
    slug: "frotapro-5veiculos",
    produto: "FrotaPro",
    produtoIcone: "🚚",
    produtoPath: "/frotapro",
    hero: {
      selo: "CONDIÇÃO PARA FROTAS PEQUENAS",
      titulo: "FrotaPro com 2 meses grátis",
      subtitulo:
        "Pra empresas com 5 a 50 veículos: IPVA, seguro, manutenção, abastecimento e multas tudo organizado por veículo.",
    },
    oferta: {
      descontoLabel: "2 meses grátis · anuidade no plano Pro",
      precoOriginal: "R$ 49",
      precoPromo: "R$ 41",
      sufixoPreco: "/mês",
      detalhe:
        "Equivalente a 2 meses grátis no plano anual (12x R$ 41 em vez de 12x R$ 49). Sem reajuste no primeiro ano.",
    },
    bullets: [
      "Cadastro ilimitado de veículos no plano Pro",
      "Alerta automático de IPVA, licenciamento e revisão",
      "Controle de abastecimento (km/l por veículo)",
      "Histórico de manutenção e gastos por placa",
      "Multas centralizadas com prazo de defesa",
      "Relatório mensal de custo por veículo pro financeiro",
    ],
    depoimentos: [],
    garantia: "7 dias de garantia. Não curtiu? Devolvemos 100% do valor.",
    whatsappMsg:
      "Oi Lucas! Vim da promo FrotaPro com 2 meses grátis e quero ativar pra minha empresa.",
    utmCampaign: "frotapro-5veiculos",
  },
};
