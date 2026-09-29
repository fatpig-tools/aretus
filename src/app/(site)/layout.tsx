import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { getSiteSettings } from "@/content";
import { isSanityConfigured } from "@/sanity/env";
import { SanityLive } from "@/sanity/lib/live";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteUrl } from "@/lib/site";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  const preview = isSanityConfigured && (await draftMode()).isEnabled;
  return (
    <MotionProvider>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${siteUrl}/#business`,
          name: settings.name,
          slogan: settings.tagline,
          description: settings.footerBlurb,
          url: siteUrl,
          areaServed: ["Odisha", "Eastern India"],
          ...(settings.phone ? { telephone: settings.phone } : {}),
          ...(settings.email ? { email: settings.email } : {}),
          ...(settings.address ? { address: settings.address } : {}),
          knowsAbout: ["Tipper hire", "Earthmoving", "Excavator hire", "Heavy equipment transport", "Highway haulage", "Mining transport"],
        }}
      />
      <SmoothScroll />
      <a
        href="#main"
        className="sr-only z-[60] bg-signal px-4 py-3 font-bold text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <MobileBar settings={settings} />
      {isSanityConfigured ? <SanityLive /> : null}
      {preview ? <VisualEditing /> : null}
    </MotionProvider>
  );
}
