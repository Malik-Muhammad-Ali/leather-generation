import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Leather Generation | Crafted for Generations",
  description:
    "Premium leather jackets, wallets, belts, bags and accessories designed with timeless craftsmanship and modern elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-black font-inter">
        <ShopProvider>
          <LoadingScreen />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
