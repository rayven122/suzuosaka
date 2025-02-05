import { InstaRing } from "./_components/common/InstaRing";
import { Hero } from "./_components/Hero";
import { BrandStory } from "./_components/Hero/BrandStory";
import { NewsContainer } from "./_components/Hero/News/NewsContainer";
import { Fishing } from "./_components/Hero/Fishing";
import { Eatery } from "./_components/Hero/Eatery";
import { Access } from "./_components/Hero/Access";
import { CTA } from "./_components/Hero/CTA";

export default function Home() {
  return (
    <main className="bg-gradient-main">
      <InstaRing />
      <Hero />
      <BrandStory />
      <NewsContainer />
      <Fishing />
      <Eatery />
      <Access />
      <CTA />
    </main>
  );
}
