import { gsap as core } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const gsap = core;

let registered = false;

export function registerGsapPlugins() {
  if (registered) return;
  if (typeof window === "undefined") return;

  core.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

