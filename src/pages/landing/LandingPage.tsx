import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CourseCategoriesSection from "./components/CourseCategoriesSection";
import CTASection from "./components/CTASection";
export default function LandingPage() {
  return (
    <main className="bg-[#D6DAF5] pt-10 pb-10 lg:pt-[70px] lg:pb-[124px] relative overflow-hidden">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CourseCategoriesSection />
      <CTASection />
    </main>
  );
}
