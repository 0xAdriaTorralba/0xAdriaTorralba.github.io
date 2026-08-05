export const backVertex = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const backFragment = /* glsl */ `
uniform vec3 uThemeColor;
uniform float uTime;

varying vec2 vUv;

void main() {
  // Fish-scale / roof-tile pattern via staggered circles
  vec2 uv = vUv * vec2(8.0, 10.0);
  float row = floor(uv.y);
  vec2 p = uv;
  p.x += mod(row, 2.0) * 0.5;

  vec2 cell = fract(p) - vec2(0.5, 0.0);
  float d = length(cell);

  float scale = smoothstep(0.52, 0.47, d);

  // Two-tone from theme color
  vec3 dark = uThemeColor * 0.35;
  vec3 mid = uThemeColor * 0.7;

  vec3 color = mix(dark, mid, scale);

  // Thin bright ring on each scale
  float ring = smoothstep(0.50, 0.48, d) - smoothstep(0.48, 0.45, d);
  color += ring * uThemeColor * 0.25;

  // Central emblem circle — brighter disc at card center
  float cx = length(vUv - 0.5) * 2.5;
  float emblem = smoothstep(0.35, 0.30, cx);
  color = mix(color, uThemeColor * 0.9, emblem * 0.5);

  // Outer border frame
  float borderX = smoothstep(0.0, 0.04, vUv.x) * smoothstep(0.0, 0.04, 1.0 - vUv.x);
  float borderY = smoothstep(0.0, 0.03, vUv.y) * smoothstep(0.0, 0.03, 1.0 - vUv.y);
  float border = borderX * borderY;
  color *= mix(1.4, 1.0, border);

  gl_FragColor = vec4(color, 1.0);
}
`;
