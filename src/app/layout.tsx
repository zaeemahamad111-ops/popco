import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "POPCO Premium Popcorn | Always Worth Sharing",
  description: "Experience the luxury of POPCO Premium Popcorn. Sourced from natural farms, popped to perfection, and crafted with purpose. Taste our custom collections including Truffle, Caramel, Cheese, and Original.",
  keywords: ["popcorn", "premium popcorn", "luxury snacks", "POPCO", "truffle popcorn", "caramel popcorn", "artisanal snacks"],
  authors: [{ name: "POPCO" }],
  openGraph: {
    title: "POPCO Premium Popcorn | Always Worth Sharing",
    description: "Experience the luxury of POPCO Premium Popcorn. Sourced from natural farms, popped to perfection, and crafted with purpose.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans bg-background text-foreground antialiased min-h-screen">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
