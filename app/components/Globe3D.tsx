"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

function EarthGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [earthTexture, cloudsTexture] = useLoader(TextureLoader, [
    "/earth.jpg",
    "/clouds.png",
  ]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) meshRef.current.rotation.y = t * 0.1;
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.12;
      cloudsRef.current.rotation.x = t * 0.01;
    }
  });

  return (
    <>
      {/* Bumi */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.5}
          metalness={0}
        />
      </mesh>

      {/* Awan */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.63, 64, 64]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[1.75, 64, 64]} />
        <meshStandardMaterial
          color="#4fc3f7"
          transparent={true}
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

function FallbackGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.6, 32, 32]} />
      <meshStandardMaterial color="#4fc3f7" />
    </mesh>
  );
}

export default function Globe3D() {
  return (
   <div style={{ width: "100%", height: "clamp(260px, 40vw, 420px)", position: "relative" }}>
  <Canvas
    camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Pencahayaan terang dari semua sisi */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={1.0} color="#ffffff" />
        <directionalLight position={[0, 5, 0]} intensity={1.0} color="#ffffff" />
        <directionalLight position={[0, -5, 0]} intensity={0.8} color="#ffffff" />

        <Stars radius={20} depth={50} count={600} factor={3} saturation={1} fade speed={0.5} />

        <Suspense fallback={<FallbackGlobe />}>
          <EarthGlobe />
        </Suspense>
      </Canvas>
    </div>
  );
}