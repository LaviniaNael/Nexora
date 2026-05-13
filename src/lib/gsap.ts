import { useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const registerGsapPlugins = () => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
};

export const prefersReducedMotion = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return false;
};

export { gsap };
