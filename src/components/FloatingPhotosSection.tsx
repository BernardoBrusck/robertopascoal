import { useEffect, useRef } from 'react';
import TextRevealBlock from '@/components/TextRevealBlock';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FloatingPhoto {
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  speed: number;
  src: string;
  alt: string;
}

const leftPhotos: FloatingPhoto[] = [
  { top: '8%', left: '3%', rotate: -4, speed: -40, src: '/image/roberto-pascoal-retrato.webp', alt: 'Roberto Pascoal' },
  { top: '38%', left: '7%', rotate: 5, speed: -70, src: '/image/roberto-pascoal-retrato-1.webp', alt: 'Roberto Pascoal' },
  { top: '68%', left: '2%', rotate: -6, speed: -30, src: '/image/roberto-pascoal-retrato-2.webp', alt: 'Roberto Pascoal' },
];

const rightPhotos: FloatingPhoto[] = [
  { top: '12%', right: '4%', rotate: 5, speed: -55, src: '/image/roberto-pascoal-caminhada-brasil.webp', alt: 'Caminhada Brasil' },
  { top: '45%', right: '2%', rotate: -3, speed: -80, src: '/image/roberto-pascoal-indigena-interacao.webp', alt: 'Interação indígena' },
  { top: '75%', right: '6%', rotate: 4, speed: -25, src: '/image/foto-roberto-08.webp', alt: 'Roberto no palco' },
];

const PhotoCard = ({ photo }: { photo: FloatingPhoto; index: number; side: 'left' | 'right' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const anim = gsap.to(ref.current, {
      y: photo.speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current.closest('section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
    return () => { anim.kill(); };
  }, [photo.speed]);

  const style: React.CSSProperties = {
    position: 'absolute',
    top: photo.top,
    ...(photo.left ? { left: photo.left } : {}),
    ...(photo.right ? { right: photo.right } : {}),
    transform: `rotate(${photo.rotate}deg)`,
    zIndex: 1,
  };

  return (
    <div ref={ref} className="hidden lg:block pointer-events-none" style={style}>
      <div className="bg-background border-[6px] border-background rounded-sm overflow-hidden" style={{ width: 140, height: 170, boxShadow: '0 4px 20px -4px rgba(0,0,0,0.12), 0 2px 8px -2px rgba(0,0,0,0.08)' }}>
        <img src={photo.src} alt={photo.alt} className="w-full object-cover" style={{ height: 120 }} loading="lazy" width={140} height={120} />
        <div className="h-[50px] flex items-center justify-center">
          <span className="text-[9px] text-muted-foreground/60 font-light tracking-wide">{photo.alt}</span>
        </div>
      </div>
    </div>
  );
};

interface FloatingPhotosSectionProps {
  text: string;
}

const FloatingPhotosSection = ({ text }: FloatingPhotosSectionProps) => {
  return (
    <section className="relative w-full overflow-hidden">
      {leftPhotos.map((photo, i) => (
        <PhotoCard key={`left-${i}`} photo={photo} index={i} side="left" />
      ))}
      {rightPhotos.map((photo, i) => (
        <PhotoCard key={`right-${i}`} photo={photo} index={i} side="right" />
      ))}
      <TextRevealBlock text={text} />
    </section>
  );
};

export default FloatingPhotosSection;
