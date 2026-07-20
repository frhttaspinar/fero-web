import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { snoise3D } from "./noise.glsl";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vNoise;

  ${snoise3D}

  void main() {
    vec3 n = normalize(normal);
    float noise = snoise(position * 1.4 + uTime * 0.12);
    vec3 displaced = position + n * noise * uAmplitude;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * n);
    vNoise = noise;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorRim;
  uniform float uRimStrength;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vNoise;

  void main() {
    // Derive a faceted (flat-shaded) normal from screen-space derivatives
    // instead of the smooth per-vertex normal — this is what gives the
    // surface its cut-gem look regardless of how subdivided the mesh is.
    vec3 fdx = dFdx(vViewPosition);
    vec3 fdy = dFdy(vViewPosition);
    vec3 facetNormal = normalize(cross(fdx, fdy));

    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, facetNormal), 0.0), 2.1);

    vec3 lightDir = normalize(vec3(0.5, 0.7, 0.9));
    float diffuse = max(dot(facetNormal, lightDir), 0.0);
    vec3 lightDir2 = normalize(vec3(-0.6, -0.3, 0.6));
    float diffuse2 = max(dot(facetNormal, lightDir2), 0.0) * 0.4;
    float shade = 0.35 + diffuse * 0.75 + diffuse2;

    vec3 base = mix(uColorA, uColorB, vNoise * 0.5 + 0.5);
    vec3 color = base * shade;
    color = mix(color, uColorRim, fresnel * 0.85);
    color += uColorRim * fresnel * uRimStrength;

    gl_FragColor = vec4(color, uOpacity);
  }
`;

export const CoreMaterial = shaderMaterial(
  {
    uTime: 0,
    uAmplitude: 0.12,
    uColorA: new THREE.Color("#1d1d1f"),
    uColorB: new THREE.Color("#3d5afe"),
    uColorRim: new THREE.Color("#7b93ff"),
    uRimStrength: 0.6,
    uOpacity: 1,
  },
  vertexShader,
  fragmentShader
);

extend({ CoreMaterial });

export type CoreMaterialInstance = InstanceType<typeof CoreMaterial>;

declare module "@react-three/fiber" {
  interface ThreeElements {
    coreMaterial: Partial<CoreMaterialInstance> & {
      ref?: React.Ref<CoreMaterialInstance>;
      transparent?: boolean;
      side?: THREE.Side;
      key?: string;
    };
  }
}
