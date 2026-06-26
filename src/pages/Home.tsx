import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import SearchSection from "@/sections/SearchSection";
import CategoriesSection from "@/sections/CategoriesSection";
import FeaturedFactories from "@/sections/FeaturedFactories";
import FeaturedProducts from "@/sections/FeaturedProducts";
import StatsSection from "@/sections/StatsSection";
import MapPreview from "@/sections/MapPreview";
import ContactCTA from "@/sections/ContactCTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <SearchSection />
        <CategoriesSection />
        <FeaturedFactories />
        <FeaturedProducts />
        <StatsSection />
        <MapPreview />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
