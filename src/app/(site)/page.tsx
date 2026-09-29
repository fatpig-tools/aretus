import type { Metadata } from "next";
import { getClientsPage, getHomePage } from "@/content";
import { HomeHero } from "@/components/sections/HomeHero";
import { NumbersStrip } from "@/components/sections/NumbersStrip";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { WhyAretus } from "@/components/sections/WhyAretus";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ImageBand } from "@/components/sections/ImageBand";
import { photos } from "@/content/photos";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomePage({ stega: false });
  return { title: seo.title, description: seo.description, alternates: { canonical: "/" } };
}

export default async function HomePage() {
  const [home, { clients }] = await Promise.all([getHomePage(), getClientsPage()]);
  return (
    <>
      <HomeHero hero={home.hero} services={home.whatWeDo} />
      <NumbersStrip numbers={home.numbers} />
      <WhatWeDo items={home.whatWeDo} />
      <ImageBand
        photo={photos["excavator-loading"]}
        eyebrow="Earthwork & loading"
        statement="Our excavator and tippers work side by side, as one complete earthwork team."
      />
      <WhyAretus items={home.whyAretus} />
      <TrustStrip line={home.trustLine} clients={clients} />
      <CtaBanner body={home.closing.body} cta={home.closing.cta} />
    </>
  );
}
