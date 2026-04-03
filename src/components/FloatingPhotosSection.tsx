import { useEffect, useRef } from 'react';
import TextRevealBlock from '@/components/TextRevealBlock';

declare const gsap: any;

interface FloatingPhoto {
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  speed: number;
}

const leftPhotos: FloatingPhoto[] = [
  { top: '8%', left: '3%', rotate: -4, speed: -40 },
  { top: '38%', left: '7%', rotate: 5, speed: -70 },
  { top: '68%', left: '2%', rotate: -6, speed: -30 },
];

const rightPhotos: FloatingPhoto[] = [
  { top: '12%', right: '4%', rotate: 5, speed: -55 },
  { top: '45%', right: '2%', rotate: -3, speed: -80 },
  { top: '75%', right: '6%', rotate: 4, speed: -25 },
];

const PhotoCard = ({
  photo,
  index,
  side,
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
        <div
          className="w-full flex items-center justify-center"
          style={{ height: 120, backgroundColor: '#f0eeeb' }}
        >
          <div className="flex flex-col items-center gap-1 text-muted-foreground/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        </div>
        <div className="h-[50px] flex items-center justify-center">
          <span className="text-[9px] text-muted-foreground/40 font-light tracking-wide">
            foto {side === 'left' ? index + 1 : index + 4}
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
      {/* Left photos */}
      {leftPhotos.map((photo, i) => (
        <PhotoCard key={`left-${i}`} photo={photo} index={i} side="left" />
      ))}

      {/* Right photos */}
      {rightPhotos.map((photo, i) => (
        <PhotoCard key={`right-${i}`} photo={photo} index={i} side="right" />
      ))}

      {/* Center content */}
      <TextRevealBlock text={text} />
    </section>
  );
};

export default FloatingPhotosSection;
