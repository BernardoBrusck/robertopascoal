import { Navbar } from "@/components/ui/navbar";
import HeroSection from "@/components/HeroSection";
import TextRevealSection from "@/components/TextRevealSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ZoomParallaxSection from "@/components/ZoomParallaxSection";
import TextRevealBlock from "@/components/TextRevealBlock";
import ServicesSection from "@/components/ServicesSection";
import { ImageGallery } from "@/components/ui/image-gallery";
import BookSection from "@/components/BookSection";
import SpeakingSection from "@/components/SpeakingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactFooter from "@/components/ContactFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TextRevealSection />
      <div id="historia">
        <HorizontalScrollSection />
      </div>
      <ZoomParallaxSection />
      <TextRevealBlock
        text="Minha missão é simples: provar que a educação transforma qualquer realidade e que nunca é tarde para começar."
      />
      <div id="servicos">
        <ServicesSection />
      </div>
      <ImageGallery />
      <div id="livro">
        <BookSection />
      </div>
      <div id="palestras">
        <SpeakingSection />
      </div>
      <TestimonialsSection />
      <div id="contato">
        <ContactFooter />
      </div>
    </div>
  );
};

export default Index;
