import { shaderMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo } from "react";
import * as THREE from "three";

const toColor = (c: { r: number; g: number; b: number }) =>
  new THREE.Color(c.r / 255, c.g / 255, c.b / 255);

const gradientUniforms = {
  uTime: 0,
  uResolution: new THREE.Vector2(1, 1),
  uAnimSpeed: 0.66,
  uNoiseSpeed: 0,
  uRotationAmount: 172,
  uWaveFreq: 3.7,
  uWaveAmp: 43,
  uWaveSpeed: 0.037,
  uWaveFreqY: 7.5,
  uWaveAmpY: 60,
  uColor1: toColor({ r: 78, g: 130, b: 78 }),
  uColor2: toColor({ r: 233, g: 150, b: 115 }),
  uColor3: toColor({ r: 196, g: 130, b: 100 }),
  uColor4: toColor({ r: 220, g: 210, b: 195 }),
  uGradientAngle: 60,
  uGradientSmooth1: 0.5,
  uGradientSmooth2: 0.5,
  uGradientPos1: -0.2,
  uGradientPos2: -0.4,
  uGradientMixPos: 0.6,
  uDarkPulseSpeed: 0.08,
  uDarkPulseAmount: 0.3,
  uDarkScale1: 0.15,
  uDarkSpeed1: 0.015,
  uDarkIntensity1: 1.1,
  uDarkThreshold1: -0.8,
  uDarkPower1: 3,
  uDarkScale2: 0.1,
  uDarkSpeed2: 0.012,
  uDarkIntensity2: 0.4,
  uDarkThreshold2: -0.4,
  uDarkPower2: 0.8,
  uDarkScale3: 0.12,
  uDarkSpeed3: 0.02,
  uDarkIntensity3: 1.2,
  uDarkThreshold3: -0.7,
  uDarkPower3: 2.5,
  uSaturation: 1,
  uTemperature: -0.2,
  uHue: 0,
  uGamma: 1,
  uBrightness: 0,
  uContrast: 1.3,
  uBlackLevel: 0.15,
  uWhiteLevel: 0.75,
  uGrainAmount: 0.06,
  uGrainSize: 0.45,
  uGrainSeed: new THREE.Vector2(),
};

const FullscreenVertexShader = `
precision highp float;
precision highp int;

varying vec2 vUv;

void main() {
  gl_Position = vec4(position, 1.0);
  vUv = gl_Position.xy * 0.5 + 0.5;
}
`;

const GradientFragmentShader = `
precision mediump float;

uniform float uTime;
uniform vec2  uResolution;

uniform float uAnimSpeed;
uniform float uNoiseSpeed;
uniform float uRotationAmount;

uniform float uWaveFreq;
uniform float uWaveAmp;
uniform float uWaveSpeed;
uniform float uWaveFreqY;
uniform float uWaveAmpY;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

uniform float uGradientAngle;
uniform float uGradientSmooth1;
uniform float uGradientSmooth2;
uniform float uGradientPos1;
uniform float uGradientPos2;
uniform float uGradientMixPos;

uniform float uDarkScale1;
uniform float uDarkScale2;
uniform float uDarkScale3;
uniform float uDarkSpeed1;
uniform float uDarkSpeed2;
uniform float uDarkSpeed3;
uniform float uDarkIntensity1;
uniform float uDarkIntensity2;
uniform float uDarkIntensity3;
uniform float uDarkThreshold1;
uniform float uDarkThreshold2;
uniform float uDarkThreshold3;
uniform float uDarkPower1;
uniform float uDarkPower2;
uniform float uDarkPower3;
uniform float uDarkPulseSpeed;
uniform float uDarkPulseAmount;

uniform float uGrainAmount;
uniform float uGrainSize;
uniform vec2  uGrainSeed;

uniform float uSaturation;
uniform float uTemperature;
uniform float uHue;
uniform float uGamma;
uniform float uBrightness;
uniform float uContrast;
uniform float uBlackLevel;
uniform float uWhiteLevel;

varying vec2 vUv;

mat2 Rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
  return fract(sin(p) * 43758.5453);
}

float noise(in vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float n = mix(
    mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0)), f - vec2(0.0)),
        dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y);
  return 0.5 + 0.5 * n;
}

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m *= m;
  m *= m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p, float oct) {
  float v = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (float i = 0.0; i < 4.0; i++) {
    if (i >= oct) break;
    v += amp * snoise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return v;
}

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 adjustSaturation(vec3 color, float saturation) {
  vec3 gray = vec3(dot(color, vec3(0.299, 0.587, 0.114)));
  return mix(gray, color, saturation);
}

vec3 adjustTemperature(vec3 color, float temp) {
  vec3 warm = vec3(1.0 + temp * 0.1, 1.0, 1.0 - temp * 0.2);
  vec3 cool = vec3(1.0 + temp * 0.2, 1.0, 1.0 - temp * 0.1);
  return color * (temp > 0.0 ? warm : cool);
}

vec3 adjustHue(vec3 color, float hueShift) {
  vec3 hsv = rgb2hsv(color);
  hsv.x = fract(hsv.x + hueShift / 360.0);
  return hsv2rgb(hsv);
}

vec3 adjustLevels(vec3 color, float blackLevel, float whiteLevel) {
  return (color - blackLevel) / max(1e-5, (whiteLevel - blackLevel));
}

void main() {
  vec2 uv = vUv;
  float ratio = uResolution.x / uResolution.y;
  vec2 tuv = uv - 0.5;
  vec3 lightFloor = vec3(0.92, 0.94, 0.96);

  float deg = noise(vec2(uTime * uNoiseSpeed, tuv.x * tuv.y));
  tuv.y *= 1.0 / ratio;
  float rotAngle = radians((deg - 0.5) * uRotationAmount + 180.0);
  tuv *= Rot(rotAngle);
  tuv.y *= ratio;

  float spd = uTime * uWaveSpeed;
  tuv.x += sin(tuv.y * uWaveFreq + spd) / uWaveAmp;
  tuv.y += sin(tuv.x * uWaveFreqY + spd) / uWaveAmpY;

  float gradA = radians(uGradientAngle);
  mat2 rot = Rot(gradA);
  float gx = (tuv * rot).x;
  vec3 layer1 = mix(uColor1, uColor2, smoothstep(uGradientPos1, uGradientPos1 + uGradientSmooth1, gx));
  vec3 layer2 = mix(uColor3, uColor4, smoothstep(uGradientPos2, uGradientPos2 + uGradientSmooth2, gx));
  float t = 1.0 - smoothstep(uGradientMixPos - 0.8, uGradientMixPos, tuv.y);
  vec3 color = mix(layer1, layer2, t);

  color = adjustTemperature(color, uTemperature);
  color = adjustHue(color, uHue);
  color = adjustSaturation(color, uSaturation);
  color = adjustLevels(color, uBlackLevel, uWhiteLevel);
  color += uBrightness;
  color = (color - 0.5) * uContrast + 0.5;
  color = pow(max(color, 0.0), vec3(1.0 / uGamma));
  color = clamp(color, 0.0, 1.0);

  vec2 st = uv * 2.0 - 1.0;
  st.x *= ratio;
  float time = uTime * uAnimSpeed;

  float dn = fbm(st * uDarkScale1 + vec2(time * uDarkSpeed1, -time * uDarkSpeed1 * 0.7), 2.0);
  float pulse = sin(time * uDarkPulseSpeed) * uDarkPulseAmount;
  float dark = smoothstep(uDarkThreshold1 + pulse, uDarkThreshold1 + 0.8 + pulse, dn);
  dark = pow(dark, uDarkPower1);
  color = mix(lightFloor, color, mix(1.0, dark, uDarkIntensity1));

  float ldn = fbm(st * uDarkScale2 + vec2(-time * uDarkSpeed2, time * uDarkSpeed2 * 0.7), 1.0);
  float lp = cos(time * uDarkPulseSpeed * 0.75) * uDarkPulseAmount * 0.7;
  float ld = smoothstep(uDarkThreshold2 + lp, uDarkThreshold2 + 0.6 + lp, ldn);
  ld = pow(ld, uDarkPower2);
  color *= mix(1.0, ld, uDarkIntensity2) * 0.3 + 0.7;

  float odn = fbm(st * uDarkScale3 + vec2(-time * uDarkSpeed3, time * uDarkSpeed3 * 0.75) + 500.0, 1.0);
  float op = sin(time * uDarkPulseSpeed * 1.5 + 1.57) * uDarkPulseAmount * 0.8;
  float od = smoothstep(uDarkThreshold3 + op, uDarkThreshold3 + 0.6 + op, odn);
  od = pow(od, uDarkPower3);
  color = mix(lightFloor, color, mix(1.0, od, uDarkIntensity3));

  float grainScale = mix(1.0, 12.0, clamp(uGrainSize, 0.0, 1.0));
  float grain_noise = (hash12(gl_FragCoord.xy / grainScale) - 0.5) * 2.0;
  color.rgb += grain_noise * uGrainAmount;
  color = clamp(color, 0.0, 1.0);
  color = mix(lightFloor, color, 0.9);

  gl_FragColor = vec4(color, 1.0);
}
`;

const GradientMaterial = shaderMaterial(
  gradientUniforms,
  FullscreenVertexShader,
  GradientFragmentShader
);

type GradientMaterialImpl = THREE.ShaderMaterial & {
  uniforms: typeof gradientUniforms;
};

const GradientMaterialCtor = GradientMaterial as unknown as {
  new(): GradientMaterialImpl;
};

function useGradientMaterial() {
  const material = useMemo(() => new GradientMaterialCtor(), []);
  const size = useThree((state) => state.size);

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    ((material.uniforms.uResolution as unknown) as THREE.IUniform<THREE.Vector2>).value.set(size.width, size.height);
  }, [material, size]);

  return material;
}

function AnimatedGradientPlane() {
  const material = useGradientMaterial();
  const clock = useThree((state) => state.clock);
  const materialRef = React.useRef(material);

  useEffect(() => {
    ((materialRef.current.uniforms.uAnimSpeed as unknown) as THREE.IUniform<number>).value = 5;
  }, []);

  useFrame(() => {
    ((materialRef.current.uniforms.uTime as unknown) as THREE.IUniform<number>).value = clock.getElapsedTime();
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function StaticGradientPlane() {
  const material = useGradientMaterial();
  const invalidate = useThree((state) => state.invalidate);
  const staticTime = useMemo(() => 845, []);
  const materialRef = React.useRef(material);

  useEffect(() => {
    ((materialRef.current.uniforms.uTime as unknown) as THREE.IUniform<number>).value = staticTime;
    invalidate();
  }, [staticTime, invalidate]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default function GradientBackground({
  isStatic = false,
}: {
  isStatic?: boolean;
}) {
  const PlaneComponent = isStatic ? StaticGradientPlane : AnimatedGradientPlane;

  return (
    <div
      className={`gradient-background ${isStatic ? "gradient-background--static" : "gradient-background--animated"
        }`}
    >
      <Canvas
        gl={{ antialias: true }}
        dpr={[1, 2]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1, near: 0, far: 10 }}
        frameloop={isStatic ? "demand" : "always"}
      >
        <PlaneComponent />
      </Canvas>
    </div>
  );
}
