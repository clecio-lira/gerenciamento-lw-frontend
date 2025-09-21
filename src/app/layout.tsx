import type { Metadata } from "next";

import { AuthProvider } from "@/context/AuthContext";

import "./globals.css";
import { Montserrat, Josefin_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: "Gerenciamento LW",
  description: "Gerenciamento LW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${josefin.variable}`}>
      <AuthProvider>
        <body>
          {children} <Toaster richColors position="top-right" />
        </body>
      </AuthProvider>
    </html>
  );
}
