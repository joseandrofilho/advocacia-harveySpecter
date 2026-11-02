/* ==========================================================================
   CURSOR — círculo champagne que segue o mouse e cresce sobre
   links, botões, cards e fotos. Só em desktop com mouse.
   ========================================================================== */

const CURSOR_TARGETS = "a, button, input, select, textarea, label, .card, .case, .photo";

function initCursor() {
  if (!motionEnabled || !isFinePointer) return;

  const cursor = $(".cursor");
  const dot = $(".cursor__dot", cursor);
  const ring = $(".cursor__ring", cursor);

  document.documentElement.classList.add("has-cursor");
  gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
  gsap.set(cursor, { autoAlpha: 0 }); // aparece só no primeiro movimento

  window.addEventListener("pointermove", () => gsap.to(cursor, { autoAlpha: 1, duration: 0.3 }), { once: true });

  /* O ponto acompanha na hora; o anel vem com atraso suave */
  const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
  const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
  const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
  const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

  window.addEventListener("pointermove", ({ clientX, clientY }) => {
    dotX(clientX);
    dotY(clientY);
    ringX(clientX);
    ringY(clientY);
  });

  document.addEventListener("pointerover", (event) => {
    cursor.classList.toggle("is-hover", Boolean(event.target.closest(CURSOR_TARGETS)));
  });

  const page = document.documentElement;
  page.addEventListener("mouseleave", () => gsap.to(cursor, { autoAlpha: 0, duration: 0.2 }));
  page.addEventListener("mouseenter", () => gsap.to(cursor, { autoAlpha: 1, duration: 0.2 }));
}
