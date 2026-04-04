import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
  url?: string;
  image?: string | null;
  type?: string;
  jsonLd?: Record<string, any>;
}

/**
 * Dynamically sets document <title>, meta description, OG tags, and optional JSON-LD.
 * Cleans up injected tags on unmount so they don't leak across routes.
 */
const SeoHead = ({ title, description, url, image, type = "website", jsonLd }: SeoHeadProps) => {
  useEffect(() => {
    const prev = document.title;
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      const created = !el;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
      return { el, created };
    };

    const tracked: { el: HTMLElement; created: boolean }[] = [];

    tracked.push(setMeta("name", "description", description));
    tracked.push(setMeta("property", "og:title", title));
    tracked.push(setMeta("property", "og:description", description));
    tracked.push(setMeta("property", "og:type", type));
    if (url) tracked.push(setMeta("property", "og:url", url));
    if (image) tracked.push(setMeta("property", "og:image", image));
    tracked.push(setMeta("name", "twitter:title", title));
    tracked.push(setMeta("name", "twitter:description", description));
    if (image) tracked.push(setMeta("name", "twitter:image", image));

    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.setAttribute("data-seo-head", "true");
      scriptEl.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(scriptEl);
    }

    return () => {
      document.title = prev;
      tracked.forEach(({ el, created }) => {
        if (created) el.remove();
      });
      if (scriptEl) scriptEl.remove();
    };
  }, [title, description, url, image, type, jsonLd]);

  return null;
};

export default SeoHead;
