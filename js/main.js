/* ==========================================================================
   MAIN — ordem de inicialização do site.
   ========================================================================== */

(function boot() {
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  initSmoothScroll();
  initNav();
  initCursor();
  initParticles($(".hero__particles"));
  initHeroVideo();
  initGallery();

  prepareHero();
  initReveals();
  initCounters();
  initSignature();
  initParallax();

  const strikeContactGavel = initContactGavel();
  initForm({ onSuccess: strikeContactGavel });

  /* A abertura trava a rolagem e, ao terminar, dispara a entrada do hero */
  setScrollEnabled(false);
  initIntro(() => {
    setScrollEnabled(true);
    playHeroEntrance();
    if (hasGsap) ScrollTrigger.refresh();
  });
})();
