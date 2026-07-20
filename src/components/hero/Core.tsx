"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "@/three/CoreMaterial";
import type { CoreMaterialInstance } from "@/three/CoreMaterial";
import { scrollState } from "@/lib/scrollStore";

const SHARD_ACCENTS = ["#3d5afe", "#7b93ff", "#1d1d1f", "#6e6e73"];

// Target positions the four shards fly out to as the hero fractures on
// scroll — loosely lined up with the four-item services grid beneath it.
const SHARD_TARGETS: [number, number, number][] = [
  [-1.7, 1.05, 0.4],
  [1.7, 1.05, -0.3],
  [-1.7, -1.05, -0.4],
  [1.7, -1.05, 0.3],
];

function Shard({
  index,
  reducedMotion,
}: {
  index: number;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<CoreMaterialInstance>(null);
  const target = SHARD_TARGETS[index];

  useFrame((_, delta) => {
    const progress = reducedMotion ? 0 : scrollState.heroProgress;
    const eased = progress * progress * (3 - 2 * progress); // smoothstep

    if (meshRef.current) {
      meshRef.current.position.lerp(
        new THREE.Vector3(target[0] * eased, target[1] * eased, target[2] * eased),
        1
      );
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
      const s = 0.32 * eased;
      meshRef.current.scale.setScalar(s);
    }
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      materialRef.current.uOpacity = eased;
    }
  });

  return (
    <mesh ref={meshRef} scale={0}>
      <octahedronGeometry args={[1, 1]} />
      <coreMaterial
        ref={materialRef}
        transparent
        uColorA={new THREE.Color("#1d1d1f")}
        uColorB={new THREE.Color(SHARD_ACCENTS[index])}
        uColorRim={new THREE.Color("#7b93ff")}
        uAmplitude={0.06}
        uRimStrength={0.8}
      />
    </mesh>
  );
}

export function Core({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<CoreMaterialInstance>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.15, 4), []);

  useFrame((state, delta) => {
    const progress = reducedMotion ? 0 : scrollState.heroProgress;
    const eased = progress * progress * (3 - 2 * progress);

    if (!reducedMotion) {
      pointer.current.x = state.pointer.x;
      pointer.current.y = state.pointer.y;
    }

    if (groupRef.current) {
      const baseRotationY = state.clock.elapsedTime * 0.12;
      groupRef.current.rotation.y +=
        (baseRotationY - groupRef.current.rotation.y + pointer.current.x * 0.4) * 0.04;
      groupRef.current.rotation.x +=
        (pointer.current.y * -0.3 - groupRef.current.rotation.x) * 0.04;
    }

    if (coreMeshRef.current) {
      const scale = 1 - eased * 0.7;
      coreMeshRef.current.scale.setScalar(scale);
    }

    if (materialRef.current) {
      materialRef.current.uTime += delta;
      materialRef.current.uAmplitude = 0.1 + eased * 0.18;
      materialRef.current.uRimStrength = 0.5 + eased * 0.9;
      materialRef.current.uOpacity = 1 - eased;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreMeshRef} geometry={geometry}>
        <coreMaterial
          ref={materialRef}
          transparent
          uColorA={new THREE.Color("#1d1d1f")}
          uColorB={new THREE.Color("#3d5afe")}
          uColorRim={new THREE.Color("#7b93ff")}
        />
      </mesh>
      {SHARD_TARGETS.map((_, i) => (
        <Shard key={i} index={i} reducedMotion={reducedMotion} />
      ))}
    </group>
  );
}
