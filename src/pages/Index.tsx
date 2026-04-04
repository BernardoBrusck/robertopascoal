import { lazy, Suspense } from 'react';
import { Navbar } from "@/components/ui/navbar";
import HeroSection from "@/components/HeroSection";
import TextRevealSection from "@/components/TextRevealSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import ZoomParallaxSection from "@/components/ZoomParallaxSection";
import TextRevealBlock from "@/components/TextRevealBlock";
import { ImageGallery } from "@/components/ui/image-gallery";
import ContactFooter from "@/components/ContactFooter";

// Lazy load below-fold heavy sections
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const BookSection = lazy(() => import("@/components/BookSection"));
const SpeakingSection = lazy(() => import("@/components/SpeakingSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));

const SectionFallback = () => <div className="min-h-[50vh]" />;

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
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
      </div>
      <ImageGallery />
      <div id="livro">
        <Suspense fallback={<SectionFallback />}>
          <BookSection />
        </Suspense>
      </div>
      <div id="palestras">
        <Suspense fallback={<SectionFallback />}>
          <SpeakingSection />
        </Suspense>
      </div>
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      <div id="contato">
        <ContactFooter />
      </div>
    </div>
  );
};

export default Index;
