/* eslint-disable react/no-unknown-property -- React Three Fiber uses Three.js JSX properties. */
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import type { Mesh } from 'three';

export function Box({ spinning }: { spinning: boolean }) {
  const mesh = useRef<Mesh>(null);
  const [active, setActive] = useState(false);

  // Delta is elapsed seconds, so rotation stays consistent at any frame rate.
  useFrame((_, delta) => {
    if (!mesh.current || !spinning) return;
    mesh.current.rotation.x += delta * 0.35;
    mesh.current.rotation.y += delta * 0.6;
  });

  return (
    <mesh
      ref={mesh}
      rotation={[0.4, 0.6, 0]}
      scale={active ? 1.3 : 1}
      onClick={(event) => {
        event.stopPropagation();
        setActive((value) => !value);
      }}
    >
      {/* Width, height, and depth in scene units. */}
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshStandardMaterial
        color={active ? '#f97316' : '#8b5cf6'}
        roughness={0.35}
      />
    </mesh>
  );
}
