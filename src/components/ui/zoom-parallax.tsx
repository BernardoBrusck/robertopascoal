'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
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

const desktopPositions = [
  'h-[25vh] w-[25vw]',
  'absolute -top-[30vh] left-[5vw] h-[30vh] w-[35vw]',
  'absolute -top-[10vh] -left-[25vw] h-[45vh] w-[20vw]',
  'absolute left-[27.5vw] h-[25vh] w-[25vw]',
  'absolute top-[27.5vh] left-[5vw] h-[25vh] w-[20vw]',
  'absolute top-[27.5vh] -left-[22.5vw] h-[25vh] w-[30vw]',
  'absolute top-[22.5vh] left-[25vw] h-[15vh] w-[15vw]',
];

const mobileLayouts = [
  'col-span-2 aspect-[4/3]',
  'aspect-[3/4] -mt-4',
  'aspect-[4/5] mt-6',
  'col-span-2 aspect-[16/10]',
  'aspect-square -mt-6',
  'aspect-[4/3] mt-4',
  'col-span-2 aspect-[3/2]',
];

function MobileZoomGallery({ images }: ZoomParallaxProps) {
  return (
    <div className="relative w-full bg-background px-4 py-8">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3">
        {images.map(({ src, alt, width, height }, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-sm ${mobileLayouts[index % mobileLayouts.length]}`}
          >
            <LazyImage
              src={src}
              alt={alt || ''}
              width={width || 800}
              height={height || 600}
              className="h-full w-full object-cover"
              rootMargin="300px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt, width, height }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
            >
              <div className={`relative ${desktopPositions[index] || desktopPositions[0]}`}>
                <LazyImage
                  src={src}
                  alt={alt || ''}
                  width={width || 800}
                  height={height || 600}
                  className="h-full w-full rounded-sm object-cover"
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

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const isMobile = useIsMobile();

  return isMobile ? <MobileZoomGallery images={images} /> : <DesktopZoomParallax images={images} />;
}
