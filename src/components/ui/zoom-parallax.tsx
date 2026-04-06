'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import LazyImage from '@/lib/LazyImage';
import { useIsMobile } from '@/hooks/use-mobile';

interface Image {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface ZoomParallaxProps {
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // On mobile: the container is 500vh tall. The first ~40% of scroll is
  // a "dead zone" where images sit at scale 1, giving the previous section
  // time to fully exit the viewport. Zoom only starts after that.
  // On desktop: zoom spans the full scroll as before.
  const MOBILE_DEAD = 0.35; // fraction of scroll before zoom begins

  const scale4 = useTransform(
    scrollYProgress,
    isMobile ? [MOBILE_DEAD, 1] : [0, 1],
    [1, 4]
  );
  const scale5 = useTransform(
    scrollYProgress,
    isMobile ? [MOBILE_DEAD, 1] : [0, 1],
    [1, 5]
  );
  const scale6 = useTransform(
    scrollYProgress,
    isMobile ? [MOBILE_DEAD, 1] : [0, 1],
    [1, 6]
  );
  const scale8 = useTransform(
    scrollYProgress,
    isMobile ? [MOBILE_DEAD, 1] : [0, 1],
    [1, 8]
  );
  const scale9 = useTransform(
    scrollYProgress,
    isMobile ? [MOBILE_DEAD, 1] : [0, 1],
    [1, 9]
  );

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  const positions = [
    'h-[25vh] w-[25vw] md:h-[25vh] md:w-[25vw]',
    'absolute -top-[30vh] left-[5vw] h-[30vh] w-[35vw] md:h-[30vh] md:w-[35vw]',
    'absolute -top-[10vh] -left-[25vw] h-[45vh] w-[20vw] md:h-[45vh] md:w-[20vw]',
    'absolute left-[27.5vw] h-[25vh] w-[25vw] md:h-[25vh] md:w-[25vw]',
    'absolute top-[27.5vh] left-[5vw] h-[25vh] w-[20vw] md:h-[25vh] md:w-[20vw]',
    'absolute top-[27.5vh] -left-[22.5vw] h-[25vh] w-[30vw] md:h-[25vh] md:w-[30vw]',
    'absolute top-[22.5vh] left-[25vw] h-[15vh] w-[15vw] md:h-[15vh] md:w-[15vw]',
  ];

  // Mobile: taller container = more scroll before zoom kicks in
  const containerHeight = isMobile ? 'h-[500vh]' : 'h-[300vh]';

  return (
    <div ref={container} className={`relative ${containerHeight}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            >
              <div className={`relative ${positions[index] || positions[0]}`}>
                <LazyImage
                  src={src}
                  alt={alt || ''}
                  width={images[index]?.width || 800}
                  height={images[index]?.height || 600}
                  className="w-full h-full object-cover rounded-sm"
                  rootMargin="400px"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
