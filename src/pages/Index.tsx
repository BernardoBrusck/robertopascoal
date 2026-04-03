import HeroSection from "@/components/HeroSection";
import TextRevealSection from "@/components/TextRevealSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ZoomParallaxSection from "@/components/ZoomParallaxSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TextRevealSection />
      <HorizontalScrollSection />
      <ZoomParallaxSection />
    </div>
  );
};

export default Index;
