/* ==========================================================================
   MARTELO — monta o SVG a partir do <template> e anima a batida.
   Usado na abertura e no contato.
   ========================================================================== */

const GAVEL_PIVOT = "238 120"; // ponta do cabo, centro da rotação
const GAVEL_SPARK_ANGLES = [-168, -140, -112, -68, -40, -12];

/* Clona o template para dentro de um [data-gavel] e cria as faíscas */
function mountGavel(slot) {
  const template = $("#gavel-template");
  slot.append(template.content.cloneNode(true));

  const sparks = $(".gavel__sparks", slot);
  GAVEL_SPARK_ANGLES.forEach((angle) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "18");
    line.setAttribute("x2", "18");
    line.setAttribute("y1", "0");
    line.setAttribute("y2", "0");
    line.setAttribute("transform", `rotate(${angle})`);
    sparks.append(line);
  });

  return $(".gavel", slot);
}

/* Timeline da batida: levanta, desce, impacto (clarão, ondas, faíscas, tremor) */
function strikeGavel(gavel, { shakeTarget = gavel, onImpact } = {}) {
  const hammer = $(".gavel__hammer", gavel);
  const flash = $(".gavel__flash", gavel);
  const waves = $$(".gavel__wave", gavel);
  const sparks = $$(".gavel__sparks line", gavel);

  const tl = gsap.timeline();

  tl.to(hammer, { rotation: 34, svgOrigin: GAVEL_PIVOT, duration: 0.55, ease: "power2.out" })
    .to(hammer, { rotation: -2, svgOrigin: GAVEL_PIVOT, duration: 0.16, ease: "power4.in" })
    .addLabel("impact")
    .add(() => onImpact && onImpact(), "impact")
    .to(hammer, { rotation: 5, svgOrigin: GAVEL_PIVOT, duration: 0.12, ease: "power2.out" }, "impact")
    .to(hammer, { rotation: 0, svgOrigin: GAVEL_PIVOT, duration: 0.5, ease: "bounce.out" })
    .fromTo(flash, { opacity: 0, scale: 0.4 }, { opacity: 0.85, scale: 1, duration: 0.08, ease: "none" }, "impact")
    .to(flash, { opacity: 0, duration: 0.6, ease: "power2.out" }, "impact+=0.08")
    .fromTo(
      waves,
      { opacity: 0.8, scale: 0.35, transformOrigin: "50% 50%" },
      { opacity: 0, scale: 2.4, duration: 0.9, ease: "power3.out", stagger: 0.12 },
      "impact"
    )
    .fromTo(
      sparks,
      { opacity: 1, attr: { x1: 18, x2: 18 } },
      { attr: { x1: 34, x2: 52 }, duration: 0.35, ease: "power3.out" },
      "impact"
    )
    .to(sparks, { opacity: 0, duration: 0.25 }, "impact+=0.2")
    .fromTo(
      shakeTarget,
      { x: 0, y: 0 },
      {
        keyframes: [
          { x: -6, y: 3 },
          { x: 5, y: -2 },
          { x: -3, y: 1 },
          { x: 0, y: 0 },
        ],
        duration: 0.32,
        ease: "none",
      },
      "impact"
    );

  return tl;
}
