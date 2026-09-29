import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Archivo is variable in weight and width; the display style uses a semi-expanded cut.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aretus Enterprises | Transport, Haulage & Construction Fleet, Odisha",
    template: "%s",
  },
  applicationName: "Aretus Enterprises",
  openGraph: { type: "website", siteName: "Aretus Enterprises", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#111417",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${plexMono.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
