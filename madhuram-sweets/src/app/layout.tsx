import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import Chatbot from "@/components/shared/Chatbot";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madhuram Sweets – Pure & Sure Organic Sweet Shop | Best Sweets in Deoghar",
  description: "Madhuram Sweets – Pure & Sure is a traditional Indian sweet shop in Deoghar, Jharkhand. We offer 100% pure desi ghee sweets, organic honey, phalahari items for vrat, and premium prasad. Order online for delivery across India.",
  keywords: ["Madhuram Sweets", "sweet shop", "Deoghar", "Jharkhand", "Indian sweets", "mithai", "pure desi ghee", "organic honey", "phalahari", "prasad", "Bol-Bam", "vrat", "Baidyanath Temple", "peda", "barfi", "laddu", "rasgulla"],
  authors: [{ name: "Madhuram Sweets" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Madhuram Sweets – Pure & Sure Organic Sweet Shop",
    description: "Best Sweet Shop in Deoghar | Pure, Fresh & Organic Sweets prepared with 100% pure desi ghee",
    url: "https://madhuramsweets.in",
    siteName: "Madhuram Sweets",
    type: "website",
    locale: "hi_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Madhuram Sweets – Pure & Sure Organic Sweet Shop",
    description: "Best Sweet Shop in Deoghar | Pure, Fresh & Organic Sweets",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground font-sans`}
        style={{
          fontFamily: `${inter.style.fontFamily}, system-ui, sans-serif`,
        }}
      >
        <LanguageProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <WhatsAppButton />
            <Chatbot />
          </CartProvider>
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
