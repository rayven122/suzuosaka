import { Suspense } from "react";
import { InstaRing } from "./_components/common/InstaRing";
import News from "./_components/News/News";
import Fishing from "./_components/Fishing";
import Eatery from "./_components/Eatery";
import Access from "./_components/Access";
import CTA from "./_components/CTA";
import { Hero } from "./_components/Hero";
import { BrandStory } from "./_components/BrandStory";
import { NewsContainer } from "./_components/News/NewsContainer";

export default function Home() {
  return (
    <main>
      <InstaRing />
      <Hero />
      <BrandStory />
      {/* <News /> */}
      <NewsContainer />
      {/* <Fishing />
      <Eatery />
      <Access /> */}
      <CTA />
    </main>
  );
}
