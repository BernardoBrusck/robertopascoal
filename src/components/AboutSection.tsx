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
          <div className="space-y-1 mb-6">
            {[
              "Um Roberto comum que, no",
              "caminho, se tornou empreendedor",
              "social, palestrante e um escritor em",
              "construção."
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + (i * 0.1) }}
                className="pb-3"
              >
                <span className="block text-2xl md:text-4xl lg:text-[2.75rem] font-light tracking-[0.5px] text-black leading-[1.8]">
                  {text}
                </span>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block w-16 h-px bg-black origin-left mb-6" 
          />

          <div className="space-y-1">
            {[
              "Alguém inacabado, que acredita que a vida acontece no",
              "meio do caminho."
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 + (i * 0.1) }}
                className="pb-3"
              >
                <span className="block text-2xl md:text-2xl font-light tracking-[0.5px] md:tracking-normal text-black md:text-gray-700 leading-[1.8] max-w-xl">
                  {text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
