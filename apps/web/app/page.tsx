import { Header } from "../components/Header";
import { HeroCarousel } from "../components/HeroCarousel";
import { ProductList } from "../components/ProductList";
import { Testimonials } from "../components/Testimonials";
import { BrandsSection } from "../components/BrandsSection";
import { Recommendations } from "../components/Recommendations";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#1a1a1a] pb-0">
      <Header />
      <div className="w-full">
        <HeroCarousel />
      </div>
      <ProductList />
      <Testimonials />
      <Recommendations />
      <BrandsSection />
      <Footer />
    </main>
  );
}
