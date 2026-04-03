import HeroSection from "@/components/HeroSection";
import TextRevealSection from "@/components/TextRevealSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ZoomParallaxSection from "@/components/ZoomParallaxSection";
import FloatingPhotosSection from "@/components/FloatingPhotosSection";
import ServicesSection from "@/components/ServicesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TextRevealSection />
      <HorizontalScrollSection />
      <ZoomParallaxSection />
      <FloatingPhotosSection
        text="Minha missão é simples: provar que a educação transforma qualquer realidade e que nunca é tarde para começar."
      />
      <ServicesSection />
    </div>
  );
};

export default Index;
