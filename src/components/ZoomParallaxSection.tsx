import { useEffect } from 'react';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const images = [
  { src: '/image/roberto-pascoal-hero-montanha.png', alt: 'Roberto em palestra' },
  { src: '/image/roberto-pascoal-explorador.jpg', alt: 'Explorador' },
  { src: '/image/01 - África 07 por Max Schwoelk.JPG', alt: 'África' },
  { src: '/image/roberto-pascoal-caminhada-brasil.png', alt: 'Caminhada Brasil' },
  { src: '/image/roberto-pascoal-indigena-interacao.png', alt: 'Interação indígena' },
  { src: '/image/200229_OMG_4225.jpg', alt: 'Ação social Omunga' },
  { src: '/image/roberto-pascoal-professor-africa.jpg', alt: 'Professor na África' },
];

const ZoomParallaxSection = () => {
  return (
    <section className="relative bg-background">
      <ZoomParallax images={images} />
    </section>
  );
};

export default ZoomParallaxSection;
