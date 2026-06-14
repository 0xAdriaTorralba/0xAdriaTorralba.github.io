import { Deck, DeckState } from "./Deck.js";

// ── DOM refs ──────────────────────────────────────────────
const wrapper = document.getElementById("showcase-wrapper");
const loading = document.getElementById("showcase-loading");

// Guard: show error visually if something blows up
window.addEventListener("error", (e) => {
  if (loading) { loading.textContent = "Error: " + e.message; loading.classList.remove("hidden"); }
});
const detailEl = document.getElementById("showcase-detail");
const detailTitle = document.getElementById("showcase-detail-title");
const detailDate = document.getElementById("showcase-detail-date");
const detailDesc = document.getElementById("showcase-detail-desc");
const detailLinks = document.getElementById("showcase-detail-links");
const detailClose = document.getElementById("showcase-detail-close");

// ── Theme ─────────────────────────────────────────────────
function readThemeColors() {
  const s = getComputedStyle(document.documentElement);
  return {
    bg: s.getPropertyValue("--global-bg-color").trim(),
    card: s.getPropertyValue("--global-card-bg-color").trim(),
    theme: s.getPropertyValue("--global-theme-color").trim(),
    text: s.getPropertyValue("--global-text-color").trim(),
  };
}

// ── Three.js core ─────────────────────────────────────────
const w = wrapper.clientWidth || window.innerWidth;
const h = wrapper.clientHeight || window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(w, h);
renderer.outputColorSpace = THREE.SRGBColorSpace;
wrapper.appendChild(renderer.domElement);

// Lights (needed for edge MeshBasicMaterial visibility; shaders ignore these)
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(2, 3, 4);
scene.add(dirLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

let deck = null;

function applyTheme() {
  const colors = readThemeColors();
  renderer.setClearColor(new THREE.Color(colors.bg));
  if (deck) deck.setThemeColor(colors.theme);
}

const themeObserver = new MutationObserver(applyTheme);
themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

// ── Input state ───────────────────────────────────────────
const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
const mouse = new THREE.Vector2(0, 0);
const raycaster = new THREE.Raycaster();
let hoveredCard = null;

// ── Gyroscope (mobile) ───────────────────────────────────
const gyro = { x: 0, y: 0, active: false };
const gyroTarget = { x: 0, y: 0 };

if (isMobile) {
  const gyroHandler = (e) => {
    if (e.beta == null || e.gamma == null) return;
    gyro.active = true;
    gyroTarget.x = Math.max(-1, Math.min(1, (e.gamma || 0) / 30));
    gyroTarget.y = Math.max(-1, Math.min(1, ((e.beta || 0) - 45) / 30));
  };

  const startGyro = () => {
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((p) => { if (p === "granted") window.addEventListener("deviceorientation", gyroHandler); })
        .catch(() => {});
    } else {
      window.addEventListener("deviceorientation", gyroHandler);
    }
  };

  // iOS requires user gesture — trigger on first touch
  wrapper.addEventListener("touchstart", function onceGyro() {
    startGyro();
    wrapper.removeEventListener("touchstart", onceGyro);
  }, { once: true });
}

// ── Deck ──────────────────────────────────────────────────
const projects = window.__SHOWCASE_PROJECTS__ || [];
deck = new Deck(projects, scene, { mobile: isMobile });
applyTheme();

if (loading) loading.classList.add("hidden");


wrapper.addEventListener("pointermove", (e) => {
  const rect = wrapper.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
});

// ── Mobile swipe + tap ────────────────────────────────────
let tappedCard = null;
const swipe = { startX: 0, startY: 0, startTime: 0, dragging: false };
const SWIPE_THRESHOLD = 30; // px

if (isMobile) {
  wrapper.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    swipe.startX = touch.clientX;
    swipe.startY = touch.clientY;
    swipe.startTime = performance.now();
    swipe.dragging = true;

    // Update mouse for raycasting
    const rect = wrapper.getBoundingClientRect();
    mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
  }, { passive: true });

  wrapper.addEventListener("touchmove", (e) => {
    if (!swipe.dragging || deck.state !== DeckState.CAROUSEL) return;
    const dx = e.touches[0].clientX - swipe.startX;
    // Live drag offset: fraction of screen width → fraction of card spacing
    deck.setCarouselDragOffset(dx / wrapper.clientWidth * 2);
  }, { passive: true });

  wrapper.addEventListener("touchend", (e) => {
    if (!swipe.dragging) return;
    swipe.dragging = false;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - swipe.startX;
    const dy = touch.clientY - swipe.startY;
    const elapsed = performance.now() - swipe.startTime;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Reset drag offset
    deck.setCarouselDragOffset(0);

    if (deck.state === DeckState.CAROUSEL && absDx > SWIPE_THRESHOLD && absDx > absDy) {
      // Horizontal swipe → navigate carousel
      deck.carouselNav(dx < 0 ? 1 : -1);
    } else if (absDx < 15 && absDy < 15 && elapsed < 300) {
      // Tap (not a swipe)
      handleMobileTap();
    }
  });
}

// ── Hover (desktop) + Gyro tilt (mobile) ──────────────────
function updateHover() {
  if (deck.state === DeckState.INTRO) return;

  if (!isMobile) {
    // Desktop: raycaster hover
    raycaster.setFromCamera(mouse, camera);
    const meshes = deck.cards.map((c) => c.mesh);
    const hits = raycaster.intersectObjects(meshes, false);

    let newHovered = null;
    if (hits.length > 0) {
      newHovered = hits[0].object.userData.card || null;
    }

    if (hoveredCard && hoveredCard !== newHovered) {
      hoveredCard.targetHover = 0;
    }

    hoveredCard = newHovered;

    // Lift hovered card, dim others
    const anyHovered = hoveredCard && deck.state === DeckState.SPREAD;
    deck.cards.forEach((card) => {
      if (anyHovered && card === hoveredCard) {
        card.targetHover = 1;
        card.targetLift = 1;
        card.targetDim = 0;
      } else if (anyHovered) {
        card.targetHover = 0;
        card.targetLift = 0;
        card.targetDim = 1;
      } else {
        card.targetHover = 0;
        card.targetLift = 0;
        card.targetDim = 0;
      }
    });

    // Tilt hovered card toward cursor
    if (hoveredCard && deck.state === DeckState.SPREAD && hits[0] && hits[0].uv) {
      const uv = hits[0].uv;
      hoveredCard.mesh.rotation.y = (uv.x - 0.5) * -0.35;
      hoveredCard.mesh.rotation.x = (uv.y - 0.5) * 0.25;
    }

    wrapper.style.cursor = anyHovered ? "pointer" : "default";
  }
}

// ── Mobile tap interaction ────────────────────────────────
function handleMobileTap() {
  if (!isMobile || deck.state === DeckState.INTRO) return;

  if (deck.state === DeckState.CAROUSEL) {
    // Tap current card → focus + detail
    const current = deck.cards[deck.carouselIndex];
    if (current) {
      deck.transitionTo(DeckState.FOCUS, deck.carouselIndex);
      showDetail(current.data);
    }
  } else if (deck.state === DeckState.FOCUS) {
    // Tap → back to carousel
    deck.transitionTo(DeckState.CAROUSEL);
    hideDetail();
  }
}

// ── Click → Focus / Unfocus ───────────────────────────────
wrapper.addEventListener("click", () => {
  if (isMobile) return; // mobile uses touchend handler
  if (deck.state === DeckState.SPREAD && hoveredCard) {
    const idx = deck.cards.indexOf(hoveredCard);
    deck.transitionTo(DeckState.FOCUS, idx);
    showDetail(hoveredCard.data);
  } else if (deck.state === DeckState.FOCUS) {
    deck.transitionTo(DeckState.SPREAD);
    hideDetail();
  }
});

if (detailClose) {
  detailClose.addEventListener("click", (e) => {
    e.stopPropagation();
    deck.transitionTo(DeckState.SPREAD);
    hideDetail();
  });
}

// ── Detail overlay ────────────────────────────────────────
function showDetail(data) {
  if (!detailEl) return;
  detailTitle.textContent = data.title || "";
  detailDate.textContent = data.date || "";
  detailDesc.textContent = data.description || "";

  detailLinks.innerHTML = "";
  if (data.github) {
    detailLinks.innerHTML += `<a href="${data.github}" target="_blank" rel="noopener" title="GitHub"><i class="fa-brands fa-github"></i></a>`;
  }
  if (data.demo) {
    detailLinks.innerHTML += `<a href="${data.demo}" target="_blank" rel="noopener" title="Demo"><i class="fa-solid fa-play"></i></a>`;
  }
  if (data.twitter) {
    detailLinks.innerHTML += `<a href="${data.twitter}" target="_blank" rel="noopener" title="Twitter"><i class="fa-brands fa-x-twitter"></i></a>`;
  }
  if (data.url) {
    detailLinks.innerHTML += `<a href="${data.url}" title="Details"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
  }

  detailEl.classList.add("visible");
}

function hideDetail() {
  if (detailEl) detailEl.classList.remove("visible");
}

// ── Resize ────────────────────────────────────────────────
window.addEventListener("resize", () => {
  camera.aspect = wrapper.clientWidth / wrapper.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
});

// ── Parallax ──────────────────────────────────────────────
const baseCamPos = camera.position.clone();
const parallaxStrength = 0.15;

// ── Render loop ───────────────────────────────────────────
let prev = 0;

function animate(t) {
  const time = t * 0.001;
  const dt = prev ? time - prev : 0.016;
  prev = time;

  updateHover();

  if (isMobile && gyro.active) {
    // Smooth gyro
    gyro.x += (gyroTarget.x - gyro.x) * Math.min(1, dt * 5);
    gyro.y += (gyroTarget.y - gyro.y) * Math.min(1, dt * 5);
    // Gyro parallax
    camera.position.x = baseCamPos.x + gyro.x * parallaxStrength;
    camera.position.y = baseCamPos.y - gyro.y * parallaxStrength * 0.5;
    // Gyro tilt all cards
    deck.cards.forEach((card) => {
      if (card.lift < 0.1 && (deck.state === DeckState.SPREAD || deck.state === DeckState.CAROUSEL)) {
        card.mesh.rotation.y = gyro.x * 0.25;
        card.mesh.rotation.x = gyro.y * 0.15;
      }
    });
  } else {
    // Desktop mouse parallax
    camera.position.x = baseCamPos.x + mouse.x * parallaxStrength;
    camera.position.y = baseCamPos.y + mouse.y * parallaxStrength * 0.5;
  }

  deck.update(time, dt);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
