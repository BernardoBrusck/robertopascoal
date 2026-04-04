import { useEffect, useRef } from 'react';
import TextRevealBlock from '@/components/TextRevealBlock';

declare const gsap: any;

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
  { top: '8%', left: '3%', rotate: -4, speed: -40, src: '/image/Foto de Roberto Pascoal.jpg', alt: 'Roberto Pascoal' },
  { top: '38%', left: '7%', rotate: 5, speed: -70, src: '/image/Foto de Roberto Pascoal (1).jpg', alt: 'Roberto Pascoal' },
  { top: '68%', left: '2%', rotate: -6, speed: -30, src: '/image/Foto de Roberto Pascoal (2).jpg', alt: 'Roberto Pascoal' },
];

const rightPhotos: FloatingPhoto[] = [
  { top: '12%', right: '4%', rotate: 5, speed: -55, src: '/image/Foto de Roberto Pascoal (3).jpg', alt: 'Roberto Pascoal' },
  { top: '45%', right: '2%', rotate: -3, speed: -80, src: '/image/03- Post Documentário.jpg', alt: 'Documentário' },
  { top: '75%', right: '6%', rotate: 4, speed: -25, src: '/image/roberto-pascoal-professor-africa.jpg', alt: 'Professor na África' },
];

const PhotoCard = ({
  photo,
}: {
  photo: FloatingPhoto;
  index: number;
  side: 'left' | 'right';
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const waitForGsap = setInterval(() => {
      if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        clearInterval(waitForGsap);

        const loadScrollTrigger = (): Promise<void> =>
          new Promise((res, rej) => {
            if ((window as any).ScrollTrigger) {
              gsap.registerPlugin((window as any).ScrollTrigger);
              res();
              return;
            }
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            s.onload = () => {
              setTimeout(() => {
                gsap.registerPlugin((window as any).ScrollTrigger);
                res();
              }, 100);
            };
            s.onerror = () => rej();
            document.head.appendChild(s);
          });

        loadScrollTrigger().then(() => {
          if (!ref.current) return;
          gsap.to(ref.current, {
            y: photo.speed,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current.closest('section'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      }
    }, 100);

    const timeout = setTimeout(() => clearInterval(waitForGsap), 15000);
    return () => {
      clearInterval(waitForGsap);
      clearTimeout(timeout);
    };
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
    <div
      ref={ref}
      className="hidden lg:block pointer-events-none"
      style={style}
    >
      <div
        className="bg-background border-[6px] border-background rounded-sm overflow-hidden"
        style={{
          width: 140,
          height: 170,
          boxShadow: '0 4px 20px -4px rgba(0,0,0,0.12), 0 2px 8px -2px rgba(0,0,0,0.08)',
        }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full object-cover"
          style={{ height: 120 }}
          loading="lazy"
        />
        <div className="h-[50px] flex items-center justify-center">
          <span className="text-[9px] text-muted-foreground/60 font-light tracking-wide">
            {photo.alt}
          </span>
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
