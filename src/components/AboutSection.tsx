import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax animation for the image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={containerRef} className="pt-8 pb-16 md:py-24 px-6 lg:px-12 bg-white relative overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10 w-full">
        
        {/* Photo Container with Parallax Effect */}
        <div className="w-full md:w-[70%] lg:w-[40%] aspect-[4/5] relative overflow-hidden rounded-xl shadow-2xl mx-auto shrink-0">
          <motion.img 
            style={{ y: y1 }}
            src="/image/Roberto-rio.webp" 
            alt="Roberto Pascoal" 
            className="absolute inset-0 w-full h-[130%] object-cover object-center -top-[15%]"
          />
        </div>
        
        {/* Text Presentation Box */}
        <div className="w-full lg:flex-1 flex flex-col justify-center space-y-6 md:space-y-10">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-4xl lg:text-[2.75rem] font-light tracking-[0.5px] leading-[1.25] text-black"
          >
            Um Roberto comum que, no caminho, se tornou empreendedor social, palestrante e um escritor em construção.
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block w-16 h-px bg-black origin-left" 
          />

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-2xl font-light tracking-[0.5px] md:tracking-normal leading-[1.25] md:leading-relaxed text-black md:text-gray-700 max-w-xl"
          >
            Alguém inacabado, que acredita que a vida acontece no meio do caminho.
          </motion.p>
        </div>

      </div>
    </section>
  );
};
