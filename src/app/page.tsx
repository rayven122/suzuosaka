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
      <div id="hero">
        <Hero />
      </div>
      <div id="brand-story">
        <BrandStory />
      </div>
      <div id="news">
        <NewsContainer />
      </div>
      <div id="fishing">
        <Fishing />
      </div>
      <div id="eatery">
        <Eatery />
      </div>
      <div id="access">
        <Access />
      </div>
      <CTA />
    </main>
  );
}
