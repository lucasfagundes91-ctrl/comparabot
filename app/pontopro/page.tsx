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
          nome: "PontoPro",
          publico: "Conformidade total Portaria 671",
          precoLabel: "R$ 49 + R$ 6/func",
          features: [
            "Plataforma multi-tenant",
            "Até 5 funcionários inclusos",
            "Funcionários extras: R$ 6/mês cada",
            "AFD, AEJ, ATTR (PAdES)",
            "Selfie + GPS",
            "Banco de horas + ajustes",
            "Suporte por e-mail",
          ],
          ctaLabel: "Falar com vendas",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20PontoPro",
          destaque: true,
        },
      ]}
      rodapeHero="R$ 49 base (até 5 func) + R$ 6 por funcionário extra. Sem fidelidade."
      ctaFinalTitulo="Ponto eletrônico sem dor de cabeça"
      ctaFinalTexto="Fiscalização do trabalho não vai te pegar de surpresa."
    />
  );
}
