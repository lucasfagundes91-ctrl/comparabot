import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luquisys.com.br"),
  title: {
    default: "Luquisys — Sistemas de Gestão Empresarial",
    template: "%s · Luquisys",
  },
  description:
    "Soluções práticas de gestão para pequenas e médias empresas. Bots, automações e sistemas que economizam tempo e dinheiro.",
  openGraph: {
    title: "Luquisys — Sistemas de Gestão Empresarial",
    description:
      "Soluções práticas de gestão para pequenas e médias empresas.",
    url: "https://luquisys.com.br",
    siteName: "Luquisys",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen bg-bg font-sans antialiased">{children}</body>
    </html>
  );
}
