"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Client } from "@/content/types";

export function ClientWall({ clients }: { clients: Client[] }) {
  const sectors = ["All", ...Array.from(new Set(clients.map((c) => c.sector)))];
  const [sector, setSector] = useState("All");
  const shown = sector === "All" ? clients : clients.filter((c) => c.sector === sector);

  return (
    <div>
      <div role="group" aria-label="Filter by sector" className="flex flex-wrap gap-2">
        {sectors.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={sector === s}
            onClick={() => setSector(s)}
            className="min-h-11 cursor-pointer border border-line px-4 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors hover:border-signal aria-pressed:border-signal aria-pressed:bg-signal aria-pressed:text-charcoal"
          >
            {s}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} clients
      </p>
      <motion.ul layout className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((c) => (
            <motion.li
              key={c._key}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="group flex min-h-56 flex-col justify-between bg-charcoal p-8 transition-colors hover:bg-asphalt"
            >
              <p className="eyebrow">{c.sector}</p>
              <div>
                <h2 className="display text-h3 transition-colors group-hover:text-signal">{c.name}</h2>
                {c.line ? <p className="mt-3 text-dust-dim">{c.line}</p> : null}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
