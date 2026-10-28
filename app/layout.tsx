import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokédex TCG | Minhas cartas favoritas",
  description: "Busque cartas de Pokémon TCG e salve suas favoritas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
