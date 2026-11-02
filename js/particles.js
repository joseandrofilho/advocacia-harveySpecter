/* ==========================================================================
   PARTÍCULAS DO HERO — poeira dourada em 3D (Three.js) subindo devagar,
   com profundidade real e leve parallax do mouse.
   Só renderiza enquanto o hero está visível.
   ========================================================================== */

const PARTICLES = {
  countDesktop: 360,
  countMobile: 140,
  rangeX: 36,   // espalhamento horizontal
  rangeY: 20,   // metade da altura do "tanque" de partículas
  depthNear: 10,
  depthFar: -16,
  bokehRatio: 0.06, // fração de partículas grandes e desfocadas
};

const particleVertexShader = /* glsl */ `
  attribute float aSeed;
  attribute float aSize;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uRange;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float speed = 0.5 + aSeed * 0.9;

    // sobe e volta para baixo ao sair do topo
    p.y = mod(position.y + uTime * speed + uRange, uRange * 2.0) - uRange;
    p.x += sin(uTime * 0.25 + aSeed * 6.2831) * 1.4;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (30.0 / -mv.z);

    // some suavemente nas bordas e cintila
    float edge = smoothstep(-uRange, -uRange + 6.0, p.y) * (1.0 - smoothstep(uRange - 6.0, uRange, p.y));
    float twinkle = 0.35 + 0.65 * abs(sin(uTime * 0.7 + aSeed * 40.0));
    vAlpha = edge * twinkle;
  }
`;

const particleFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, glow * glow * vAlpha);
  }
`;

function initParticles(canvas) {
  if (prefersReducedMotion || typeof THREE === "undefined") {
    canvas.remove();
    return;
  }

  const hero = canvas.parentElement;
  const count = window.innerWidth < 640 ? PARTICLES.countMobile : PARTICLES.countDesktop;
  const champ = getComputedStyle(document.documentElement).getPropertyValue("--champ").trim();

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 1, 100);
  camera.position.z = 30;

  /* Geometria: posição, semente aleatória e tamanho por partícula */
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const rand = (min, max) => min + Math.random() * (max - min);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = rand(-PARTICLES.rangeX, PARTICLES.rangeX);
    positions[i * 3 + 1] = rand(-PARTICLES.rangeY, PARTICLES.rangeY);
    positions[i * 3 + 2] = rand(PARTICLES.depthFar, PARTICLES.depthNear);
    seeds[i] = Math.random();
    sizes[i] = Math.random() < PARTICLES.bokehRatio ? rand(14, 22) : rand(2, 6);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uRange: { value: PARTICLES.rangeY },
      uColor: { value: new THREE.Color(champ) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  scene.add(new THREE.Points(geometry, material));

  /* Parallax do mouse: a câmera persegue o ponteiro com suavização */
  const pointer = { x: 0, y: 0 };
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = hero;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  /* Loop: só roda com o hero na tela */
  let visible = true;
  let frame = null;
  const start = performance.now();

  const render = () => {
    material.uniforms.uTime.value = (performance.now() - start) / 1000;
    camera.position.x += (pointer.x * 2 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 1.5 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    frame = visible ? requestAnimationFrame(render) : null;
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !frame) frame = requestAnimationFrame(render);
  }).observe(hero);
}
