import { lazy, Suspense } from 'react';
import { Navbar } from "@/components/ui/navbar";
import HeroSection from "@/components/HeroSection";
import TextRevealSection from "@/components/TextRevealSection";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load all below-fold sections
const HorizontalScrollSection = lazy(() => import("@/components/HorizontalScrollSection"));
const ZoomParallaxSection = lazy(() => import("@/components/ZoomParallaxSection"));
const TextRevealBlock = lazy(() => import("@/components/TextRevealBlock"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ImageGallery = lazy(() => import("@/components/ui/image-gallery").then(m => ({ default: m.ImageGallery })));
const BookSection = lazy(() => import("@/components/BookSection"));
const SpeakingSection = lazy(() => import("@/components/SpeakingSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactFooter = lazy(() => import("@/components/ContactFooter"));

const SectionFallback = () => <div className="min-h-[50vh]" />;

const Index = () => {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TextRevealSection />
      <Suspense fallback={<SectionFallback />}>
        <HorizontalScrollSection />
      </Suspense>
      
      {!isMobile && (
        <>
          <Suspense fallback={<SectionFallback />}>
            <ZoomParallaxSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <TextRevealBlock
              text="Minha missão é simples: provar que a educação transforma qualquer realidade e que nunca é tarde para começar."
            />
          </Suspense>
          <div id="servicos">
            <Suspense fallback={<SectionFallback />}>
              <ServicesSection />
            </Suspense>
          </div>
        </>
      )}

      <Suspense fallback={<SectionFallback />}>
        <ImageGallery />
      </Suspense>
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
        <Suspense fallback={<SectionFallback />}>
          <ContactFooter />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
