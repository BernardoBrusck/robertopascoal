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
        text="Nascido no interior do Brasil, Roberto Pascoal transformou a inquietude em propósito. Do teatro à comunicação, do Caminho de Santiago às comunidades mais isoladas da Amazônia, cada passo foi guiado por uma certeza: a educação transforma vidas. Fundador da OMUNGA, empreendedor social, palestrante e escritor, ele dedica cada dia a provar que nunca estamos prontos — mas sempre somos suficientes."
      />
    </div>
  );
};

export default Index;
