import type { Metadata } from "next";
import { getFaqPage, getHomePage } from "@/content";
import { PageHero } from "@/components/ui/PageHero";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getFaqPage();
  return { title: seo.title, description: seo.description, alternates: { canonical: "/faq" } };
}

export default async function FaqPage() {
  const [page, home] = await Promise.all([getFaqPage(), getHomePage()]);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <PageHero eyebrow="FAQs" headline={page.headline} />
      <section className="shell max-w-5xl pb-24 md:pb-36">
        <FaqList faqs={page.faqs} />
      </section>
      <CtaBanner body={home.closing.body} cta={home.closing.cta} />
    </>
  );
}
