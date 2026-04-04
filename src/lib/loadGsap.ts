/**
 * Shared GSAP + ScrollTrigger loader utility.
 * Loads scripts once and caches the promise so multiple components
 * don't create duplicate <script> tags.
 */

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

let gsapPromise: Promise<any> | null = null;
let scrollTriggerPromise: Promise<any> | null = null;

function loadScript(src: string, globalName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any)[globalName]) {
      resolve((window as any)[globalName]);
      return;
    }

    // Check if script tag already exists
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      const check = setInterval(() => {
        if ((window as any)[globalName]) {
          clearInterval(check);
          resolve((window as any)[globalName]);
        }
      }, 50);
      setTimeout(() => { clearInterval(check); reject(new Error(`Timeout: ${globalName}`)); }, 10000);
      return;
    }

    const s = document.createElement('script');
    s.src = src;
    s.onload = () => setTimeout(() => resolve((window as any)[globalName]), 50);
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export function loadGsap(): Promise<any> {
  if (!gsapPromise) {
    gsapPromise = loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
      'gsap'
    );
  }
  return gsapPromise;
}

export async function loadGsapWithScrollTrigger(): Promise<{ gsap: any; ScrollTrigger: any }> {
  const gsap = await loadGsap();

  if (!scrollTriggerPromise) {
    scrollTriggerPromise = (async () => {
      if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);
        return window.ScrollTrigger;
      }
      await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
        'ScrollTrigger'
      );
      gsap.registerPlugin(window.ScrollTrigger);
      return window.ScrollTrigger;
    })();
  }

  const ScrollTrigger = await scrollTriggerPromise;
  return { gsap, ScrollTrigger };
}
