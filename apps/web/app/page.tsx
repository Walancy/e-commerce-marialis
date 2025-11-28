import { Header } from "../components/Header";
import { HeroCarousel } from "../components/HeroCarousel";
import { ProductList } from "../components/ProductList";
import { Testimonials } from "../components/Testimonials";
import { Recommendations } from "../components/Recommendations";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] pb-20">
      <Header />
      <div className="w-full">
        <HeroCarousel />
      </div>
      <ProductList />
      <Testimonials />
      <Recommendations />
    </main>
  );
}
