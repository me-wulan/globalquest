"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── Shared helpers ───────────────────────────────────────────────────────────

function OrbitRing({ radius, color, speed, tilt, opacity = 0.75 }: {
  radius: number; color: string; speed: number; tilt: number; opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.018, 8, 80]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={opacity} />
    </mesh>
  );
}

function GlowSphere({ radius, color, opacity = 0.12 }: { radius: number; color: string; opacity?: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} transparent opacity={opacity} side={THREE.BackSide} />
    </mesh>
  );
}

// ─── PBB — Globe + olive branches (like UN emblem) ───────────────────────────

function OliveBranch({ side }: { side: "left" | "right" }) {
  const flip = side === "right" ? -1 : 1;
  const leaves = 6;
  return (
    <group rotation={[0, 0, flip * 0.3]}>
      {/* Stem */}
      <mesh position={[flip * 0.9, -0.5, 0]} rotation={[0, 0, flip * 0.6]}>
        <cylinderGeometry args={[0.025, 0.025, 1.1, 8]} />
        <meshStandardMaterial color="#4a8c3f" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Leaves */}
      {Array.from({ length: leaves }).map((_, i) => {
        const t = i / (leaves - 1);
        const y = -0.9 + t * 1.0;
        const x = flip * (0.45 + Math.sin(t * Math.PI) * 0.3);
        const rot = flip * (0.8 + t * 0.3);
        return (
          <mesh key={i} position={[x, y, 0.05]} rotation={[0.1, 0, rot]}>
            <ellipseCurve />
            <sphereGeometry args={[0.09, 8, 6]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#5aad4e" : "#4a9040"} metalness={0.2} roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

export function PBBObject() {
  const globeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) globeRef.current.rotation.y = t * 0.35;
    if (groupRef.current) groupRef.current.position.y = Math.sin(t * 0.7) * 0.12;
  });

  // Latitude lines
  const latLines = [-0.6, -0.3, 0, 0.3, 0.6];
  // Longitude lines count
  const lonCount = 8;

  return (
    <group ref={groupRef}>
      {/* Main globe - UN blue */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial
          color="#4B9CD3"
          metalness={0.2}
          roughness={0.4}
          emissive="#1a5fa0"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Latitude rings on globe */}
      {latLines.map((y, i) => {
        const r = Math.sqrt(1.1 * 1.1 - y * y) * 1.01;
        return (
          <mesh key={i} position={[0, y * 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.012, 6, 48]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.35} />
          </mesh>
        );
      })}

      {/* Longitude arcs */}
      {Array.from({ length: lonCount }).map((_, i) => (
        <mesh key={i} rotation={[0, (i / lonCount) * Math.PI, 0]}>
          <torusGeometry args={[1.112, 0.010, 6, 48, Math.PI]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Atmosphere */}
      <GlowSphere radius={1.22} color="#6EC6FF" opacity={0.13} />

      {/* Olive branches - UN style */}
      <group position={[0, -0.85, 1.0]} rotation={[-0.2, 0, 0]}>
        <OliveBranch side="left" />
        <OliveBranch side="right" />
      </group>

      {/* Outer glow ring */}
      <OrbitRing radius={1.55} color="#6EC6FF" speed={0.3} tilt={Math.PI / 2} opacity={0.4} />

      <pointLight color="#6EC6FF" intensity={2.5} distance={5} />
      <pointLight position={[3, 2, 2]} color="#ffffff" intensity={1.2} distance={6} />
    </group>
  );
}

// ─── ASEAN — 10 stalks of paddy/rice melingkar (logo asli) ───────────────────

function PaddyStalk({ angle, radius }: { angle: number; radius: number }) {
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const rotY = -angle + Math.PI / 2;

  // Each stalk: stem + grains
  const grainCount = 7;
  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
      {/* Main stem - curves outward from center */}
      <mesh rotation={[0.18, 0, 0]}>
        <cylinderGeometry args={[0.022, 0.028, 1.4, 6]} />
        <meshStandardMaterial color="#D4A017" metalness={0.4} roughness={0.3} emissive="#8B6500" emissiveIntensity={0.3} />
      </mesh>
      {/* Grain pods along stem */}
      {Array.from({ length: grainCount }).map((_, i) => {
        const t = i / (grainCount - 1);
        const gy = -0.5 + t * 1.1;
        const side = i % 2 === 0 ? 0.08 : -0.08;
        return (
          <mesh key={i} position={[side, gy, 0]} rotation={[0, 0, side > 0 ? 0.3 : -0.3]}>
            <sphereGeometry args={[0.055, 8, 6]} />
            <meshStandardMaterial
              color={t > 0.6 ? "#FFD700" : "#DAA520"}
              metalness={0.5}
              roughness={0.2}
              emissive="#8B6500"
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function ASEANObject() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.28;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
    }
    if (innerRef.current) innerRef.current.rotation.y = t * 0.5;
  });

  return (
    <group ref={groupRef}>
      {/* Outer red circle - like ASEAN logo background */}
      <mesh>
        <cylinderGeometry args={[1.85, 1.85, 0.08, 64]} />
        <meshStandardMaterial color="#CC0001" metalness={0.3} roughness={0.4} emissive="#880000" emissiveIntensity={0.3} />
      </mesh>

      {/* Blue ring border */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[1.85, 0.1, 8, 64]} />
        <meshStandardMaterial color="#003DA5" emissive="#001a6e" emissiveIntensity={0.4} metalness={0.5} roughness={0.2} />
      </mesh>

      {/* 10 paddy stalks melingkar — inti logo ASEAN */}
      {Array.from({ length: 10 }).map((_, i) => (
        <PaddyStalk
          key={i}
          angle={(i / 10) * Math.PI * 2}
          radius={1.1}
        />
      ))}

      {/* Center sphere */}
      <mesh ref={innerRef} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial color="#FFD700" emissive="#FF9500" emissiveIntensity={0.6} metalness={0.8} roughness={0.05} />
      </mesh>

      <GlowSphere radius={2.1} color="#CC0001" opacity={0.08} />
      <OrbitRing radius={2.3} color="#FFD700" speed={0.3} tilt={Math.PI / 2} opacity={0.3} />

      <pointLight color="#FFD700" intensity={3} distance={5} position={[0, 1, 0]} />
      <pointLight position={[2, 2, 2]} color="#CC0001" intensity={1.5} distance={6} />
    </group>
  );
}

// ─── G20 — Globe dengan highlight negara-negara G20 ──────────────────────────

function G20Text() {
  // "G20" dibuat dari geometry primitif
  return (
    <group position={[0, 0.1, 1.15]}>
      {/* G */}
      <mesh position={[-0.55, 0, 0]}>
        <torusGeometry args={[0.22, 0.07, 8, 32, Math.PI * 1.6]} />
        <meshStandardMaterial color="#FFE66D" emissive="#FF9500" emissiveIntensity={0.7} metalness={0.6} roughness={0.1} />
      </mesh>
      <mesh position={[-0.38, -0.05, 0]}>
        <boxGeometry args={[0.18, 0.07, 0.07]} />
        <meshStandardMaterial color="#FFE66D" emissive="#FF9500" emissiveIntensity={0.7} metalness={0.6} roughness={0.1} />
      </mesh>
      {/* 2 */}
      <mesh position={[0, 0.15, 0]}>
        <torusGeometry args={[0.15, 0.06, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#FFE66D" emissive="#FF9500" emissiveIntensity={0.7} metalness={0.6} roughness={0.1} />
      </mesh>
      <mesh position={[-0.1, -0.08, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.28, 0.06, 0.06]} />
        <meshStandardMaterial color="#FFE66D" emissive="#FF9500" emissiveIntensity={0.7} metalness={0.6} roughness={0.1} />
      </mesh>
      <mesh position={[0.08, -0.22, 0]}>
        <boxGeometry args={[0.28, 0.06, 0.06]} />
        <meshStandardMaterial color="#FFE66D" emissive="#FF9500" emissiveIntensity={0.7} metalness={0.6} roughness={0.1} />
      </mesh>
      {/* 0 */}
      <mesh position={[0.55, 0, 0]}>
        <torusGeometry args={[0.18, 0.065, 8, 32]} />
        <meshStandardMaterial color="#FFE66D" emissive="#FF9500" emissiveIntensity={0.7} metalness={0.6} roughness={0.1} />
      </mesh>
    </group>
  );
}

export function G20Object() {
  const globeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) globeRef.current.rotation.y = t * 0.3;
    if (groupRef.current) groupRef.current.position.y = Math.sin(t * 0.6) * 0.13;
    if (ringRef.current) ringRef.current.rotation.y = t * 0.5;
  });

  const latLines = [-0.7, -0.35, 0, 0.35, 0.7];
  const lonCount = 10;

  // G20 country highlight dots (approximate positions on globe)
  const g20Dots: [number, number][] = [
    [0.3, 0.5], [-0.8, 0.4], [1.2, 0.3], [-1.5, 0.2],
    [0.8, -0.3], [2.0, 0.5], [-0.3, -0.5], [1.8, -0.2],
    [2.8, 0.1], [-2.2, 0.3],
  ];

  return (
    <group ref={groupRef}>
      {/* Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial
          color="#1a3a6e"
          metalness={0.3}
          roughness={0.5}
          emissive="#0a1a3a"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Grid lines */}
      {latLines.map((y, i) => {
        const r = Math.sqrt(1.1 * 1.1 - (y * 1.1) * (y * 1.1) / (1.1 * 1.1)) * 1.01;
        const actualR = Math.cos(Math.asin(y)) * 1.12;
        return (
          <mesh key={i} position={[0, y * 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[actualR, 0.01, 6, 48]} />
            <meshStandardMaterial color="#4a90d9" transparent opacity={0.4} />
          </mesh>
        );
      })}
      {Array.from({ length: lonCount }).map((_, i) => (
        <mesh key={i} rotation={[0, (i / lonCount) * Math.PI, 0]}>
          <torusGeometry args={[1.112, 0.009, 6, 48, Math.PI]} />
          <meshStandardMaterial color="#4a90d9" transparent opacity={0.35} />
        </mesh>
      ))}

      {/* G20 highlight dots on globe surface */}
      <group ref={ringRef}>
        {g20Dots.map(([lon, lat], i) => {
          const phi = (Math.PI / 2) - lat * 0.7;
          const theta = lon * 0.5;
          const x = 1.15 * Math.sin(phi) * Math.cos(theta);
          const y = 1.15 * Math.cos(phi);
          const z = 1.15 * Math.sin(phi) * Math.sin(theta);
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.055, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#FFE66D" : "#FF9ECF"}
                emissive={i % 2 === 0 ? "#FFE66D" : "#FF9ECF"}
                emissiveIntensity={1}
              />
            </mesh>
          );
        })}
      </group>

      {/* G20 text overlay */}
      <G20Text />

      <GlowSphere radius={1.25} color="#4a90d9" opacity={0.1} />
      <OrbitRing radius={1.6} color="#FFE66D" speed={0.5} tilt={Math.PI / 2.5} opacity={0.5} />
      <OrbitRing radius={1.95} color="#FF9ECF" speed={-0.3} tilt={Math.PI / 4} opacity={0.35} />

      <pointLight color="#FFE66D" intensity={3} distance={5} position={[0, 1, 1]} />
      <pointLight position={[-2, 1, 2]} color="#4a90d9" intensity={2} distance={6} />
    </group>
  );
}

// ─── Uni Eropa — 12 bintang kuning melingkar di atas lingkaran biru (bendera EU persis) ──

function EUStar({ angle, radius }: { angle: number; radius: number }) {
  const ref = useRef<THREE.Group>(null);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.4 + angle;
  });

  // 5-pointed star dari cone pairs
  return (
    <group ref={ref} position={[x, y, 0.12]}>
      {[0, 1, 2, 3, 4].map(i => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 5 - Math.PI / 2]}>
          <coneGeometry args={[0.07, 0.22, 3]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFA500"
            emissiveIntensity={0.8}
            metalness={0.6}
            roughness={0.1}
          />
        </mesh>
      ))}
      {/* Star center */}
      <mesh>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

export function EUObject() {
  const groupRef = useRef<THREE.Group>(null);
  const discRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.22;
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.14;
    }
    if (discRef.current) discRef.current.rotation.z = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Main blue disc — EU flag background */}
      <mesh ref={discRef}>
        <cylinderGeometry args={[1.6, 1.6, 0.12, 64]} />
        <meshStandardMaterial
          color="#003399"
          metalness={0.4}
          roughness={0.3}
          emissive="#001166"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Blue sphere in center for 3D feel */}
      <mesh position={[0, 0.07, 0]}>
        <sphereGeometry args={[0.9, 48, 48]} />
        <MeshDistortMaterial
          color="#003399"
          distort={0.08}
          speed={1.2}
          emissive="#0033CC"
          emissiveIntensity={0.35}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* 12 stars melingkar — persis bendera EU */}
      {Array.from({ length: 12 }).map((_, i) => (
        <EUStar
          key={i}
          angle={(i / 12) * Math.PI * 2}
          radius={1.22}
        />
      ))}

      {/* Border ring gold */}
      <mesh position={[0, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.62, 0.05, 8, 64]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.6} metalness={0.7} roughness={0.1} />
      </mesh>

      <GlowSphere radius={1.85} color="#C8B6FF" opacity={0.1} />
      <OrbitRing radius={2.1} color="#FFD700" speed={0.25} tilt={Math.PI / 8} opacity={0.4} />

      <pointLight color="#C8B6FF" intensity={2.5} distance={5} />
      <pointLight position={[2, 3, 1]} color="#FFD700" intensity={2.5} distance={7} />
    </group>
  );
}