import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const galleryImages = [
  { col: 0, ratio: 9 / 16, id: 'photo-1488521787991-ed7bbaae773c' },
  { col: 0, ratio: 16 / 9, id: 'photo-1497375638960-ca368c7231e4' },
  { col: 0, ratio: 9 / 16, id: 'photo-1509099836639-18ba1795216d' },
  { col: 0, ratio: 16 / 9, id: 'photo-1524069290683-0457abfe42c3' },
  { col: 0, ratio: 9 / 16, id: 'photo-1503676260728-1c00da094a0b' },
  { col: 1, ratio: 16 / 9, id: 'photo-1544717305-2782549b5136' },
  { col: 1, ratio: 9 / 16, id: 'photo-1491841550275-ad7854e35ca6' },
  { col: 1, ratio: 16 / 9, id: 'photo-1523050854058-8df90110c9f1' },
  { col: 1, ratio: 9 / 16, id: 'photo-1516627145497-ae6968895b74' },
  { col: 1, ratio: 16 / 9, id: 'photo-1532629345422-7515f3d16bb6' },
  { col: 2, ratio: 9 / 16, id: 'photo-1509062522246-3755977927d7' },
  { col: 2, ratio: 16 / 9, id: 'photo-1427504494785-3a9ca7044f45' },
  { col: 2, ratio: 9 / 16, id: 'photo-1522202176988-66273c2fd55f' },
  { col: 2, ratio: 16 / 9, id: 'photo-1577896851231-70ef18881571' },
  { col: 2, ratio: 9 / 16, id: 'photo-1471286174890-9c112ffca5b4' },
];

export function ImageGallery() {
  const [expanded, setExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const columns = [0, 1, 2].map((col) =>
    galleryImages.filter((img) => img.col === col)
  );

  const handleToggle = () => {
    setIsAnimating(true);
    setExpanded(!expanded);
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    <section className="w-full bg-background py-20">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="relative">
          <div
            className={cn(
              'overflow-hidden transition-[max-height] duration-700 ease-in-out',
              expanded ? 'max-h-[5000px]' : 'max-h-[600px]'
            )}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {columns.map((colImages, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-4">
                  {colImages.map((img, index) => (
                    <AnimatedImage
                      key={`${colIdx}-${index}`}
                      alt={`Gallery image ${colIdx * 5 + index + 1}`}
                      src={`https://images.unsplash.com/${img.id}?w=800&auto=format&q=75&fit=crop`}
                      ratio={img.ratio}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Strong gradient overlay when collapsed */}
          {!expanded && (
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0"
              style={{
                height: '70%',
                background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 20%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.3) 75%, transparent 100%)',
              }}
            />
          )}

          {/* Circular interactive button */}
          {!expanded && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <MagneticButton onClick={handleToggle} label="Veja mais" />
            </div>
          )}
        </div>

        {expanded && (
          <div className="mt-8 flex justify-center">
            <MagneticButton onClick={handleToggle} label="Ver menos" />
          </div>
        )}
      </div>
    </section>
  );
}

function MagneticButton({ onClick, label }: { onClick: () => void; label: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    setOffset({ x: dx, y: dy });
  }, []);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      onClick();
    }, 300);
  };

  return (
    <button
      ref={btnRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-foreground text-background text-xs font-medium tracking-wider uppercase"
      style={{
        transform: isPressed
          ? `translate(${offset.x}px, ${offset.y}px) scale(3)`
          : isHovered
            ? `translate(${offset.x}px, ${offset.y}px) scale(1.1)`
            : 'translate(0, 0) scale(1)',
        opacity: isPressed ? 0 : 1,
        transition: isPressed
          ? 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease'
          : 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease',
        fontFamily: 'system-ui',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

interface AnimatedImageProps {
  alt: string;
  src: string;
  ratio: number;
}

function AnimatedImage({ alt, src, ratio }: AnimatedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div ref={ref} className="overflow-hidden rounded-sm">
      <AspectRatio ratio={ratio}>
        {hasError ? (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/30">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        ) : (
          <img
            src={isInView ? src : undefined}
            alt={alt}
            className={cn(
              'h-full w-full object-cover transition-all duration-700',
              isInView && !isLoading ? 'scale-100 opacity-100 blur-0' : 'scale-110 opacity-0 blur-md'
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => setHasError(true)}
            loading="lazy"
          />
        )}
      </AspectRatio>
    </div>
  );
}
