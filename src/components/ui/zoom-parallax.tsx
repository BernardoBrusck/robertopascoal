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
  zIndex?: number;
  objectPosition?: string;
}

interface ZoomParallaxProps {
  images: Image[];
}

const desktopPositions = [
  'w-[28vw] aspect-[3/2]', // 0: Center

  // — First ring —
  'absolute -top-[22vh] left-[16vw] w-[12vw] aspect-[4/5]',   // 1
  'absolute -top-[24vh] -left-[34vw] w-[14vw] aspect-[4/5]',  // 2
  'absolute top-[14vh] left-[38vw] w-[13vw] aspect-[4/5]',    // 3
  'absolute top-[32vh] left-[16vw] w-[13vw] aspect-[4/5]',    // 4
  'absolute top-[28vh] -left-[22vw] w-[14vw] aspect-[4/5]',   // 5
  'absolute -top-[2vh] left-[22vw] w-[11vw] aspect-[4/5]',    // 6

  // — Second ring —
  'absolute -top-[18vh] -left-[19vw] w-[11vw] aspect-[4/5]',  // 7
  'absolute top-[40vh] left-[30vw] w-[12vw] aspect-[4/5]',    // 8
  'absolute top-[8vh] -left-[40vw] w-[12vw] aspect-[4/5]',    // 9
  'absolute -top-[28vh] left-[30vw] w-[10vw] aspect-[4/5]',   // 10
  'absolute top-[44vh] -left-[34vw] w-[13vw] aspect-[4/5]',   // 11
  'absolute -top-[34vh] -left-[10vw] w-[11vw] aspect-[3/4]',  // 12
  'absolute top-[38vh] -left-[14vw] w-[12vw] aspect-[4/5]',    // 13
  'absolute -top-[24vh] left-[45vw] w-[12vw] aspect-[4/5]',     // 14
  'absolute top-[44vh] left-[2vw] w-[12vw] aspect-[3/4]',     // 15
];

const mobileLayouts = [
  'col-span-2 aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[4/5]',
  'col-span-2 aspect-[16/10]',
  'aspect-square',
  'col-span-2 aspect-[3/2]',
  'aspect-[3/4]',
  'aspect-square',
  'col-span-2 aspect-[4/3]',
  'aspect-[4/5]',
  'aspect-[4/3]',
  'col-span-2 aspect-[16/9]',
  'aspect-[4/5]',
  'aspect-[4/3]',
  'aspect-[4/5]',
];

function MobileZoomGallery({ images }: ZoomParallaxProps) {
  return (
    <div className="relative w-full bg-background px-4 py-10 pb-16">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3">
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
              className={isPolaroid
                ? "h-full w-full object-cover bg-white p-2 pb-6 shadow-xl"
                : "h-full w-full object-cover rounded-sm shadow-md"}
              decoding="async"
              loading={index === 0 ? "eager" : "lazy"}
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

  const scale4  = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5  = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6  = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8  = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9  = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scale11 = useTransform(scrollYProgress, [0, 1], [1, 11]);
  const scale13 = useTransform(scrollYProgress, [0, 1], [1, 13]);

  // index 0 = center (scale4), rings scale up further so they fly away sooner
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9, scale11, scale13, scale11, scale13, scale11, scale9, scale8, scale11, scale9];

  const rotations = [-2, 1, -3, 2, -1, 0, 3, -2, 1, -1, 2, 0, -2, 3, -1, -3, 1];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt, width, height, isPolaroid }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale, zIndex: images[index].zIndex !== undefined ? images[index].zIndex : 1 }}
              className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
            >
              <div className={`relative flex items-center justify-center ${desktopPositions[index] || desktopPositions[0]}`}>
                 {isPolaroid ? (
                   <motion.div 
                     animate={{ rotate: rotations[index % rotations.length] }}
                     whileHover={{ rotate: 0, scale: 1.05 }}
                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
                     className="bg-white p-[5%] pb-[20%] shadow-[0_10px_20px_rgba(0,0,0,0.2)] w-full h-full flex flex-col rounded-[2px]"
                   >
                     <div className="w-full flex-grow relative overflow-hidden bg-gray-100">
                       <img
                         src={src}
                         alt={alt || ''}
                         width={width || 800}
                         height={height || 600}
                         className="absolute inset-0 w-full h-full object-cover rounded-[1px]"
                         style={{ objectPosition: images[index].objectPosition || 'center' }}
                         decoding="async"
                       />
                     </div>
                   </motion.div>
                ) : (
                  <img
                    src={src}
                    alt={alt || ''}
                    width={width || 800}
                    height={height || 600}
                    className="h-full w-full rounded-[4px] object-cover shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                    style={{ objectPosition: images[index].objectPosition || 'center' }}
                    decoding="async"
                    loading={index === 0 ? "eager" : "lazy"}
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

  if (isMobile === undefined) return null;
  if (isMobile) return <MobileZoomGallery images={images} />;

  return <DesktopZoomParallax images={images} />;
}
