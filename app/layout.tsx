import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Silkscreen } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "uimix - Modern React Component Library",
  description: "A modern, beautiful, and highly customizable React component library built with Next.js 15, React 19, and Tailwind CSS 4. 20+ premium components for your next project.",
  keywords: ["react", "nextjs", "tailwindcss", "components", "ui", "design-system", "framer-motion", "typescript"],
  authors: [{ name: "uimix team", url: "https://github.com/larsen66/uimix" }],
  creator: "uimix team",
  publisher: "uimix team",
  metadataBase: new URL("https://github.com/larsen66/uimix"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/larsen66/uimix",
    title: "uimix - Modern React Component Library",
    description: "A modern, beautiful, and highly customizable React component library built with Next.js 15, React 19, and Tailwind CSS 4.",
    siteName: "uimix",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "uimix - Modern React Component Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "uimix - Modern React Component Library",
    description: "A modern, beautiful, and highly customizable React component library built with Next.js 15, React 19, and Tailwind CSS 4.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      {
        url: "/logo.png",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/logo.png",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable} ${silkscreen.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
