import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  weight: ["300", "400", "500"]
});

const syne = Syne({ 
  subsets: ["latin"], 
  variable: "--font-syne",
  weight: ["400", "700", "800"]
});

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "Creative Developer Portfolio - Indonesia Based",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-[#050505] text-[#e0e0e0] font-[var(--font-inter)] overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
