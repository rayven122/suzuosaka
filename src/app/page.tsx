import { InstaRing } from "./_components/common/InstaRing";
import CTA from "./_components/CTA";
import { Hero } from "./_components/Hero";
import { BrandStory } from "./_components/BrandStory";
import { NewsContainer } from "./_components/News/NewsContainer";
import { Fishing } from "./_components/Fishing";
import { Eatery } from "./_components/Eatery";

export default function Home() {
  return (
    <main>
      <InstaRing />
      <Hero />
      <BrandStory />
      <NewsContainer />
      <Fishing />
      <Eatery />
      {/* <Access /> */}
      <CTA />
    </main>
  );
}
