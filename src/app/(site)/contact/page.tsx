import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getContactPage, getSiteSettings } from "@/content";
import { phoneDigits } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContactPage({ stega: false });
  return { title: seo.title, description: seo.description, alternates: { canonical: "/contact" } };
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContactPage(), getSiteSettings()]);
  const phone = phoneDigits(settings.phone);
  const wa = phoneDigits(settings.whatsapp ?? settings.phone)?.replace("+", "");
  const details = [
    settings.address && { icon: MapPin, label: "Address", value: settings.address },
    phone && { icon: Phone, label: "Phone", value: settings.phone, href: `tel:${phone}` },
    wa && { icon: MessageCircle, label: "WhatsApp", value: "Message us on WhatsApp", href: `https://wa.me/${wa}` },
    settings.email && { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    settings.hours && { icon: Clock, label: "Working hours", value: settings.hours },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero eyebrow="Contact" headline={page.headline} intro={page.intro} highlight={["next"]} />
      <section className="shell grid gap-16 pb-24 md:pb-36 lg:grid-cols-[1.6fr_1fr] lg:gap-24">
        <Reveal>
          <ContactForm page={page} />
        </Reveal>
        <Reveal delay={0.15}>
          <aside aria-label="Contact details" className="border-t-4 border-signal bg-asphalt p-8 md:p-10">
            <h2 className="display text-3xl">{settings.name}</h2>
            {details.length ? (
              <ul className="mt-8 space-y-6">
                {details.map((d) => (
                  <li key={d.label} className="flex gap-4">
                    <d.icon aria-hidden className="mt-1 size-5 shrink-0 text-signal" />
                    <div>
                      <p className="eyebrow">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="mt-1 block text-lg transition-colors hover:text-signal" {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                          {d.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-lg">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-dust-dim">Phone, WhatsApp and address details are being confirmed. Use the form and we will call you back.</p>
            )}
            {settings.mapEmbedUrl ? (
              <iframe
                title="Map of our office and yard"
                src={settings.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-10 aspect-[4/3] w-full border-0 grayscale invert-[.9] hue-rotate-180"
              />
            ) : null}
          </aside>
        </Reveal>
      </section>
    </>
  );
}
