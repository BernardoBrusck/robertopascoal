import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export function ImageGallery() {
  return (
    <section className="w-full bg-background py-20">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {Array.from({ length: 3 }).map((_, col) => (
            <div key={col} className="break-inside-avoid space-y-4 mb-4">
              {Array.from({ length: 10 }).map((_, index) => {
                const isPortrait = (col + index) % 2 === 0;
                const width = isPortrait ? 1080 : 1920;
                const height = isPortrait ? 1920 : 1080;
                const ratio = isPortrait ? 9 / 16 : 16 / 9;

                return (
                  <AnimatedImage
                    key={`${col}-${index}`}
                    alt={`Gallery image ${col * 10 + index + 1}`}
                    src={`https://images.unsplash.com/photo-${1500000000000 + col * 100 + index}?w=${width}&h=${height}&fit=crop&auto=format&q=75`}
                    placeholder={`https://images.unsplash.com/photo-${1500000000000 + col * 100 + index}?w=20&h=20&fit=crop&auto=format&q=10`}
                    ratio={ratio}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface AnimatedImageProps {
  alt: string;
  src: string;
  className?: string;
  placeholder?: string;
  ratio: number;
}

function AnimatedImage({ alt, src, ratio, placeholder }: AnimatedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (placeholder) {
      setImgSrc(placeholder);
    }
  };

  return (
    <div ref={ref} className="mb-4 overflow-hidden rounded-sm">
      <AspectRatio ratio={ratio}>
        <img
          src={isInView ? imgSrc : undefined}
          alt={alt}
          className={cn(
            'h-full w-full object-cover transition-all duration-700',
            isInView ? 'scale-100 opacity-100 blur-0' : 'scale-110 opacity-0 blur-md',
            isLoading && 'scale-110 opacity-0 blur-md'
          )}
          onLoad={() => setIsLoading(false)}
          loading="lazy"
          onError={handleError}
        />
      </AspectRatio>
    </div>
  );
}
