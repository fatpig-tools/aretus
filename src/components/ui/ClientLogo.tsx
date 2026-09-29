import Image from "next/image";
import type { Client } from "@/content/types";

/**
 * Light tile holding a client's logo: greyscale at rest, full colour on hover (parent needs `group`).
 * Clients without a logo file get a typeset wordmark in the same tile.
 */
export function ClientLogo({ client, size = "md" }: { client: Client; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-20 w-44 px-6" : "h-28 w-full px-8";
  return (
    <span className={`relative flex items-center justify-center bg-dust ${box}`}>
      {client.logo ? (
        <span className="relative block h-full w-full">
          <Image
            src={client.logo}
            alt={client.fullName ?? client.name}
            fill
            sizes="220px"
            className="object-contain py-5 opacity-80 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </span>
      ) : (
        <span className="display text-center text-lg leading-tight text-charcoal/70 transition-colors duration-500 group-hover:text-charcoal">
          {client.name}
        </span>
      )}
    </span>
  );
}
