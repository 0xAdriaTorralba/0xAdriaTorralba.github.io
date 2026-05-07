export const frontVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const frontFragment = /* glsl */ `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uHover;
uniform float uDim;
uniform bool uHasTexture;
uniform vec3 uFallbackA;
uniform vec3 uFallbackB;

varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vNormal;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec3 baseColor;
  if (uHasTexture) {
    baseColor = texture2D(uTexture, vUv).rgb;
  } else {
    baseColor = mix(uFallbackA, uFallbackB, vUv.y);
  }

  // Fresnel for holographic foil
  vec3 viewDir = normalize(cameraPosition - vWorldPos);
  float fresnel = 1.0 - abs(dot(viewDir, vNormal));
  fresnel = pow(fresnel, 2.5);

  // Iridescent rainbow mapped to UV + view angle
  float hue = fract(
    vUv.x * 1.5 + vUv.y * 1.0 +
    fresnel * 0.8 +
    uTime * 0.05
  );
  vec3 rainbow = hsv2rgb(vec3(hue, 0.65, 1.0));

  // Animated light streak sweeping diagonally
  float streakPos = fract(uTime * 0.1) * 3.0 - 0.5;
  float streak = smoothstep(0.08, 0.0, abs(vUv.x + vUv.y * 0.7 - streakPos));

  // Compose foil over image — visible even at rest
  float foilStrength = mix(0.15, 0.5, uHover) * fresnel;
  vec3 color = mix(baseColor, rainbow, foilStrength);
  color += streak * vec3(1.0) * mix(0.12, 0.4, uHover);

  // Subtle vignette (lighter)
  float vig = 1.0 - 0.15 * length((vUv - 0.5) * 1.6);
  color *= vig;

  // Dim non-hovered cards when another card is hovered
  color = mix(color, color * 0.35, uDim);

  gl_FragColor = vec4(color, 1.0);
}
`;
