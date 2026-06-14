import { frontVertex, frontFragment } from "./shaders/front.glsl.js";
import { backVertex, backFragment } from "./shaders/back.glsl.js";

const CARD_W = 1.0;
const CARD_H = 1.4;
const CARD_D = 0.03;
const CORNER_R = 0.06;
const CORNER_SEGS = 8;

function roundedRectShape(w, h, r) {
  const s = new THREE.Shape();
  s.moveTo(r, 0);
  s.lineTo(w - r, 0);
  s.quadraticCurveTo(w, 0, w, r);
  s.lineTo(w, h - r);
  s.quadraticCurveTo(w, h, w - r, h);
  s.lineTo(r, h);
  s.quadraticCurveTo(0, h, 0, h - r);
  s.lineTo(0, r);
  s.quadraticCurveTo(0, 0, r, 0);
  return s;
}

const uvGen = {
  generateTopUV(_geo, verts, a, b, c) {
    return [
      new THREE.Vector2(verts[a * 3] / CARD_W, verts[a * 3 + 1] / CARD_H),
      new THREE.Vector2(verts[b * 3] / CARD_W, verts[b * 3 + 1] / CARD_H),
      new THREE.Vector2(verts[c * 3] / CARD_W, verts[c * 3 + 1] / CARD_H),
    ];
  },
  generateSideWallUV(_geo, verts, a, b, c, d) {
    return [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ];
  },
};

let sharedGeometry = null;

function getGeometry() {
  if (sharedGeometry) return sharedGeometry;
  const shape = roundedRectShape(CARD_W, CARD_H, CORNER_R);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: CARD_D,
    bevelEnabled: true,
    bevelSize: 0.008,
    bevelThickness: 0.005,
    bevelSegments: 3,
    curveSegments: CORNER_SEGS,
    UVGenerator: uvGen,
  });
  // Center the geometry on its origin
  geo.translate(-CARD_W / 2, -CARD_H / 2, -CARD_D / 2);
  geo.computeVertexNormals();

  // Reassign material indices: sides=2, front image=0, back pattern=1
  // ExtrudeGeometry: groups[0]=sides, groups[1]=cap at z=0 (normals -Z, away from camera),
  // groups[2]=cap at z=depth (normals +Z, toward camera).
  // Camera at +Z sees groups[2], so that cap gets the front image shader.
  if (geo.groups.length >= 3) {
    geo.groups[0].materialIndex = 2; // sides → edge
    geo.groups[1].materialIndex = 1; // cap facing away → back pattern
    geo.groups[2].materialIndex = 0; // cap facing camera → front image/foil
  }

  sharedGeometry = geo;
  return geo;
}

const textureLoader = new THREE.TextureLoader();

const cardPalettes = [
  { bg: ["#6d28d9", "#3b0764"], accent: "#c4b5fd" }, // vibrant purple
  { bg: ["#0369a1", "#082f49"], accent: "#7dd3fc" }, // ocean blue
  { bg: ["#b91c1c", "#450a0a"], accent: "#fca5a5" }, // crimson
  { bg: ["#15803d", "#052e16"], accent: "#86efac" }, // emerald
  { bg: ["#a16207", "#422006"], accent: "#fde68a" }, // amber
  { bg: ["#0e7490", "#083344"], accent: "#67e8f9" }, // cyan
  { bg: ["#a21caf", "#4a044e"], accent: "#f0abfc" }, // magenta
];

// Emoji per project (rendered via Twemoji CDN for cross-platform consistency)
const cardIcons = ["⚡", "📱", "🗳️", "🏜️", "🐦", "📊", "🌀"];

function emojiToTwemojiCodepoint(emoji) {
  // Strip variation selectors (U+FE0F) since Twemoji omits them in filenames
  const codes = [];
  for (const ch of emoji) {
    const cp = ch.codePointAt(0);
    if (cp !== 0xfe0f) codes.push(cp.toString(16));
  }
  return codes.join("-");
}

function twemojiUrl(emoji) {
  const cp = emojiToTwemojiCodepoint(emoji);
  return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/72x72/${cp}.png`;
}

function generateCardTexture(title, index) {
  const w = 512;
  const h = Math.round(w * 1.4);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const pal = cardPalettes[index % cardPalettes.length];

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, w * 0.4, h);
  grad.addColorStop(0, pal.bg[0]);
  grad.addColorStop(1, pal.bg[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Radial glow behind icon
  const glow = ctx.createRadialGradient(w / 2, h * 0.35, 10, w / 2, h * 0.35, w * 0.45);
  glow.addColorStop(0, pal.accent + "44");
  glow.addColorStop(0.5, pal.accent + "18");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Subtle grid lines
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let y = 0; y < h; y += 28) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Accent line — thicker, glowing
  ctx.shadowColor = pal.accent;
  ctx.shadowBlur = 8;
  ctx.fillStyle = pal.accent;
  ctx.fillRect(w * 0.12, h * 0.52, w * 0.76, 3);
  ctx.shadowBlur = 0;

  // Title — bigger, bolder
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  // Word wrap
  const words = title.split(" ");
  let line = "";
  let lineY = h * 0.57;
  const maxWidth = w * 0.82;
  const lineHeight = 40;
  for (const word of words) {
    const test = line + (line ? " " : "") + word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, w / 2, lineY);
      line = word;
      lineY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, w / 2, lineY);

  // Corner accents — brighter
  ctx.fillStyle = pal.accent;
  ctx.globalAlpha = 0.6;
  ctx.fillRect(16, 16, 28, 3);
  ctx.fillRect(16, 16, 3, 28);
  ctx.fillRect(w - 44, h - 19, 28, 3);
  ctx.fillRect(w - 19, h - 44, 3, 28);
  ctx.globalAlpha = 1;

  // Accent border glow at bottom
  const bottomGlow = ctx.createLinearGradient(0, h - 60, 0, h);
  bottomGlow.addColorStop(0, "transparent");
  bottomGlow.addColorStop(1, pal.accent + "30");
  ctx.fillStyle = bottomGlow;
  ctx.fillRect(0, h - 60, w, 60);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  // Async-load Twemoji PNG — consistent emoji rendering across platforms
  const icon = cardIcons[index % cardIcons.length];
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const size = 150;
    ctx.drawImage(img, (w - size) / 2, h * 0.32 - size / 2, size, size);
    tex.needsUpdate = true;
  };
  img.onerror = () => {
    // Fallback: draw emoji as text if Twemoji fails to load
    ctx.font = "100px system-ui, -apple-system, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(icon, w / 2, h * 0.32);
    tex.needsUpdate = true;
  };
  img.src = twemojiUrl(icon);

  return tex;
}

const fallbackColors = cardPalettes.map((p) => [new THREE.Color(p.bg[0]), new THREE.Color(p.bg[1])]);

export class Card {
  constructor(projectData, index) {
    this.data = projectData;
    this.index = index;
    this.hover = 0;
    this.targetHover = 0;
    this.lift = 0;
    this.targetLift = 0;
    this.dim = 0;
    this.targetDim = 0;

    const geo = getGeometry();

    // Front material
    this.frontUniforms = {
      uTexture: { value: null },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uDim: { value: 0 },
      uHasTexture: { value: false },
      uFallbackA: { value: fallbackColors[index % fallbackColors.length][0] },
      uFallbackB: { value: fallbackColors[index % fallbackColors.length][1] },
    };

    const frontMat = new THREE.ShaderMaterial({
      vertexShader: frontVertex,
      fragmentShader: frontFragment,
      uniforms: this.frontUniforms,
      side: THREE.FrontSide,
    });

    // Back material
    this.backUniforms = {
      uThemeColor: { value: new THREE.Color(0x7047eb) },
      uTime: { value: 0 },
    };

    const backMat = new THREE.ShaderMaterial({
      vertexShader: backVertex,
      fragmentShader: backFragment,
      uniforms: this.backUniforms,
      side: THREE.FrontSide,
    });

    // Edge material
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0x1a1a2e });

    this.mesh = new THREE.Mesh(geo, [frontMat, backMat, edgeMat]);
    this.mesh.userData.card = this;

    // Load texture: real image or procedurally generated card face
    if (projectData.image) {
      textureLoader.load(projectData.image, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        this.frontUniforms.uTexture.value = tex;
        this.frontUniforms.uHasTexture.value = true;
      });
    } else {
      const tex = generateCardTexture(projectData.title, index);
      this.frontUniforms.uTexture.value = tex;
      this.frontUniforms.uHasTexture.value = true;
    }
  }

  setThemeColor(hex) {
    this.backUniforms.uThemeColor.value.set(hex);
  }

  update(time, dt) {
    this.frontUniforms.uTime.value = time;
    this.backUniforms.uTime.value = time;

    const lerp = Math.min(1, dt * 8);
    this.hover += (this.targetHover - this.hover) * lerp;
    this.lift += (this.targetLift - this.lift) * lerp;
    this.dim += (this.targetDim - this.dim) * lerp;

    this.frontUniforms.uHover.value = this.hover;
    this.frontUniforms.uDim.value = this.dim;

    // Scale pop + Z lift on hover (renders in front of neighbors)
    const s = 1 + this.lift * 0.12;
    this.mesh.scale.set(s, s, s);
    this.mesh.renderOrder = this.lift > 0.1 ? 10 : 0;
  }
}
