/**
 * GSAP + ScrollTrigger — loaded from npm bundle (tree-shakeable).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Legacy compat: some components used loadGsapWithScrollTrigger().
 * Now it just returns the already-registered instances synchronously wrapped in a resolved promise.
 */
export function loadGsapWithScrollTrigger(): Promise<{ gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }> {
  return Promise.resolve({ gsap, ScrollTrigger });
}

export function loadGsap(): Promise<typeof gsap> {
  return Promise.resolve(gsap);
}
