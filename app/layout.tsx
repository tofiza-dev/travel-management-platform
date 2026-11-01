import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display serif for headlines — gives the page an editorial voice next to Geist.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Tofiza Tours & Travels — Hotels in Cox's Bazar",
    template: "%s",
  },
  description:
    "Book verified beachside hotels in Cox's Bazar with live rates, a room held while you pay, and instant confirmation. Local support from our Kolatoli office.",
  keywords: ["Cox's Bazar hotels", "Kolatoli hotels", "hotel booking Bangladesh", "tofiza"],
  openGraph: {
    title: "Tofiza — Hotels in Cox's Bazar",
    description: "Verified beachside stays in Cox's Bazar, booked end to end.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
