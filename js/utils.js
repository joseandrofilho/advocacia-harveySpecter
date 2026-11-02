/* ==========================================================================
   UTILS — atalhos e flags compartilhados por todos os scripts.
   ========================================================================== */

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

/* Movimento completo só quando o usuário permite e o GSAP carregou */
const motionEnabled = !prefersReducedMotion && hasGsap;

/* Formata números no padrão brasileiro (4,2 · 312) */
const formatNumber = (value, decimals = 0) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
