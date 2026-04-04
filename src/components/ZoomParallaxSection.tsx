import { ZoomParallax } from '@/components/ui/zoom-parallax';

const images = [
  { src: '/image/roberto-pascoal-hero-montanha.webp', alt: 'Roberto em palestra', width: 1200, height: 800 },
  { src: '/image/roberto-pascoal-explorador.webp', alt: 'Explorador', width: 800, height: 1200 },
  { src: '/image/africa-max-schwoelk.webp', alt: 'África', width: 1200, height: 800 },
  { src: '/image/roberto-pascoal-caminhada-brasil.webp', alt: 'Caminhada Brasil', width: 1200, height: 800 },
  { src: '/image/roberto-pascoal-indigena-interacao.webp', alt: 'Interação indígena', width: 800, height: 600 },
  { src: '/image/omg-4225.webp', alt: 'Ação social Omunga', width: 800, height: 600 },
  { src: '/image/roberto-pascoal-professor-africa.webp', alt: 'Professor na África', width: 800, height: 600 },
];

const ZoomParallaxSection = () => {
  return (
    <section className="relative bg-background">
      <ZoomParallax images={images} />
    </section>
  );
};

export default ZoomParallaxSection;
