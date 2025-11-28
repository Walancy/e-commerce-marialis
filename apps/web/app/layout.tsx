import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Marilis Profissional | Suprimentos de Salão e Beleza",
  description: "Equipamentos premium e cosméticos para profissionais de salão.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider defaultTheme="light" storageKey="marialis-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
