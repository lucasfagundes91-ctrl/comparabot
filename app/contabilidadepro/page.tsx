import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "ContabilidadePro — Software + acompanhamento contábil",
  description:
    "Sistema contábil completo com acompanhamento humano de contador. PJ e PF, integração com seus outros sistemas Luquisys.",
};

export default function ContabilidadeProPage() {
  return (
    <ProductLayout
      icone="📊"
      nome="ContabilidadePro"
      tagline="Software + contador, no mesmo lugar"
      descricao={
        <>
          Sistema contábil completo <strong className="text-white">com acompanhamento humano</strong>{" "}
          de contador. PJ e PF, integração com seus outros sistemas Luquisys,
          IRPF do dono e da família.
        </>
      }
      ctaPrimaria={{
        label: "Falar com a gente",
        href: "mailto:contato@luquisys.com.br?subject=Quero%20o%20ContabilidadePro",
      }}
      ctaSecundaria={{ label: "Ver planos", href: "#planos" }}
      passos={[
        {
          n: "1",
          titulo: "Conexão com seus sistemas",
          texto:
            "PDV Pro, FarmPro, ObraPro mandam dados direto. Nada de digitar duas vezes. Notas e lançamentos vêm prontos.",
        },
        {
          n: "2",
          titulo: "Contador acompanha",
          texto:
            "Profissional dedicado responde dúvidas, valida classificação, prepara guias e obrigações acessórias.",
        },
        {
          n: "3",
          titulo: "Você só assina e paga",
          texto:
            "DAS, DCTFWeb, eSocial, IRPF/IRPJ — tudo pronto pra entregar. Lembretes de vencimento automáticos.",
        },
      ]}
      features={[
        "PJ + PF (sócios e família)",
        "Integração nativa com outros Luquisys",
        "Contador dedicado por e-mail/WhatsApp",
        "DAS Simples Nacional mensal",
        "DCTFWeb e eSocial",
        "IRPF anual (sócios e dependentes)",
        "Guias de impostos prontas",
        "Lembretes de vencimento",
        "Lançamentos contábeis automatizados",
      ]}
      planos={[
        {
          nome: "ContabilidadePro",
          publico: "Software + acompanhamento contábil humano",
          precoLabel: "R$ 199",
          features: [
            "Software completo",
            "Contador dedicado",
            "Guias mensais (DAS etc)",
            "DCTFWeb + eSocial",
            "IRPF da família",
            "Integração com sistemas Luquisys",
            "Suporte WhatsApp prioritário",
          ],
          ctaLabel: "Falar com a gente",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20ContabilidadePro",
          destaque: true,
        },
      ]}
      ctaFinalTitulo="Pare de pagar dois lugares"
      ctaFinalTexto="Software + contador no mesmo pacote. Tudo conversando."
    />
  );
}
