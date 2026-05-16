import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "FarmPro — Gestão da fazenda completa",
  description:
    "OCR de notas, livro caixa, LCDPR, folha de pagamento rural, ponto eletrônico e caderno de campo. Pra produtor rural de verdade, não pra apresentação.",
};

export default function FarmProPage() {
  return (
    <ProductLayout
      icone="🌾"
      nome="FarmPro"
      tagline="A fazenda toda no controle"
      descricao={
        <>
          OCR de notas, <strong className="text-white">livro caixa + LCDPR</strong>,
          folha rural, ponto eletrônico, caderno de campo. Feito pro produtor
          rural brasileiro — não traduzido do agro americano.
        </>
      }
      ctaPrimaria={{
        label: "Falar com vendas",
        href: "mailto:contato@luquisys.com.br?subject=Quero%20o%20FarmPro",
      }}
      ctaSecundaria={{ label: "Ver planos", href: "#planos" }}
      passos={[
        {
          n: "1",
          titulo: "Cadastra a fazenda",
          texto:
            "Talhões, culturas, máquinas, empregados, fornecedores. Importação de planilha aceita.",
        },
        {
          n: "2",
          titulo: "Fotografa e lança",
          texto:
            "Nota fiscal de insumo? Foto e a IA extrai. Lançamento já vai pro livro caixa e LCDPR. Caderno de campo registra atividade por talhão.",
        },
        {
          n: "3",
          titulo: "Fecha o mês e o ano",
          texto:
            "LCDPR pronto pra entregar. Folha de pagamento dos empregados rurais. Relatórios por safra, por talhão, por cultura.",
        },
      ]}
      features={[
        "OCR de nota fiscal por foto (IA Claude)",
        "Livro caixa + LCDPR (entrega obrigatória)",
        "Folha de pagamento rural",
        "Ponto eletrônico dos empregados",
        "Caderno de campo por talhão",
        "Controle de safra, cultura e máquinas",
        "Relatórios por talhão/safra/cultura",
        "Multi-usuário com permissões",
      ]}
      planos={[
        {
          nome: "Básico",
          publico: "Sítio ou fazenda pequena",
          precoLabel: "R$ 69",
          features: [
            "Caderno de campo",
            "OCR de notas (até 50/mês)",
            "Livro caixa",
            "Até 5 talhões",
            "1 usuário",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Básico",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20FarmPro%20B%C3%A1sico",
        },
        {
          nome: "Pro",
          publico: "Produtor rural completo",
          precoLabel: "R$ 119",
          features: [
            "Talhões e culturas ilimitados",
            "OCR de notas ilimitado",
            "Livro caixa + LCDPR",
            "Folha rural completa",
            "Ponto eletrônico embutido",
            "Caderno de campo",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Pro",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20FarmPro",
          destaque: true,
        },
        {
          nome: "Empresa",
          publico: "Grupo com múltiplas fazendas",
          precoLabel: "R$ 249",
          features: [
            "Tudo do Pro",
            "Multi-fazenda (até 5)",
            "Relatórios consolidados",
            "Comparativo entre safras",
            "API + integrações",
            "Suporte prioritário",
          ],
          ctaLabel: "Falar com vendas",
          ctaHref:
            "mailto:contato@luquisys.com.br?subject=Quero%20o%20FarmPro%20Empresa",
        },
      ]}
      ctaFinalTitulo="A fazenda merece um sistema feito pra ela"
      ctaFinalTexto="Combine com SolarPro (se gera energia solar) e ContabilidadePro pro fechamento."
    appUrl="https://farmpro.luquisys.com.br"
    />
  );
}
