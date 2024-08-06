import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mushi - Juanshi Tracker 🍄‍🟫🐨",
  description: "Everyday that goes by, Juanshi gets closer to Mushi hunter",
  openGraph: {
    title: "Mushi - Juanshi Tracker 🍄‍🟫🐨",
    description: "Everyday that goes by, Juanshi gets closer to Mushi hunter",
    siteName: "Mushi - Juanshi Tracker 🍄‍🟫🐨",
    images: [
      {
        url: '/opengraph-image.jpeg',
        width: 800,
        height: 600,
      },
      {
        url: '/opengraph-image.jpeg',
        width: 1800,
        height: 1600,
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
