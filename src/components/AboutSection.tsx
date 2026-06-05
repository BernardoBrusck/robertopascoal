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
            className="absolute inset-0 w-full h-[130%] object-cover object-center -top-[15%] will-change-transform transform-gpu"
          />
        </div>
        
        {/* Text Presentation Box */}
        <div className="w-full lg:flex-1 flex flex-col justify-center text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl md:text-4xl lg:text-[2.75rem] font-light tracking-[0.5px] text-black leading-[1.4] md:leading-[1.8] mb-6 md:mb-10 text-center lg:text-left"
          >
            Um Roberto comum que, no caminho, se tornou empreendedor social, palestrante e um autor em construção.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block w-16 h-px bg-black origin-left mb-6 md:mb-10" 
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl lg:text-3xl font-light italic text-gray-600 leading-[1.4] md:leading-[1.6] max-w-xl text-center lg:text-left mx-auto lg:mx-0"
          >
            Alguém inacabado, que acredita que a vida acontece no meio do caminho.
          </motion.p>
        </div>

      </div>
    </section>
  );
};
