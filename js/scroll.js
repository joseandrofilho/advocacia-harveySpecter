/* ==========================================================================
   SCROLL — rolagem suave (Lenis), âncoras do menu e estado da navegação.
   ========================================================================== */

const NAV_SCROLL_OFFSET = 40; // px rolados até a nav ganhar fundo de vidro

let lenis = null;

function initSmoothScroll() {
  if (!motionEnabled || typeof Lenis === "undefined") {
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    return;
  }

  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(2, -10 * t) });

  /* Lenis e ScrollTrigger usam o mesmo relógio do GSAP */
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = $(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { duration: 1.6 });
    });
  });
}

/* Trava/destrava a rolagem suave (usado durante a abertura) */
function setScrollEnabled(enabled) {
  if (!lenis) return;
  enabled ? lenis.start() : lenis.stop();
}

function initNav() {
  const nav = $(".nav");
  const update = () => nav.classList.toggle("is-scrolled", window.scrollY > NAV_SCROLL_OFFSET);

  update();
  window.addEventListener("scroll", update, { passive: true });
}
