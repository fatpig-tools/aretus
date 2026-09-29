import type { Metadata } from "next";
import { credits } from "@/content/credits";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Credits | Aretus Enterprises",
  description: "Attribution for 3D models, typefaces and libraries used on this website.",
  robots: { index: false },
};

export default function CreditsPage() {
  return (
    <>
      <PageHero eyebrow="Credits" headline="The people whose work helped build this site." />
      <section className="shell max-w-4xl pb-24 md:pb-36">
        {credits.filter((g) => g.items.length).map((group) => (
          <div key={group.title} className="border-t border-line py-10">
            <h2 className="eyebrow">{group.title}</h2>
            <ul className="mt-6 space-y-4">
              {group.items.map((c) => (
                <li key={c.name} className="text-lg">
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-signal">
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                  {c.author ? <span className="text-dust-dim"> by {c.author}</span> : null}
                  {c.license ? <span className="text-dust-dim">, {c.license}</span> : null}
                  {c.note ? <span className="block text-sm text-dust-dim">{c.note}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
