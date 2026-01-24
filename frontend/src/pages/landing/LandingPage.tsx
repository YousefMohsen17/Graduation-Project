import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CourseCategoriesSection from "./components/CourseCategoriesSection";
import CTASection from "./components/CTASection";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
export default function LandingPage() {
  const { data: user } = useAuth();
  console.log(user);
  const location = useLocation()
  const hasShownToast = useRef(false);
  useEffect(() => {
    if (location.state?.showSuccessToast && !hasShownToast.current) {
      toast.success("Login successfully");
      hasShownToast.current = true;

      // clear state so it doesn't show again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CourseCategoriesSection />
      <CTASection />
    </>
  );
}
