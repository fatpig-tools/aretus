import type { Metadata } from "next";
import { getClientsPage, getHomePage } from "@/content";
import { PageHero } from "@/components/ui/PageHero";
import { ClientWall } from "@/components/sections/ClientWall";
import { CtaBanner } from "@/components/sections/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getClientsPage({ stega: false });
  return { title: seo.title, description: seo.description, alternates: { canonical: "/clients" } };
}

export default async function ClientsPage() {
  const [page, home] = await Promise.all([getClientsPage(), getHomePage()]);
  return (
    <>
      <PageHero eyebrow="Clients" headline={page.headline} highlight={["trusted"]} />
      <section className="shell pb-24 md:pb-36">
        <ClientWall clients={page.clients} />
      </section>
      <CtaBanner body={home.closing.body} cta={home.closing.cta} />
    </>
  );
}
