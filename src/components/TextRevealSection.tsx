import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextRevealSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    const content = textRef.current.textContent || '';
    textRef.current.innerHTML = content
      .split(' ')
      .map(word => `<span class="text-reveal-word">${word}</span>`)
      .join(' ');

    const words = textRef.current.querySelectorAll('.text-reveal-word');

    gsap.set(words, { color: 'hsl(220, 10%, 85%)' });

    const anim = gsap.to(words, {
      color: 'hsl(220, 20%, 10%)',
      stagger: 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 1,
      },
    });

    return () => { anim.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-background flex items-center justify-center py-32 md:py-48 px-6 md:px-16 lg:px-24">
      <p ref={textRef} className="text-reveal-text font-sans max-w-5xl text-center leading-[1.15]">
        A educação é o único caminho que ninguém pode tirar de você.
      </p>
    </section>
  );
};

export default TextRevealSection;
