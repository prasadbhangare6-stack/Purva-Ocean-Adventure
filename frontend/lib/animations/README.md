# Animation foundation

| Utility | File | Use for |
| --- | --- | --- |
| `revealOnScroll` | `gsap.ts` | Fade/rise sections and cards on scroll |
| `textEntrance` | `gsap.ts` | Hero/heading line entrance |
| `imageReveal` | `gsap.ts` | Clip-path wipe for large imagery |
| `cardHoverScale` | `gsap.ts` | Subtle card image zoom (pointer devices) |
| `usePrefersReducedMotion` | `hooks.ts` | Branch rendering on reduced motion |
| `useGsapEffect` | `hooks.ts` | Attach a GSAP setup to a ref with cleanup |

Rules:

1. All GSAP helpers return early under `prefers-reduced-motion: reduce`, so content stays visible.
2. Animate only `transform`, `opacity` and `clip-path`.
3. Use CSS (`animate-page-enter`, `animate-fade-up`, `transition-*`) for simple transitions.
4. Every helper returns a cleanup function. Always use it in `useEffect` / `useGsapEffect`.
