import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { LanguageProvider } from "@/Context/LanguageContext";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050816",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mattia-amendola.dev"),
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
    locale: "it_IT",
    title: "Mattia Amendola - Full-Stack Developer",
    description: "Portfolio di Mattia Amendola - Full-Stack Developer e Software Architect.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mattia Amendola - Full-Stack Developer",
    description: "Portfolio di Mattia Amendola - Full-Stack Developer e Software Architect.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={cn(
          inter.className,
          inter.variable,
          spaceGrotesk.variable,
          "min-h-dvh bg-[hsl(210_20%_98%)] text-neutral-900 antialiased transition-colors duration-500 dark:bg-[hsl(226_63%_6%)] dark:text-neutral-50",
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mattia Amendola",
              jobTitle: "Full-Stack Developer",
              //url: "https://mattia-amendola.dev",
              email: "mailto:mattiaa.mendolaa@gmail.com",
              sameAs: [
                "https://github.com/mattiaamendolaa-blip",
                "https://www.linkedin.com/in/mattia-amendola-726713307/",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Spring Boot",
                "Angular",
                "Full-Stack Development",
              ],
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
        >
          Vai al contenuto principale
        </a>
        <ThemeProvider>
          <LenisProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}