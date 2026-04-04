import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SpeakingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const elements = section.querySelectorAll('.speak-reveal');

    const anim = gsap.from(elements, {
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    return () => { anim.kill(); };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const message = encodeURIComponent(`Olá! Tenho interesse em contratar uma palestra. Meu e-mail: ${email}`);
      window.open(`https://wa.me/554789054401?text=${message}`, '_blank');
    }
  };

  return (
    <section ref={sectionRef} className="w-full px-4 sm:px-6 md:px-10 py-16 md:py-24">
      <div className="relative mx-auto overflow-hidden rounded-2xl" style={{ maxWidth: '1200px', minHeight: '500px' }}>
        <img src="/image/roberto-pascoal-criancas-sala.webp" alt="Roberto Pascoal em sala de aula com crianças" className="absolute inset-0 w-full h-full object-cover object-left" width={1200} height={800} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 flex flex-col justify-end items-end h-full min-h-[500px] p-8 md:p-14 lg:p-20">
          <div className="max-w-xl flex flex-col gap-6 text-right items-end">
            
            <h2 className="speak-reveal text-white font-bold leading-[0.95]" style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.04em' }}>Palestras que<br />transformam</h2>
            <p className="speak-reveal text-white/70 text-sm md:text-base leading-relaxed max-w-md">Leve uma experiência transformadora para o seu evento. Educação, propósito e impacto social.</p>
            <form onSubmit={handleSubmit} className="speak-reveal flex flex-col sm:flex-row gap-3 max-w-md w-full">
              <Input type="email" placeholder="Seu melhor e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 flex-grow border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:ring-offset-transparent focus:ring-white/30 backdrop-blur-sm" required />
              <Button type="submit" className="h-12 px-6 bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 shrink-0">Enviar<ArrowRight className="ml-2 h-4 w-4" /></Button>
            </form>
            <a href="https://wa.me/554789054401" target="_blank" rel="noopener noreferrer" className="speak-reveal inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-xs uppercase tracking-[0.2em] transition-colors w-fit min-h-[44px]">
              <Phone className="h-3.5 w-3.5" />
              Ou entre em contato pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakingSection;
