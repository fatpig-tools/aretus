import Link from "next/link";
import { MessageCircle, Phone, Send } from "lucide-react";
import type { SiteSettings } from "@/content/types";
import { phoneDigits } from "@/lib/site";

/** Sticky bottom bar on small screens: Call · WhatsApp · Get a Quote. */
export function MobileBar({ settings }: { settings: SiteSettings }) {
  const phone = phoneDigits(settings.phone);
  const wa = phoneDigits(settings.whatsapp ?? settings.phone)?.replace("+", "");
  const item = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 font-display text-xs font-bold uppercase tracking-wider";

  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-charcoal/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      {phone ? (
        <a href={`tel:${phone}`} className={item}>
          <Phone aria-hidden className="size-5" /> Call
        </a>
      ) : null}
      {wa ? (
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className={item}>
          <MessageCircle aria-hidden className="size-5" /> WhatsApp
        </a>
      ) : null}
      <Link href="/contact" className={`${item} bg-signal text-charcoal`}>
        <Send aria-hidden className="size-5" /> Get a Quote
      </Link>
    </nav>
  );
}
