import { useEffect } from 'react';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const images = [
  { src: '/image/roberto-pascoal-hero-montanha.webp', alt: 'Roberto em palestra' },
  { src: '/image/roberto-pascoal-explorador.webp', alt: 'Explorador' },
  { src: '/image/01 - África 07 por Max Schwoelk.webp', alt: 'África' },
  { src: '/image/roberto-pascoal-caminhada-brasil.webp', alt: 'Caminhada Brasil' },
  { src: '/image/roberto-pascoal-indigena-interacao.webp', alt: 'Interação indígena' },
  { src: '/image/200229_OMG_4225.webp', alt: 'Ação social Omunga' },
  { src: '/image/roberto-pascoal-professor-africa.webp', alt: 'Professor na África' },
];

const ZoomParallaxSection = () => {
  return (
    <section className="relative bg-background">
      <ZoomParallax images={images} />
    </section>
  );
};

export default ZoomParallaxSection;
