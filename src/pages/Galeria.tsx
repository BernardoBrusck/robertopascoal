import React from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { ImageGallery } from "@/components/ui/image-gallery";
import { motion } from "framer-motion";

const Galeria = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background pb-32">
      <NavbarAlt />

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto flex flex-col items-center justify-center text-center mt-10 md:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Registros
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter">
            Galeria do <span className="font-serif italic font-medium">Caminho</span>
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground font-light leading-relaxed mt-6">
            Fragmentos visuais da jornada. Lugares, pessoas e as pequenas conexões que encontramos pelo mundo.
          </p>
        </motion.div>
      </section>

      {/* Exibição da Galeria (aproveitando o componente de galeria já existente) */}
      <ImageGallery />
    </div>
  );
};

export default Galeria;
