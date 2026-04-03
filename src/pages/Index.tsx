import HeroSection from "@/components/HeroSection";
import TextRevealSection from "@/components/TextRevealSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ZoomParallaxSection from "@/components/ZoomParallaxSection";
import TextRevealBlock from "@/components/TextRevealBlock";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TextRevealSection />
      <HorizontalScrollSection />
      <ZoomParallaxSection />
      <TextRevealBlock
        text="Minha missão é simples: provar que a educação transforma qualquer realidade — e que nunca é tarde para começar."
      />
    </div>
  );
};

export default Index;
