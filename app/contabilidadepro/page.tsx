import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "ContabilidadePro — Software + acompanhamento contábil",
  description:
    "Sistema contábil completo com acompanhamento humano de contador. PJ e PF, integração com seus outros sistemas Luqsys.",
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
          de contador. PJ e PF, integração com seus outros sistemas Luqsys,
          IRPF do dono e da família.
        </>
      }
      ctaPrimaria={{
        label: "Falar com a gente",
        href: "mailto:contato@luqsys.com.br?subject=Quero%20o%20ContabilidadePro",
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
        "Integração nativa com outros Luqsys",
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
          nome: "Software",
          publico: "Só o sistema, sem contador",
          precoLabel: "R$ 99",
          features: [
            "Software completo",
            "PJ + PF",
            "Lançamentos automáticos",
            "Integração com sistemas Luqsys",
            "Lembretes de vencimento",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Software",
          ctaHref: "https://www.asaas.com/c/alf8qiy9p8nazwx8",
        },
        {
          nome: "Pro",
          publico: "Software + contador dedicado",
          precoLabel: "R$ 199",
          features: [
            "Tudo do Software",
            "Contador dedicado por WhatsApp",
            "Guias mensais (DAS etc)",
            "DCTFWeb + eSocial",
            "IRPF de até 2 sócios + dependentes",
            "Suporte WhatsApp prioritário",
          ],
          ctaLabel: "Assinar Pro",
          ctaHref: "https://www.asaas.com/c/4ugw3ktqktdu8kqt",
          destaque: true,
        },
        {
          nome: "Premium",
          publico: "Múltiplas empresas e sócios",
          precoLabel: "R$ 399",
          features: [
            "Tudo do Pro",
            "Até 3 CNPJs",
            "IRPF ilimitado (sócios + família)",
            "Assessoria fiscal/tributária",
            "Planejamento tributário anual",
            "Suporte 24h em dia útil",
          ],
          ctaLabel: "Assinar Premium",
          ctaHref: "https://www.asaas.com/c/4w4k8ghm6n06vsxy",
        },
      ]}
      ctaFinalTitulo="Pare de pagar dois lugares"
      ctaFinalTexto="Software + contador no mesmo pacote. Tudo conversando."
    appUrl="https://contabilidadepro.luqsys.com.br"
    assinarUrl="https://www.asaas.com/c/alf8qiy9p8nazwx8"
    />
  );
}
