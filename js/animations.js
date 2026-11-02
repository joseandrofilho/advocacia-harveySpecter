/* ==========================================================================
   ANIMAÇÕES — hero, revelações no scroll, contadores, assinatura,
   parallax e martelo do contato. Tudo depende de motionEnabled.
   ========================================================================== */

const REVEAL = { y: 40, fromOpacity: 0.15, start: "top 92%" };

/* Estados iniciais do hero: aplicados antes da cortina abrir */
function prepareHero() {
  if (!motionEnabled) return;

  gsap.set(".mask__line", { yPercent: 110 });
  gsap.set([".hero__eyebrow", ".hero__lead", ".hero__actions", ".hero__meta"], { autoAlpha: 0, y: 24 });
  gsap.set(".hero__video", { scale: 1.18 });
  gsap.set(".hero__portrait img", { autoAlpha: 0, y: 60 });
  gsap.set(".nav", { autoAlpha: 0, y: -20 });
}

/* Entrada do hero: zoom-out do vídeo, título por máscara, retrato */
function playHeroEntrance() {
  if (!motionEnabled) return;

  gsap
    .timeline({ defaults: { ease: "expo.out" } })
    .to(".hero__video", { scale: 1, duration: 2.6, ease: "power2.out" }, 0)
    .to(".hero__eyebrow", { autoAlpha: 1, y: 0, duration: 1 }, 0.2)
    .to(".mask__line", { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.3)
    .to(".hero__portrait img", { autoAlpha: 1, y: 0, duration: 1.8, ease: "power3.out" }, 0.5)
    .to(".nav", { autoAlpha: 1, y: 0, duration: 1 }, 0.6)
    .to([".hero__lead", ".hero__actions", ".hero__meta"], { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.9);
}

/* Parallax: cada camada do hero rola numa velocidade diferente */
function initParallax() {
  if (!motionEnabled) return;

  const heroScrub = { trigger: ".hero", start: "top top", end: "bottom top", scrub: true };

  gsap.to(".hero__media", { yPercent: 16, ease: "none", scrollTrigger: heroScrub });
  gsap.to(".hero__portrait", { yPercent: 12, ease: "none", scrollTrigger: heroScrub });
  gsap.to(".hero__content", { yPercent: -18, autoAlpha: 0, ease: "none", scrollTrigger: { ...heroScrub, end: "70% top" } });

  gsap.fromTo(
    ".verdict__bg",
    { yPercent: -10 },
    { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".verdict", start: "top bottom", end: "bottom top", scrub: true } }
  );

  gsap.fromTo(
    ".partner__watermark",
    { y: -80 },
    { y: 80, ease: "none", scrollTrigger: { trigger: ".partner", start: "top bottom", end: "bottom top", scrub: true } }
  );
}

/* [data-reveal]: sobe 40px e vai de .15 a 1. Elementos vizinhos entram em sequência */
function initReveals() {
  if (!motionEnabled) return;

  gsap.set("[data-reveal]", { y: REVEAL.y, opacity: REVEAL.fromOpacity });

  ScrollTrigger.batch("[data-reveal]", {
    start: REVEAL.start,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.1, overwrite: true }),
  });
}

/* [data-count]: contador ao entrar na tela. data-dec = casas decimais,
   data-from = valor inicial (permite contar para baixo, como o "0") */
function initCounters() {
  if (!motionEnabled) return;

  $$("[data-count]").forEach((el) => {
    const end = parseFloat(el.dataset.count);
    const from = parseFloat(el.dataset.from || 0);
    const decimals = parseInt(el.dataset.dec || 0, 10);
    const state = { value: from };

    el.textContent = formatNumber(from, decimals);

    gsap.to(state, {
      value: end,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 95%", once: true },
      onUpdate: () => (el.textContent = formatNumber(state.value, decimals)),
    });
  });
}

/* Assinatura: desenha o contorno das letras e depois preenche */
function initSignature() {
  const text = $(".signature text");
  if (!motionEnabled || !text) return;

  gsap.set(text, { strokeDasharray: 1200, strokeDashoffset: 1200, fillOpacity: 0 });

  gsap
    .timeline({ scrollTrigger: { trigger: ".signature", start: "top 88%", once: true } })
    .to(text, { strokeDashoffset: 0, duration: 2.8, ease: "power2.inOut" })
    .to(text, { fillOpacity: 1, duration: 0.9, ease: "power1.out" }, "-=0.8");
}

/* Martelo do contato: bate ao aparecer. Retorna a função de batida para o formulário */
function initContactGavel() {
  const slot = $(".contact__gavel");
  const gavel = mountGavel(slot);

  if (!motionEnabled) return () => {};

  const strike = () => strikeGavel(gavel);

  ScrollTrigger.create({ trigger: slot, start: "top 80%", once: true, onEnter: strike });

  return strike;
}

/* Galeria: em telas de toque, um toque devolve a cor da foto */
function initGallery() {
  if (isFinePointer) return;

  $$(".gallery__item").forEach((item) => {
    item.addEventListener("click", () => {
      $$(".gallery__item.is-active").forEach((other) => other !== item && other.classList.remove("is-active"));
      item.classList.toggle("is-active");
    });
  });
}

/* Pausa o vídeo do hero fora da tela para poupar bateria e CPU */
function initHeroVideo() {
  const video = $(".hero__video");

  new IntersectionObserver(([entry]) => {
    entry.isIntersecting ? video.play().catch(() => {}) : video.pause();
  }).observe(video);
}
