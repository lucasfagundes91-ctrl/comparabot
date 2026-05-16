import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luqsys.com.br"),
  title: {
    default: "Luqsys — Sistemas de Gestão Empresarial",
    template: "%s · Luqsys",
  },
  description:
    "Soluções práticas de gestão para pequenas e médias empresas. Bots, automações e sistemas que economizam tempo e dinheiro.",
  icons: {
    icon: "/luqsys-logo.png",
    apple: "/luqsys-logo.png",
  },
  openGraph: {
    title: "Luqsys — Sistemas de Gestão Empresarial",
    description:
      "Soluções práticas de gestão para pequenas e médias empresas.",
    url: "https://luqsys.com.br",
    siteName: "Luqsys",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/luqsys-og.png",
        width: 1200,
        height: 630,
        alt: "Luqsys — Sistemas de Gestão Empresarial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luqsys — Sistemas de Gestão Empresarial",
    description:
      "Soluções práticas de gestão para pequenas e médias empresas.",
    images: ["/luqsys-og.png"],
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
