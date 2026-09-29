import Link from "next/link";
import type { SiteSettings } from "@/content/types";
import { Logo } from "@/components/ui/Logo";
import { RoadLine } from "@/components/motion/RoadLine";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Transport & Haulage", href: "/services#haulage" },
      { label: "Earthwork & Excavation", href: "/services#earthwork" },
      { label: "Heavy Equipment Transport", href: "/services#heavy-transport" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Clients", href: "/clients" },
      { label: "FAQs", href: "/faq" },
    ],
  },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const contact = [
    settings.address,
    settings.phone && { label: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}` },
    settings.email && { label: settings.email, href: `mailto:${settings.email}` },
    settings.hours,
  ].filter(Boolean);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-charcoal pb-28 pt-20 lg:pb-10">
      <div className="shell">
        <p className="display max-w-5xl text-h1">
          Moving earth. Moving material. <span className="text-signal">Moving projects forward.</span>
        </p>
        <RoadLine className="mt-12 w-full" />

        <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-dust-dim">{settings.footerBlurb}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="eyebrow">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-dust/85 transition-colors hover:text-signal">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-5 space-y-3 text-dust/85">
              {contact.length === 0 && (
                <li>
                  <Link href="/contact" className="transition-colors hover:text-signal">
                    Send us an enquiry
                  </Link>
                </li>
              )}
              {contact.map((c) =>
                typeof c === "string" ? (
                  <li key={c}>{c}</li>
                ) : c ? (
                  <li key={c.href}>
                    <a href={c.href} className="transition-colors hover:text-signal">
                      {c.label}
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-sm text-dust-dim sm:flex-row sm:justify-between">
          <p>{settings.copyright}</p>
          <Link href="/credits" className="transition-colors hover:text-signal">
            Credits
          </Link>
        </div>
      </div>
    </footer>
  );
}
