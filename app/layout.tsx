import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Benavente Group",
    template: "%s | The Benavente Group",
  },
  description:
    "Hawaii-based real estate appraisers and consultants specializing in valuation, market analysis, and litigation support across Hawai'i and the Pacific.",
  keywords: [
    "Hawaii real estate appraiser",
    "commercial appraisal Hawaii",
    "real estate valuation Honolulu",
    "Pacific real estate consulting",
    "property tax appeal Hawaii",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Benavente Group",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
