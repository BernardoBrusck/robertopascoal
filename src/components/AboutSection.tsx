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
    <section ref={containerRef} className="py-16 md:py-24 px-6 lg:px-12 bg-white relative overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10 w-full">
        
        {/* Photo Container with Parallax Effect */}
        <div className="w-full lg:w-5/12 aspect-[4/5] relative overflow-hidden rounded-[4px] shadow-2xl">
          <motion.img 
            style={{ y: y1 }}
            src="/image/roberto-pascoal-retrato-2.webp" 
            alt="Roberto Pascoal" 
            className="absolute inset-0 w-full h-[130%] object-cover object-center -top-[15%]"
          />
        </div>
        
        {/* Text Presentation Box */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center space-y-10 lg:pl-10">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl lg:text-[3.25rem] font-light tracking-[0.5px] leading-[1.2] text-black"
          >
            Um Roberto comum que, no caminho, se tornou empreendedor social, palestrante e um escritor em construção.
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-black origin-left" 
          />

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed max-w-xl"
          >
            Alguém inacabado, que acredita que a vida acontece no meio do caminho.
          </motion.p>
        </div>

      </div>
    </section>
  );
};
