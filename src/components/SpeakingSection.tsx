import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

declare const gsap: any;

const SpeakingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const waitForGsap = setInterval(() => {
      if (typeof gsap !== 'undefined' && (window as any).ScrollTrigger) {
        clearInterval(waitForGsap);
        initAnimation();
      }
    }, 100);

    const initAnimation = () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      const elements = section.querySelectorAll('.speak-reveal');

      gsap.from(elements, {
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
    };

    const timeout = setTimeout(() => clearInterval(waitForGsap), 15000);
    return () => {
      clearInterval(waitForGsap);
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const message = encodeURIComponent(
        `Olá! Tenho interesse em contratar uma palestra. Meu e-mail: ${email}`
      );
      window.open(`https://wa.me/554789054401?text=${message}`, '_blank');
    }
  };

  return (
    <section ref={sectionRef} className="w-full px-4 sm:px-6 md:px-10 py-16 md:py-24">
      <div
        className="relative mx-auto overflow-hidden rounded-2xl"
        style={{ maxWidth: '1200px', minHeight: '500px' }}
      >
        {/* Background image */}
        <img
          src="/image/palestra-roberto.webp"
          alt="Roberto Pascoal palestrando"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full min-h-[500px] p-8 md:p-14 lg:p-20">
          <div className="max-w-xl flex flex-col gap-6">
            <span className="speak-reveal text-xs uppercase tracking-[0.3em] text-white/60">
              Roberto Pascoal
            </span>

            <h2
              className="speak-reveal text-white font-bold leading-[0.95]"
              style={{
                fontSize: 'clamp(32px, 5vw, 64px)',
                letterSpacing: '-0.04em',
              }}
            >
              Palestras que
              <br />
              transformam
            </h2>

            <p className="speak-reveal text-white/70 text-sm md:text-base leading-relaxed max-w-md">
              Leve uma experiência transformadora para o seu evento. Educação, propósito e impacto social.
            </p>

            {/* Email + CTA */}
            <form onSubmit={handleSubmit} className="speak-reveal flex flex-col sm:flex-row gap-3 max-w-md">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-grow border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:ring-offset-transparent focus:ring-white/30 backdrop-blur-sm"
                required
              />
              <Button
                type="submit"
                className="h-12 px-6 bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 shrink-0"
              >
                Enviar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* WhatsApp link */}
            <a
              href="https://wa.me/554789054401"
              target="_blank"
              rel="noopener noreferrer"
              className="speak-reveal inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-xs uppercase tracking-[0.2em] transition-colors w-fit"
            >
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
