import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedChefs } from "@/components/home/FeaturedChefs";
import { PopularMeals } from "@/components/home/PopularMeals";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { JoinCTA } from "@/components/home/JoinCTA";
import { DownloadApp } from "@/components/home/DownloadApp";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedChefs />
      <PopularMeals />
      <HowItWorks />
      <FeaturesSection />
      <TestimonialsSection />
      <JoinCTA />
      <DownloadApp />
    </Layout>
  );
};

export default Index;
