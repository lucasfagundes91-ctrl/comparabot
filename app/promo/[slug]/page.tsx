import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { promos } from "../_data";
import { PromoLayout } from "../_PromoLayout";

export function generateStaticParams() {
  return Object.keys(promos).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const promo = promos[slug];
  if (!promo) {
    return { title: "Promoção não encontrada", robots: { index: false } };
  }
  return {
    title: `${promo.hero.titulo} · Luqsys`,
    description: promo.hero.subtitulo,
    robots: { index: false, follow: false },
    openGraph: {
      title: promo.hero.titulo,
      description: promo.hero.subtitulo,
      type: "website",
    },
  };
}

export default async function PromoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const promo = promos[slug];
  if (!promo) notFound();
  return <PromoLayout promo={promo} />;
}
