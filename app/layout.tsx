import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raptor Explorer - Car data analytics for Turo",
  description: "Turo Analytics - Find profitable cars to list on Turo. Do Your Own Research - easily scrape data from Turo, download CSV and make smarter financial decisions. Forecast your ROI on Turo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}