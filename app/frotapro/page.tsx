import type { Metadata } from "next";
import { ProductLayout } from "../_components/ProductLayout";

export const metadata: Metadata = {
  title: "FrotaPro — Gestão de frota PME",
  description:
    "Controle de IPVA, seguro, manutenção, abastecimento e multas pra cada veículo da sua frota. Lembretes automáticos e dashboard por veículo.",
};

export default function FrotaProPage() {
  return (
    <ProductLayout
      icone="🚚"
      nome="FrotaPro"
      tagline="Sua frota inteira no controle"
      descricao={
        <>
          Pra empresas com <strong className="text-white">5 a 50 veículos</strong>:
          IPVA, seguro, manutenção, abastecimento, multas — tudo organizado por
          veículo com lembretes automáticos.
        </>
      }
      ctaPrimaria={{
        label: "Falar com a gente",
        href: "mailto:contato@luquisys.com.br?subject=Quero%20o%20FrotaPro",
      }}
      ctaSecundaria={{ label: "Ver planos", href: "#planos" }}
      passos={[
        {
          n: "1",
          titulo: "Cadastra a frota",
          texto:
            "Cada veículo com placa, modelo, KM atual, IPVA, seguro, vencimentos. Foto pra identificar rápido.",
        },
        {
          n: "2",
          titulo: "Equipe lança gastos",
          texto:
            "Abastecimento, manutenção, multa — vinculados ao KM no momento. OCR de comprovante por foto. Multi-usuário com permissões.",
        },
        {
          n: "3",
          titulo: "Lembretes + dashboard",
          texto:
            "Avisa antes de vencer IPVA, seguro, revisão. Dashboard por categoria mostra onde o dinheiro está indo.",
        },
      ]}
      features={[
        "Categorias: dia a dia, coleção, projeto",
        "Gastos vinculados ao KM no momento",
        "IPVA + seguro com vencimento automático",
        "Histórico de manutenção por veículo",
        "OCR de comprovante via foto",
        "Lembretes recorrentes ou por data",
        "Dashboard com gráficos por categoria",
        "Multi-usuário com login (motoristas + gestor)",
      ]}
      planos={[
        {
          nome: "Básico",
          publico: "Frota pequena (até 5 veículos)",
          precoLabel: "R$ 29",
          features: [
            "Até 5 veículos",
            "1 usuário",
            "IPVA + seguro + manutenção",
            "Lembretes automáticos",
            "Sem OCR de comprovante",
            "Suporte por e-mail",
          ],
          ctaLabel: "Assinar Básico",
          ctaHref: "https://www.asaas.com/c/a5ax24hq7f8iitdk",
        },
        {
          nome: "Pro",
          publico: "Frota empresarial",
          precoLabel: "R$ 49",
          features: [
            "Veículos ilimitados",
            "Usuários ilimitados",
            "OCR de comprovante",
            "Lembretes automáticos",
            "Relatórios e dashboards",
            "Assistente IA",
            "Suporte prioritário",
          ],
          ctaLabel: "Assinar Pro",
          ctaHref: "https://www.asaas.com/c/q7naaqzljwdl3hxe",
          destaque: true,
        },
        {
          nome: "Empresa",
          publico: "Frota grande com várias filiais",
          precoLabel: "R$ 99",
          features: [
            "Tudo do Pro",
            "Multi-empresa (CNPJs)",
            "Centros de custo",
            "API + integrações",
            "Relatórios consolidados",
            "Onboarding dedicado",
          ],
          ctaLabel: "Assinar Empresa",
          ctaHref: "https://www.asaas.com/c/b0h36jbs6uwb6lsz",
        },
      ]}
      ctaFinalTitulo="Frota no controle, sem planilha"
      ctaFinalTexto="Você sabe quanto cada veículo está custando por KM rodado?"
    appUrl="https://frotapro.luquisys.com.br"
    assinarUrl="https://www.asaas.com/c/q7naaqzljwdl3hxe"
    />
  );
}
