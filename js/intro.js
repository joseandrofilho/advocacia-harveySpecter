/* ==========================================================================
   ABERTURA — martelo bate → cortina abre (~2,5s), com botão de pular.
   Chama onComplete quando a página fica livre para rolar.
   ========================================================================== */

function initIntro(onComplete) {
  const intro = $("#intro");
  const root = document.documentElement;

  /* Libera a página uma única vez, venha do fim da timeline ou do "pular" */
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    root.classList.remove("is-locked");
    onComplete();
  };

  const finish = () => {
    intro.remove();
    release();
  };

  if (!motionEnabled) {
    finish();
    return;
  }

  root.classList.add("is-locked");

  const stage = $(".intro__stage", intro);
  const skip = $(".intro__skip", intro);
  const gavel = mountGavel($(".intro__gavel", intro));

  const tl = gsap.timeline({ onComplete: finish });

  tl.from(gavel, { autoAlpha: 0, y: 24, duration: 0.6, ease: "power2.out" })
    .add(strikeGavel(gavel, { shakeTarget: stage }))
    /* a cortina abre logo depois da batida, enquanto o martelo assenta */
    .addLabel("open", "-=0.3")
    .to(stage, { autoAlpha: 0, scale: 0.96, duration: 0.4, ease: "power2.in" }, "open")
    .to(skip, { autoAlpha: 0, duration: 0.3 }, "open")
    .to(".intro__curtain--left", { xPercent: -100, duration: 1.1, ease: "expo.inOut" }, "open+=0.2")
    .to(".intro__curtain--right", { xPercent: 100, duration: 1.1, ease: "expo.inOut" }, "open+=0.2")
    /* libera a página antes da cortina terminar, para o hero já entrar */
    .add(release, "open+=0.55");

  skip.addEventListener("click", () => {
    tl.kill();
    finish();
  });
}
