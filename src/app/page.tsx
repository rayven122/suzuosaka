import { InstaRing } from "./_components/common/InstaRing";
import { Hero } from "./_components/Hero";
import { BrandStory } from "./_components/Hero/BrandStory";
import { NewsContainer } from "./_components/Hero/News/NewsContainer";
import { Fishing } from "./_components/Hero/Fishing";
import { Eatery } from "./_components/Hero/Eatery";
import { Access } from "./_components/Hero/Access";
import { CTA } from "./_components/Hero/CTA";
import { BlogSection } from "./_components/Hero/BlogSection";

export default function Home() {
  return (
    <main className="bg-gradient-main">
      <h1 className="sr-only">川の家おさか~RIVER HOUSE OSAKA~</h1>
      <InstaRing />
      <div id="hero">
        <Hero />
      </div>
      <div id="brand-story">
        <BrandStory />
      </div>
      <div id="fishing">
        <Fishing />
      </div>
      <div id="eatery">
        <Eatery />
      </div>
      <div id="blog">
        <BlogSection />
      </div>
      <div id="news">
        <NewsContainer />
      </div>
      <div id="access">
        <Access />
      </div>
      <CTA />
    </main>
  );
}
