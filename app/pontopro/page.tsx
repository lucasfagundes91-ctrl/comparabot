import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "PontoPro — Ponto eletrônico REP-P (Portaria 671)",
  description:
    "Ponto eletrônico online em conformidade com a Portaria MTP 671/2021. Multi-tenant, selfie, GPS, AFD/AEJ, ATTR — pra PME brasileira.",
};

export default function PontoProPage() {
  return (
    <ProductLayout
      icone="⏱️"
      nome="PontoPro"
      tagline="Ponto eletrônico REP-P em conformidade total"
      descricao={
        <>
          Online, com <strong className="text-white">selfie + GPS</strong>,
          comprovante por batida e AFD/AEJ/ATTR prontos pra fiscalização.
          Conformidade com a <strong className="text-white">Portaria MTP 671/2021</strong>.
        </>
      }
      ctaPrimaria={{
        label: "Falar com vendas",
        href: "mailto:contato@luquisys.com.br?subject=Quero%20o%20PontoPro",
      }}
      ctaSecundaria={{ label: "Ver planos", href: "#planos" }}
      passos={[
        {
          n: "1",
          titulo: "Cadastra empresa e funcionários",
          texto:
            "Empresa, jornada (Comercial 8h pré-pronta), funcionários. Cada um recebe QR code/token via WhatsApp pra bater ponto.",
        },
        {
          n: "2",
          titulo: "Funcionário bate ponto",
          texto:
            "Página pública /ponto/<token> com selfie e GPS opcionais. Comprovante PDF gerado na hora com hash criptográfico.",
        },
        {
          n: "3",
          titulo: "Você fiscaliza e fecha",
          texto:
            "Dashboard ao vivo. Espelho de Ponto mensal. AFD (Anexo II), AEJ (Anexo VI) e ATTR com assinatura PAdES ICP-Brasil.",
        },
      ]}
      features={[
        "Multi-tenant: cada empresa isolada",
        "NSR sequencial criptográfico (Portaria 671)",
        "Selfie + GPS configurável por empresa",
        "Perímetro GPS (lat/lon/raio)",
        "Comprovante PDF instantâneo",
        "Hash SHA256 de integridade",
        "AFD + AEJ + ATTR (com ICP-Brasil)",
        "Banco de horas",
        "Ajustes e justificativas",
      ]}
      planos={[
        {
          nome: "Básico",
          publico: "Equipe pequena (até 5 func)",
          precoLabel: "R$ 29",
          features: [
            "Até 5 funcionários",
            "Ponto via QR/token",
            "Selfie + GPS opcional",
            "Comprovante PDF",
            "Espelho de ponto mensal",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Básico",
          ctaHref: "https://www.asaas.com/c/67uk3ksmifuifly7",
        },
        {
          nome: "Pro",
          publico: "PME completa (até 20 func)",
          precoLabel: "R$ 49",
          features: [
            "Até 20 funcionários inclusos",
            "Funcionários extras: R$ 5/mês cada",
            "AFD + AEJ (Anexo II e VI)",
            "ATTR com PAdES ICP-Brasil",
            "Banco de horas + ajustes",
            "Justificativas e abonos",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Pro",
          ctaHref: "https://www.asaas.com/c/a77msa0ndv1smwxn",
          destaque: true,
        },
        {
          nome: "Empresa",
          publico: "Empresa grande (50+ func)",
          precoLabel: "R$ 149",
          features: [
            "Tudo do Pro",
            "Até 50 funcionários inclusos",
            "Extras: R$ 4/mês cada",
            "Multi-empresa (matriz + filiais)",
            "API pra folha (eSocial)",
            "Suporte prioritário",
          ],
          ctaLabel: "Falar com vendas",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20PontoPro%20Empresa",
        },
      ]}
      rodapeHero="3 planos. Pro a partir de R$ 49 (até 20 func). Sem fidelidade."
      ctaFinalTitulo="Ponto eletrônico sem dor de cabeça"
      ctaFinalTexto="Fiscalização do trabalho não vai te pegar de surpresa."
    appUrl="https://pontopro.luquisys.com.br"
    assinarUrl="https://www.asaas.com/c/a77msa0ndv1smwxn"
    />
  );
}
