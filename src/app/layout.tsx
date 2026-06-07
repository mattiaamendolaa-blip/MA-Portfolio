import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/Context/LanguageContext";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050816",
};

export const metadata: Metadata = {
  title: "Mattia Amendola - Full-Stack Developer",
  description:
    "Portfolio di Mattia Amendola - Full-Stack Developer e Software Architect",
  authors: [{ name: "Mattia Amendola" }],
  keywords: [
    "Full-Stack Developer",
    "Software Architect",
    "React",
    "Angular",
    "TypeScript",
    "Node.js",
    "Spring Boot",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    title: "Mattia Amendola - Full-Stack Developer",
    description:
      "Portfolio di Mattia Amendola ",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Mattia Amendola Portfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mattia Amendola - Full-Stack Developer",
    description: "Portfolio di Mattia Amendola - Full-Stack Developer e Software Architect.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          inter.className,
          inter.variable,
          spaceGrotesk.variable,
          "min-h-screen bg-neutral-50 text-neutral-900 antialiased transition-colors duration-500 dark:bg-neutral-950 dark:text-neutral-50",
          "selection:bg-emerald-500/30 selection:text-emerald-200",
        )}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}