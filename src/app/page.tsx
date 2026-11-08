import Hero from "@/components/Hero";
import WinterCollection from "@/components/WinterCollection";
import EditorialStory from "@/components/EditorialStory";
import LookbookBanner from "@/components/LookbookBanner";
import FeaturedCollectionsBento from "@/components/FeaturedCollectionsBento";
import AudiencePortals from "@/components/AudiencePortals";

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full max-w-full">
      {/* 1. Attention: Hero Section */}
      <Hero />

      {/* 2. Winter Collections 4-Column Product Grid */}
      <WinterCollection />

      {/* 3. Editorial Story & Atelier Sales Metric */}
      <EditorialStory />

      {/* 4. Desire: Lookbook Runway Video Banner */}
      <LookbookBanner />

      {/* 5. Interest: Featured Collections Gapless Bento Grid */}
      <FeaturedCollectionsBento />

      {/* 6. Audience Portals: Men, Women, Kids */}
      <AudiencePortals />
    </main>
  );
}
