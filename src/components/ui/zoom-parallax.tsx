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
  isPolaroid?: boolean;
}

interface ZoomParallaxProps {
  images: Image[];
}

const desktopPositions = [
  'w-[28vw] h-[32vh]', // 0: Center (to cover full screen when scaled by 4)
  'absolute -top-[36vh] left-[10vw] w-[12vw] aspect-[4/5]', // 1: Top Right
  'absolute -top-[22vh] -left-[28vw] w-[14vw] aspect-[4/5]', // 2: Top Left
  'absolute top-[10vh] left-[25vw] w-[13vw] aspect-[4/5]', // 3: Right
  'absolute top-[35vh] left-[5vw] w-[13vw] aspect-[4/5]', // 4: Bottom Right
  'absolute top-[32vh] -left-[26vw] w-[14vw] aspect-[4/5]', // 5: Bottom Left
  'absolute -top-[18vh] left-[26vw] w-[11vw] aspect-[4/5]', // 6: Far Top Right (Índio - moved up and left)
];

const mobileLayouts = [
  'col-span-2 aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[4/5]',
  'col-span-2 aspect-[16/10]',
  'aspect-square',
  'aspect-[4/3]',
  'col-span-2 aspect-[3/2]',
];

function MobileZoomGallery({ images }: ZoomParallaxProps) {
  return (
    <div className="relative w-full bg-background px-4 py-8">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4">
        {images.map(({ src, alt, width, height, isPolaroid }, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${mobileLayouts[index % mobileLayouts.length]}`}
          >
            <img
              src={src}
              alt={alt || ''}
              width={width || 800}
              height={height || 600}
              className={isPolaroid ? "h-full w-full object-cover bg-white p-2 pb-6 shadow-xl" : "h-full w-full object-cover rounded-sm"}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
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
        {images.map(({ src, alt, width, height, isPolaroid }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
            >
              <div className={`relative flex items-center justify-center ${desktopPositions[index] || desktopPositions[0]}`}>
                 {isPolaroid ? (
                   <div className="bg-white p-[5%] pb-[20%] shadow-[0_10px_20px_rgba(0,0,0,0.2)] w-full h-full flex flex-col rounded-[2px] transform rotate-1 hover:rotate-0 transition-transform duration-500">
                     <div className="w-full flex-grow relative overflow-hidden bg-gray-100">
                       <img
                         src={src}
                         alt={alt || ''}
                         width={width || 800}
                         height={height || 600}
                         className="absolute inset-0 w-full h-full object-cover rounded-[1px]"
                         decoding="async"
                       />
                     </div>
                   </div>
                ) : (
                  <img
                    src={src}
                    alt={alt || ''}
                    width={width || 800}
                    height={height || 600}
                    className="h-full w-full rounded-[4px] object-cover shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                )}
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

  if (isMobile) return null;

  return <DesktopZoomParallax images={images} />;
}
