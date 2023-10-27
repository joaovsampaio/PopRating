import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "800"] });

export const metadata: Metadata = {
  title: "PopRating",
  description:
    "O PopRating é um blog de críticas sobre filmes, séries, livros e música",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <Providers>
        <body className={poppins.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
