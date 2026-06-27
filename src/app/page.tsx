import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { BestSellers } from "@/components/home/BestSellers";
import { StatsCounter } from "@/components/home/StatsCounter";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { BrandStory } from "@/components/home/BrandStory";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { CustomCursor } from "@/components/home/CustomCursor";
import { getCategories } from "@/lib/data/categories";
import { getBestSellers } from "@/lib/data/products";

export default async function Home() {
  const [categories, bestSellers] = await Promise.all([getCategories(), getBestSellers()]);

  return (
    <div className="home-cursor">
      <CustomCursor />
      <Hero />
      <FeaturedCategories categories={categories} />
      <BestSellers products={bestSellers} />
      <StatsCounter />
      <WhyChooseUs />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
