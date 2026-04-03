import { useEffect } from 'react';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=960&h=540&fit=crop&crop=entropy&auto=format&q=75',
    alt: 'Roberto em palestra',
  },
  {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=960&h=540&fit=crop&crop=entropy&auto=format&q=75',
    alt: 'Comunidade',
  },
  {
    src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=600&fit=crop&crop=entropy&auto=format&q=75',
    alt: 'OMUNGA em ação',
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=960&h=540&fit=crop&crop=entropy&auto=format&q=75',
    alt: 'Caminho de Santiago',
  },
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop&crop=entropy&auto=format&q=75',
    alt: 'Educação',
  },
  {
    src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=960&h=540&fit=crop&crop=entropy&auto=format&q=75',
    alt: 'Amazônia',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=960&h=540&fit=crop&crop=entropy&auto=format&q=75',
    alt: 'Natureza e impacto',
  },
];

const ZoomParallaxSection = () => {
  return (
    <section className="relative bg-background">
      <ZoomParallax images={images} />
    </section>
  );
};

export default ZoomParallaxSection;
