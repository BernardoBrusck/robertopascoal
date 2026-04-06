import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  // Column 0
  { col: 0, src: '/image/roberto-pascoal-hero-montanha.webp', alt: 'Roberto Pascoal na montanha' },
  { col: 0, src: '/image/WhatsApp Image 2026-04-01 at 15.47.11 (1).jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 0, src: '/image/WhatsApp Image 2026-04-01 at 15.47.14 (2).jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 0, src: '/image/WhatsApp Image 2026-04-01 at 15.47.15 (1).jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 0, src: '/image/WhatsApp Image 2026-04-01 at 15.47.16 (2).jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 0, src: '/image/WhatsApp Image 2026-04-01 at 15.47.18 (1).jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 0, src: '/image/WhatsApp Image 2026-04-01 at 15.47.22 (2).jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 0, src: '/image/roberto-pascoal-comunidade-isolada.webp', alt: 'Comunidade isolada' },

  // Column 1
  { col: 1, src: '/image/roberto-pascoal-explorador.webp', alt: 'Roberto explorador' },
  { col: 1, src: '/image/WhatsApp Image 2026-04-01 at 15.47.11.jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 1, src: '/image/WhatsApp Image 2026-04-01 at 15.47.14.jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 1, src: '/image/WhatsApp Image 2026-04-01 at 15.47.15.jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 1, src: '/image/WhatsApp Image 2026-04-01 at 15.47.16.jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 1, src: '/image/WhatsApp Image 2026-04-01 at 15.47.18.jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 1, src: '/image/omg-4225.webp', alt: 'Ação social Omunga' },
  { col: 1, src: '/image/roberto-pascoal-projetos-africa.webp', alt: 'Projetos na África' },
  { col: 1, src: '/image/WhatsApp Image 2026-04-01 at 15.47.22 (3).jpeg', alt: 'Roberto Pascoal em Viagem' },

  // Column 2
  { col: 2, src: '/image/palestra-roberto.webp', alt: 'Roberto palestrando' },
  { col: 2, src: '/image/WhatsApp Image 2026-04-01 at 15.47.14 (1).jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 2, src: '/image/WhatsApp Image 2026-04-01 at 15.47.16 (1).jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 2, src: '/image/WhatsApp Image 2026-04-01 at 15.47.17.jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 2, src: '/image/WhatsApp Image 2026-04-01 at 15.47.22.jpeg', alt: 'Roberto Pascoal em Viagem' },
  { col: 2, src: '/image/roberto-pascoal-professor-africa.webp', alt: 'Roberto como professor na África' },
  { col: 2, src: '/image/foto-roberto-08.webp', alt: 'Roberto Pascoal' },
  { col: 2, src: '/image/africa-max-schwoelk.webp', alt: 'África' },
];

// Flat list for lightbox navigation
const allImages = galleryImages;

export function ImageGallery() {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const columns = [0, 1, 2].map((col) =>
    galleryImages.filter((img) => img.col === col)
  );

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const openLightbox = (src: string) => {
    const idx = allImages.findIndex((img) => img.src === src);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  return (
    <section className="w-full bg-background py-20">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="relative">
          <div
            className={cn(
              'overflow-hidden transition-[max-height] duration-700 ease-in-out',
              expanded ? 'max-h-[8000px]' : 'max-h-[600px]'
            )}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {columns.map((colImages, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-4">
                  {colImages.map((img, index) => (
                    <GalleryImage
                      key={`${colIdx}-${index}`}
                      alt={img.alt}
                      src={img.src}
                      onClick={() => openLightbox(img.src)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {!expanded && (
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0"
              style={{
                height: '70%',
                background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 20%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.3) 75%, transparent 100%)',
              }}
            />
          )}

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

      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   LIGHTBOX — Fullscreen image viewer
   ═══════════════════════════════════════════════════════ */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: typeof allImages;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (idx: number) => void;
}) {
  const prev = () => onNavigate((currentIndex - 1 + images.length) % images.length);
  const next = () => onNavigate((currentIndex + 1) % images.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [currentIndex]);

  const current = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/70 hover:text-white transition-colors"
        aria-label="Fechar"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Previous */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/70 hover:text-white transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      {/* Image */}
      <img
        key={current.src}
        src={current.src}
        alt={current.alt}
        className="max-h-[90vh] max-w-[90vw] object-contain select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/70 hover:text-white transition-colors"
        aria-label="Próxima"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      {/* Counter */}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
        {currentIndex + 1} / {images.length}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAGNETIC BUTTON
   ═══════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════
   GALLERY IMAGE — Natural size, no forced aspect ratio
   ═══════════════════════════════════════════════════════ */
function GalleryImage({ alt, src, onClick }: { alt: string; src: string; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div ref={ref} className="overflow-hidden rounded-sm cursor-pointer" onClick={onClick}>
      {hasError ? (
        <div className="flex h-48 w-full items-center justify-center bg-muted">
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
            'w-full h-auto transition-all duration-700',
            isInView && !isLoading ? 'scale-100 opacity-100 blur-0' : 'scale-110 opacity-0 blur-md'
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
