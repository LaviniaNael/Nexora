import { useEffect, useRef } from "react";
import {
  Brain,
  Cloud,
  Code2,
  Globe,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/gsap";

/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  SERVICES DATA
 *  ─ Add, remove, or reorder items here.
 *  ─ The first 3 items appear as the "first row" in the scroll
 *    animation; items 4–6 appear as the "second row".
 *  ─ If you add a 7th+ service, update the `firstRow` /
 *    `secondRow` slicing logic inside the useEffect below.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
const services = [
  {
    icon: ShieldCheck,
    title: "IT Management",
    desc: "Comprehensive IT support with unlimited technical assistance, system monitoring, and monthly on-site maintenance.",
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "Custom websites and web applications with premium quality design, database management, and SEO optimization.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "High-performance iOS and Android applications designed to engage users and streamline business processes.",
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    desc: "Strategic visibility solutions to help small businesses compete in their niche and gain time in the spotlight.",
  },
  {
    icon: Brain,
    title: "Social Media Management",
    desc: "Handle platform algorithm changes and maintain consistent online presence without technical overwhelm.",
  },
  {
    icon: Cloud,
    title: "Media Production",
    desc: "Visual storytelling through film and sound, giving your brand an engaging voice through multimedia communication.",
  },
];

/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  STACK TARGET TYPE
 *  Each card receives an (x, y, rotation, scale) target
 *  for the "stacking" phase at the end of the scroll.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
type StackT = { x: number; y: number; rot: number; scale: number };

/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  computeStackTargets()
 *  Calculates where each card should fly to when they "stack"
 *  into a fanned pile at the center of the container.
 *
 *  HOW TO CONTROL THE STACK:
 *  ─ `cr.height * 0.38`  → vertical center of the stack pile.
 *     Increase to push the pile lower, decrease to raise it.
 *  ─ `i * 12`            → vertical offset between stacked cards.
 *     Increase for a more spread-out pile.
 *  ─ `(i - (n-1)/2) * 3.2` → rotation per card (fan angle).
 *     Increase the 3.2 for a wider fan spread.
 *  ─ `1 - i * 0.026`     → scale decrease per card in the pile.
 *     Increase 0.026 for a more dramatic size difference.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
function computeStackTargets(
  wrap: HTMLElement,
  cards: HTMLElement[],
): StackT[] {
  if (cards.length === 0) return [];
  const cr = wrap.getBoundingClientRect();
  const tcx = cr.left + cr.width / 2;       // horizontal center of container
  const tcy = cr.top + cr.height * 0.38;     // vertical target (38% from top)
  const n = cards.length;
  return cards.map((el, i) => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;         // card's current horizontal center
    const cy = r.top + r.height / 2;         // card's current vertical center
    return {
      x: tcx - cx,                           // horizontal distance to fly
      y: tcy - cy + i * 12,                  // vertical distance + stagger offset
      rot: (i - (n - 1) / 2) * 3.2,         // fan rotation (cards fan out from center)
      scale: 1 - i * 0.026,                  // each card slightly smaller than the last
    };
  });
}

/*
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Services Component
 *
 *  ANIMATION OVERVIEW (scroll-driven, pinned section):
 *  ──────────────────────────────────────────────────────────────────────────
 *  Phase 0  (t=0)         → All cards & title hidden (initial state)
 *  Phase 1  (0 → 0.10)    → Title "Complete Hassle-Free Solutions" fades in
 *  Phase 2  (0.08 → 0.20) → First 3 cards animate in with stagger
 *  Phase 3  (0.20 → 0.32) → HOLD — user sees title + first 3 cards
 *  Phase 4  (0.32 → 0.46) → Title slides up & out, container shifts up,
 *                            second 3 cards fade in
 *  Phase 5  (0.48 → 0.68) → HOLD — all 6 cards visible (no title)
 *  Phase 6  (0.68 → 0.92) → Cards fly into a stacked pile
 *
 *  The "t" values above are positions in the GSAP timeline (0 to 1).
 *  The total scroll distance is `window.innerHeight * 7.5`, so each 0.01
 *  of timeline ≈ 7.5% of one viewport height of scrolling.
 *
 *  HOW TO MAKE CHANGES:
 *  ─ To make a phase LONGER (more scroll before next phase):
 *    increase the gap between that phase's start and the next phase's start.
 *  ─ To make an animation FASTER within its scroll range:
 *    decrease its `duration` value.
 *  ─ To change the total scroll length of the entire section:
 *    change the multiplier in `window.innerHeight * 7.5`.
 *  ─ To change how smooth scrolling feels:
 *    adjust `scrub` (0 = instant, 1 = 1 second lag, 0.65 = current).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export function Services() {
  const root = useRef<HTMLElement>(null);        // the <section> — ScrollTrigger's trigger & pin target
  const cardsWrap = useRef<HTMLDivElement>(null); // the grid container — used for stack target math
  const cardRefs = useRef<(HTMLElement | null)[]>([]); // individual card DOM refs
  const stackTs = useRef<StackT[]>([]);          // cached stack positions (recalculated on resize)

  useEffect(() => {
    registerGsapPlugins();

    // Respect "prefers-reduced-motion" — skip all animations if the user
    // has that OS setting enabled (accessibility best practice).
    if (prefersReducedMotion()) return;

    const section = root.current;
    const wrap = cardsWrap.current;
    if (!section || !wrap) return;

    /*
     * refreshStack() recalculates where cards should fly during the
     * stacking phase. Called on mount AND on window resize (via
     * ScrollTrigger's `onRefresh` callback) so positions stay accurate.
     */
    const refreshStack = () => {
      const els = cardRefs.current.filter(Boolean) as HTMLElement[];
      stackTs.current =
        els.length > 0 ? computeStackTargets(wrap, els) : [];
    };

    /*
     * gsap.context() scopes all GSAP animations to the `root` element.
     * When the component unmounts, calling `ctx.revert()` automatically
     * kills every animation & ScrollTrigger created inside this block.
     */
    const ctx = gsap.context(() => {
      refreshStack();

      /*
       * ── MASTER TIMELINE ──
       * A single scrub-driven timeline tied to scroll position.
       *
       * KEY SCROLLTRIGGER OPTIONS:
       * ─ trigger: the element that activates the scroll animation
       * ─ start: "top top" = animation starts when section's top hits viewport top
       * ─ end: total scroll distance before animation completes.
       *        `window.innerHeight * 7.5` = 7.5 full viewport heights of scrolling.
       *        ↑ INCREASE this to make the entire section scroll slower (more scroll per phase).
       *        ↓ DECREASE this to speed up the entire section.
       * ─ scrub: smoothing factor (seconds of lag behind scroll).
       *        0 = instant (jerky), 1 = 1s lag (very smooth), 0.65 = balanced.
       *        ↑ INCREASE for smoother/floatier feel.
       *        ↓ DECREASE for snappier/more responsive feel.
       * ─ pin: true = section stays fixed in the viewport while animating.
       * ─ anticipatePin: 1 = prevents a visual "jump" when pinning starts.
       * ─ invalidateOnRefresh: recalculates function-based values on resize.
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 7.5)}`,
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: refreshStack,
        },
      });

      /*
       * Select card elements via their `data-services-card` attribute.
       * Split into two groups for staged reveal:
       *   firstRow  = cards 0, 1, 2 (IT Management, Web Dev, Mobile Apps)
       *   secondRow = cards 3, 4, 5 (Digital Marketing, Social Media, Media Production)
       *
       * To change grouping (e.g. 2+4 instead of 3+3), adjust the slice indices.
       */
      const cardEls = gsap.utils.toArray<HTMLElement>("[data-services-card]");
      const firstRow = cardEls.slice(0, 3);
      const secondRow = cardEls.slice(3, 6);
      const headEl = "[data-services-head]";   // CSS selector for the title block
      const innerEl = "[data-services-inner]"; // CSS selector for the whole content container

      /* ═══════════════════════════════════════════════════════════════════
       *  PHASE 0 — INITIAL STATE (t = 0)
       *  All cards and the title start hidden. `tl.set()` applies values
       *  instantly at position 0 in the timeline (no animation).
       *
       *  HOW TO CONTROL:
       *  ─ y: 60   → cards start 60px below their natural position.
       *              Increase for a bigger "slide up" entrance effect.
       *  ─ scale: 0.92 → cards start slightly smaller.
       *              Decrease for a more dramatic scale-up entrance.
       *  ─ filter: "blur(10px)" → title starts blurry.
       *              Increase px for a stronger blur-to-clear effect.
       * ═══════════════════════════════════════════════════════════════════ */
      tl.set(cardEls, {
        opacity: 0,
        y: 60,
        scale: 0.92,
        transformOrigin: "50% 50%",
      }, 0);

      tl.set(headEl, {
        opacity: 0,
        y: 28,
        filter: "blur(10px)",
      }, 0);

      /* ═══════════════════════════════════════════════════════════════════
       *  PHASE 1 — TITLE FADES IN (t = 0.01 → ~0.09)
       *  The heading "Complete Hassle-Free Solutions" fades in, slides up
       *  from y:28 to y:0, and deblurs.
       *
       *  HOW TO CONTROL:
       *  ─ Position `0.01`: when in the scroll the title starts appearing.
       *    Move closer to 0 for earlier, further from 0 for later.
       *  ─ duration: 0.08: how much of the timeline this animation takes.
       *    Increase for a slower fade-in, decrease for snappier.
       *  ─ ease: "power2.out": deceleration curve.
       *    Try "power3.out" for more dramatic deceleration,
       *    "none" for linear, or "back.out(1.4)" for slight overshoot.
       * ═══════════════════════════════════════════════════════════════════ */
      tl.to(headEl, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "power2.out",
        duration: 0.08,
      }, 0.01);

      /* ═══════════════════════════════════════════════════════════════════
       *  PHASE 2 — FIRST 3 CARDS ANIMATE IN (t = 0.08 → ~0.20)
       *  Cards slide up, fade in, and scale to full size, staggered.
       *
       *  HOW TO CONTROL:
       *  ─ Start position `0.08`: when the first card starts appearing.
       *    This overlaps slightly with Phase 1 so title and cards
       *    animate in together. Increase for sequential; decrease to
       *    make them more simultaneous.
       *  ─ Stagger `i * 0.035`: delay between each card.
       *    Increase for a more pronounced left-to-right wave.
       *    Decrease (e.g. 0.01) for near-simultaneous appearance.
       *    Set to 0 for all 3 cards appearing at once.
       *  ─ duration: 0.06: animation length per card.
       *    Increase for slower individual card reveals.
       * ═══════════════════════════════════════════════════════════════════ */
      firstRow.forEach((el, i) => {
        tl.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          duration: 0.06,
        }, 0.08 + i * 0.035);
      });

      /* ═══════════════════════════════════════════════════════════════════
       *  PHASE 3 — HOLD (t = 0.20 → 0.32)
       *  No animations happen here. The user scrolls and admires the
       *  title + first 3 cards sitting still on screen.
       *
       *  HOW TO CONTROL:
       *  ─ The "hold" duration is the GAP between the end of Phase 2
       *    (~0.20) and the start of Phase 4 (0.32).
       *    Current gap = 0.12 (≈ 0.9× viewport height of scrolling).
       *    To make the hold LONGER: increase Phase 4's start (e.g. 0.40).
       *    To make it SHORTER: decrease Phase 4's start (e.g. 0.25).
       * ═══════════════════════════════════════════════════════════════════ */

      /* ═══════════════════════════════════════════════════════════════════
       *  PHASE 4 — TRANSITION: TITLE OUT, SECOND ROW IN (t = 0.32 → 0.46)
       *  Three things happen simultaneously:
       *    1. Title slides up and fades out (making vertical room)
       *    2. Inner container shifts upward (cards move into freed space)
       *    3. Second row of 3 cards fades in (staggered)
       *
       *  This ensures all 6 cards fit on screen (the title was taking
       *  ~180px of viewport space that the second row needs).
       * ═══════════════════════════════════════════════════════════════════ */

      /*
       * 4a. Title slides out
       *
       * HOW TO CONTROL:
       * ─ y: -120  → how far up the title slides (negative = upward).
       *   Increase magnitude for faster visual exit.
       * ─ filter: "blur(6px)" → title blurs as it leaves.
       *   Increase for dreamier exit; set to "blur(0px)" for sharp exit.
       * ─ Position `0.32`: when this sub-animation starts.
       */
      tl.to(headEl, {
        opacity: 0,
        y: -120,
        filter: "blur(6px)",
        ease: "power2.inOut",
        duration: 0.10,
      }, 0.32);

      /*
       * 4b. Container shifts up
       * Moves the entire content block upward by half of the title's height + 32px
       * margin. This centers the 6-card grid in the viewport.
       *
       * HOW TO CONTROL:
       * ─ The `+ 32` accounts for the mt-8 margin between title and grid.
       * ─ Dividing by 2 ensures exact mathematical vertical centering of the grid
       *   once the title is gone.
       * ─ duration: 0.12 → how long (in timeline %) the slide takes.
       * ─ Position `0.33`: starts slightly after the title begins fading
       *   so it feels overlapped and smooth.
       */
      tl.to(innerEl, {
        y: () => {
          const headHeight = (section.querySelector("[data-services-head]") as HTMLElement)?.offsetHeight ?? 160;
          return -(headHeight-25); // Slide up by half the removed space to center the grid
        },
        ease: "power2.inOut",
        duration: 0.12,
      }, 0.33);

      /*
       * 4c. Second row fades in (staggered)
       *
       * HOW TO CONTROL:
       * ─ Position `0.37`: when the first card of row 2 starts appearing.
       * ─ Stagger `i * 0.035`: same as first row. Adjust for wave speed.
       * ─ duration: 0.06: per-card animation duration.
       */
      secondRow.forEach((el, i) => {
        tl.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          duration: 0.06,
        }, 0.37 + i * 0.035);
      });

      /* ═══════════════════════════════════════════════════════════════════
       *  PHASE 5 — HOLD: ALL 6 CARDS VISIBLE (t = 0.48 → 0.68)
       *  No animations. The user scrolls and sees the full 2×3 grid.
       *  Title is gone, all 6 cards are at full opacity and scale.
       *
       *  HOW TO CONTROL:
       *  ─ The hold duration = gap between end of Phase 4 (~0.48)
       *    and start of Phase 6 (0.68).
       *    Current gap = 0.20 (≈ 1.5× viewport height of scrolling).
       *    INCREASE stackStart to make this hold longer.
       *    DECREASE stackStart to rush into stacking sooner.
       * ═══════════════════════════════════════════════════════════════════ */

      /* ═══════════════════════════════════════════════════════════════════
       *  PHASE 6 — STACK ANIMATION (t = 0.68 → ~0.92)
       *  All 6 cards fly from their grid positions to a centered,
       *  overlapping, slightly-rotated pile.
       *
       *  HOW TO CONTROL:
       *  ─ stackStart (0.68): when stacking begins in the timeline.
       *  ─ `i * 0.018`: stagger delay between each card's flight.
       *    Increase for a more sequential "dealing" effect.
       *    Decrease for near-simultaneous pile-up.
       *  ─ duration: 0.14: how long each card's flight takes.
       *    Increase for slower, more dramatic movement.
       *  ─ boxShadow: controls the drop shadow on stacked cards.
       *    Adjust rgba alpha for stronger/weaker shadows.
       *  ─ ease: "power2.inOut": smooth acceleration + deceleration.
       *    Try "back.inOut(1.4)" for a bouncy feel.
       *
       *  The actual x/y/rotation/scale targets come from
       *  computeStackTargets() — see that function's comments above
       *  for how to adjust the pile's shape, fan angle, and spacing.
       * ═══════════════════════════════════════════════════════════════════ */
      const stackStart = 0.68;
      cardEls.forEach((el, i) => {
        tl.to(
          el,
          {
            x: () => stackTs.current[i]?.x ?? 0,
            y: () => stackTs.current[i]?.y ?? 0,
            rotation: () => stackTs.current[i]?.rot ?? 0,
            scale: () => stackTs.current[i]?.scale ?? 1,
            zIndex: 10 + i,    // later cards stack on top
            boxShadow: "0 22px 48px rgba(0,0,0,0.42)",
            ease: "power2.inOut",
            duration: 0.14,
          },
          stackStart + i * 0.018,
        );
      });

      /*
       * ── PARALLAX GLOW ──
       * A separate ScrollTrigger (not part of the main timeline) that
       * gently moves the radial glow overlay on each card as the user
       * scrolls through the full page.
       *
       * HOW TO CONTROL:
       * ─ xPercent / yPercent: how far the glow drifts. Increase for
       *   more dramatic parallax movement.
       * ─ This runs the full time the section is in the viewport
       *   (start: "top bottom" to end: "bottom top").
       */
      gsap.to("[data-services-glow]", {
        opacity: 1,
        xPercent: 8,
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    /*
     * After mount, wait one frame for the DOM to settle, then
     * recalculate stack positions and refresh ScrollTrigger.
     * This ensures measurements are accurate after layout.
     */
    const raf = requestAnimationFrame(() => {
      refreshStack();
      ScrollTrigger.refresh();
    });

    /*
     * CLEANUP: on unmount, cancel the pending rAF and revert all
     * GSAP animations + ScrollTriggers created in this context.
     */
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  /*
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   *  JSX / MARKUP
   *
   *  DATA ATTRIBUTES — these connect the DOM to GSAP selectors above:
   *  ─ data-services-inner → the animatable content wrapper (shifts up
   *    during Phase 4 to make room for all 6 cards)
   *  ─ data-services-head  → the title block (animated in Phase 1,
   *    animated out in Phase 4)
   *  ─ data-services-card  → each service card (animated in Phases 2/4,
   *    stacked in Phase 6)
   *  ─ data-services-glow  → the per-card radial glow overlay
   *    (parallax-scrolled independently)
   *
   *  CSS CLASSES ON <section>:
   *  ─ services-section → defined in styles.css, sets min-height: 100vh
   *    and flex centering so the content fills the viewport when pinned.
   *  ─ overflow-hidden  → prevents content from spilling out during
   *    the upward shift animation in Phase 4.
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   */
  return (
    <div>
      <section ref={root} id="services" className="services-section relative overflow-hidden">
        <div data-services-inner className="container-px mx-auto max-w-7xl will-change-transform">
          {/* ── TITLE BLOCK (animated by headEl selector) ── */}
          <div data-services-head className="mx-auto max-w-2xl text-center pt-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">Services</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Complete <span className="text-gradient-magenta">Hassle-Free</span> Solutions.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              From IT infrastructure to digital marketing, we handle all the technicalities
              so you can focus on your business passion.
            </p>
          </div>

          {/*
           * ── CARDS GRID ──
           * 3 columns on large screens, 2 on medium, 1 on small.
           * gap-4 controls spacing between cards. Increase for more
           * breathing room (but may push bottom cards off-screen).
           * mt-8 is the margin between the title and the grid.
           */}
          <div
            ref={cardsWrap}
            className="relative mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((s, i) => (
              <article
                key={s.title}
                data-services-card
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-surface to-surface-elevated/40 p-5 will-change-transform transition-colors hover:border-primary/35"
              >
                {/* Radial glow overlay — parallax-scrolled via data-services-glow */}
                <div
                  data-services-glow
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px circle at 50% 0%, oklch(0.55 0.2 5 / 0.18), transparent 60%)",
                  }}
                />
                {/* Icon */}
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-primary-glow transition-transform duration-300 group-hover:scale-110 group-hover:shadow-glow">
                  <s.icon size={18} />
                </div>
                {/* Title */}
                <h3 className="relative mt-4 font-display text-base font-semibold sm:text-lg">
                  {s.title}
                </h3>
                {/* Description */}
                <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                {/* Hover-only "Learn more" link */}
                <div className="relative mt-4 flex items-center text-xs font-medium text-primary-glow opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more →
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
