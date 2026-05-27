import type { Metadata } from "next";
import { Space_Grotesk, Montserrat } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "KEEF MULTIMARCAS",
  description: "Loja premium de moda e calçados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${montserrat.variable}`}>
      <body className="bg-[#050505] text-white">{children}</body>
    </html>
  );
}
