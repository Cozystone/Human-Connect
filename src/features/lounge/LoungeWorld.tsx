"use client";

import { Environment, Float, Html, Sky } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { allGuests, cityNpcs, type CityNpc, type Guest, type Lounge, type TopicTable, type Vector3Tuple } from "./loungeData";
import { useLoungeStore } from "./loungeStore";

type LoungeWorldProps = {
  activeLounge: Lounge;
  lounges: Lounge[];
  onSelectGuest: (guest: Guest) => void;
  onSelectNpc: (npc: CityNpc) => void;
};

const keys = new Set<string>();
const WORLD_LIMIT = 240;
const INTERACTION_RADIUS = 5.2;
const PLAYER_RADIUS = 0.55;
const BASE_VOICE_RADIUS = 10;
const JUMP_POWER = 5.8;
const GRAVITY = 16;

type Collider = {
  x: number;
  z: number;
  halfX: number;
  halfZ: number;
  kind?: "bench" | "solid";
};

const BUILDING_PALETTES = {
  skyscraper: ["#2a5a78", "#1e4a68", "#1a3a58", "#3a6a88", "#1c4860"],
  office: ["#5a6a5a", "#6a7060", "#7a8070", "#5a6050", "#6a6850"],
  apartment: ["#9a7a60", "#a08070", "#c09a80", "#b08870", "#9a8060"]
};

const baseTreePositions: Vector3Tuple[] = [
  [-44, 0, -42],
  [-28, 0, -46],
  [-10, 0, -50],
  [18, 0, -48],
  [42, 0, -38],
  [52, 0, -12],
  [48, 0, 22],
  [34, 0, 48],
  [5, 0, 55],
  [-24, 0, 52],
  [-50, 0, 30],
  [-56, 0, -8],
  [-18, 0, 9],
  [-6, 0, 14],
  [10, 0, 10],
  [20, 0, 6],
  [-22, 0, -15],
  [20, 0, -16]
];

const baseBenchPositions: Vector3Tuple[] = [
  [-5, 0, 5],
  [7, 0, 5],
  [-16, 0, -1],
  [17, 0, 2],
  [-33, 0, 12],
  [35, 0, -8],
  [-12, 0, 33],
  [28, 0, 29]
];

const baseBuildingSpecs = [
  [-72, -56, 9, 18, 8, "#687873"],
  [-55, -74, 12, 28, 10, "#7b8379"],
  [-30, -64, 10, 17, 8, "#586b72"],
  [36, -76, 13, 32, 12, "#697d87"],
  [69, -48, 11, 24, 10, "#6e756d"],
  [-78, 40, 12, 23, 12, "#7a8278"],
  [-48, 67, 14, 34, 10, "#596f70"],
  [35, 68, 11, 21, 12, "#777b70"],
  [68, 46, 14, 31, 13, "#637276"],
  [-66, -6, 9, 16, 9, "#66736e"],
  [63, 4, 10, 20, 10, "#5d7078"],
  [-4, -76, 16, 26, 9, "#727d76"],
  [2, 75, 18, 30, 10, "#637276"]
] as const;

const podPositions: Vector3Tuple[] = [
  [-46, 0, 34],
  [52, 0, 32],
  [0, 0, 66]
];

const baseStreetLightPositions: Vector3Tuple[] = [
  [-72, 0, -28],
  [-72, 0, 28],
  [-36, 0, -52],
  [-36, 0, 52],
  [0, 0, -64],
  [0, 0, 64],
  [36, 0, -52],
  [36, 0, 52],
  [72, 0, -28],
  [72, 0, 28],
  [-22, 0, -2],
  [22, 0, -2],
  [-14, 0, 24],
  [14, 0, 24]
];

type BuildingSpec = readonly [number, number, number, number, number, string];

function createPrng(seed = 42) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967295;
  };
}

function generateCityBuildings(): BuildingSpec[] {
  const rng = createPrng(991);
  const specs: BuildingSpec[] = [];
  const cells = [-180, -120, -60, 60, 120, 180];

  for (const x of cells) {
    for (const z of cells) {
      const dist = Math.hypot(x, z);
      if (Math.abs(x) < 24 || Math.abs(z) < 24) continue;
      if (dist < 70 && rng() > 0.18) continue;
      if (dist > 210 && rng() > 0.24) continue;
      if (rng() > 0.62) continue;

      const downtown = dist < 115;
      const midtown = dist < 175;
      const count = downtown ? 1 + Math.floor(rng() * 2) : midtown ? 1 + Math.floor(rng() * 2) : 1;

      for (let i = 0; i < count; i += 1) {
        const w = downtown ? 9 + rng() * 9 : midtown ? 8 + rng() * 8 : 6 + rng() * 6;
        const d = downtown ? 9 + rng() * 9 : midtown ? 8 + rng() * 8 : 6 + rng() * 6;
        const h = downtown ? 22 + rng() * 34 : midtown ? 12 + rng() * 20 : 6 + rng() * 12;
        const ox = (rng() - 0.5) * 20;
        const oz = (rng() - 0.5) * 20;
        const palette = downtown ? "#5f737d" : midtown ? "#777b70" : "#9a8060";
        specs.push([x + ox, z + oz, w, h, d, palette]);
      }
    }
  }

  return specs;
}

function generateCityTrees(): Vector3Tuple[] {
  const rng = createPrng(351);
  const trees: Vector3Tuple[] = [];
  for (let i = 0; i < 78; i += 1) {
    const x = -230 + rng() * 460;
    const z = -230 + rng() * 460;
    if (Math.abs(x) % 36 < 5 || Math.abs(z) % 36 < 5) continue;
    if (Math.hypot(x, z) < 34) continue;
    trees.push([x, 0, z]);
  }
  return trees;
}

function generateCityBenches(): Vector3Tuple[] {
  return [
    ...baseBenchPositions,
    [-112, 0, 18],
    [-84, 0, -92],
    [-42, 0, 108],
    [48, 0, -92],
    [86, 0, 116],
    [132, 0, -16],
    [164, 0, 64],
    [-164, 0, 74],
    [-186, 0, -42],
    [18, 0, 196],
    [196, 0, -86]
  ];
}

function generateStreetLights(): Vector3Tuple[] {
  const lights: Vector3Tuple[] = [];
  const lines = [-216, -144, -72, 0, 72, 144, 216];
  for (const x of lines) {
    for (let z = -216; z <= 216; z += 108) {
      lights.push([x + 4.2, 0, z]);
      lights.push([x - 4.2, 0, z + 18]);
    }
  }
  for (const z of lines) {
    for (let x = -216; x <= 216; x += 108) {
      lights.push([x, 0, z + 4.2]);
      lights.push([x + 18, 0, z - 4.2]);
    }
  }
  return lights;
}

const buildingSpecs: BuildingSpec[] = [...baseBuildingSpecs, ...generateCityBuildings()];
const treePositions: Vector3Tuple[] = [...baseTreePositions, ...generateCityTrees()];
const benchPositions: Vector3Tuple[] = generateCityBenches();
const streetLightPositions: Vector3Tuple[] = [...baseStreetLightPositions, ...generateStreetLights()];

const textureCache = new Map<string, THREE.Texture>();

function getWindowTexture(kind: keyof typeof BUILDING_PALETTES) {
  const key = `windows-${kind}`;
  const cached = textureCache.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is unavailable");

  const wall = {
    skyscraper: "#30485a",
    office: "#66715f",
    apartment: "#8f725c"
  }[kind];
  const config = {
    skyscraper: { cols: 10, rows: 32, lit: 0.56, window: "#9cc6df" },
    office: { cols: 7, rows: 22, lit: 0.48, window: "#b7d0cf" },
    apartment: { cols: 5, rows: 16, lit: 0.52, window: "#f0cf83" }
  }[kind];

  ctx.fillStyle = wall;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cellW = canvas.width / config.cols;
  const cellH = canvas.height / config.rows;
  const winW = cellW * 0.56;
  const winH = cellH * 0.5;

  for (let row = 0; row < config.rows; row += 1) {
    for (let col = 0; col < config.cols; col += 1) {
      const x = col * cellW + (cellW - winW) / 2;
      const y = row * cellH + (cellH - winH) / 2;
      const lit = Math.random() < config.lit;
      ctx.fillStyle = lit ? config.window : "#07101a";
      ctx.fillRect(x, y, winW, winH);
      if (lit) {
        ctx.fillStyle = "rgba(255, 234, 176, 0.32)";
        ctx.fillRect(x + 1, y + 1, winW - 2, 2);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

function getRoadTexture() {
  const cached = textureCache.get("road");
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is unavailable");

  ctx.fillStyle = "#202322";
  ctx.fillRect(0, 0, 512, 512);
  ctx.fillStyle = "rgba(255,255,255,0.025)";
  for (let i = 0; i < 130; i += 1) {
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 20 + Math.random() * 70, 1 + Math.random() * 3);
  }
  ctx.strokeStyle = "#e6d36e";
  ctx.setLineDash([44, 34]);
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 512);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = "#e8edf0";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(28, 0);
  ctx.lineTo(28, 512);
  ctx.moveTo(484, 0);
  ctx.lineTo(484, 512);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 5);
  texture.anisotropy = 8;
  textureCache.set("road", texture);
  return texture;
}

function getSidewalkTexture() {
  const cached = textureCache.get("sidewalk");
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is unavailable");

  ctx.fillStyle = "#bbb3a4";
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = "#958d80";
  ctx.lineWidth = 1.5;
  for (let p = 0; p <= 256; p += 32) {
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, 256);
    ctx.moveTo(0, p);
    ctx.lineTo(256, p);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(24, 24);
  texture.anisotropy = 8;
  textureCache.set("sidewalk", texture);
  return texture;
}

export function LoungeWorld({ activeLounge, lounges, onSelectGuest, onSelectNpc }: LoungeWorldProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 10, 14], fov: 48 }}
      dpr={[1, 1.25]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
      }}
    >
      <color attach="background" args={["#a9c7d5"]} />
      <fog attach="fog" args={["#a0b7c0", 150, 470]} />
      <Sky
        distance={4500}
        sunPosition={[160, 120, 70]}
        turbidity={3.35}
        rayleigh={1.85}
        mieCoefficient={0.006}
        mieDirectionalG={0.9}
      />
      <ambientLight intensity={0.32} color="#bdd4df" />
      <hemisphereLight args={["#c9e0e9", "#43543c", 0.82]} />
      <directionalLight
        castShadow
        position={[52, 70, 34]}
        intensity={2.55}
        shadow-camera-left={-260}
        shadow-camera-right={260}
        shadow-camera-top={260}
        shadow-camera-bottom={-260}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00012}
        shadow-normalBias={0.045}
      />
      <Environment preset="city" />
      <OpenCity activeLounge={activeLounge} lounges={lounges} onSelectGuest={onSelectGuest} onSelectNpc={onSelectNpc} />
      <Player activeLounge={activeLounge} lounges={lounges} onSelectGuest={onSelectGuest} onSelectNpc={onSelectNpc} />
      <CameraRig />
    </Canvas>
  );
}

function OpenCity({ activeLounge, lounges, onSelectGuest, onSelectNpc }: LoungeWorldProps) {
  const tables = useMemo(() => lounges.flatMap((lounge) => lounge.tables), [lounges]);
  const guests = useMemo(() => lounges.flatMap((lounge) => lounge.guests), [lounges]);

  return (
    <group>
      <Ground />
      <RoadGrid />
      <Skyline accent={activeLounge.accent} />
      <CityFurniture />
      <StreetLights />
      <HubSign />
      <Stage accent={activeLounge.accent} />
      <PrivatePods />

      {tables.map((table) => (
        <TopicTableMesh key={table.id} table={table} />
      ))}

      {guests.map((guest, index) => (
        <GuestAvatar key={guest.id} guest={guest} index={index} onSelectGuest={onSelectGuest} />
      ))}
      {cityNpcs.map((npc, index) => (
        <NpcAvatar key={npc.id} npc={npc} index={index} onSelectNpc={onSelectNpc} />
      ))}
    </group>
  );
}

function Ground() {
  const sidewalkTexture = useMemo(() => getSidewalkTexture(), []);
  return (
    <group>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.04, 0]}>
        <planeGeometry args={[520, 520]} />
        <meshStandardMaterial color="#6f7f66" roughness={0.96} metalness={0.01} polygonOffset polygonOffsetFactor={2} polygonOffsetUnits={2} />
      </mesh>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.03, 0]}>
        <circleGeometry args={[52, 128]} />
        <meshStandardMaterial
          map={sidewalkTexture}
          color="#ded7c9"
          roughness={0.9}
          metalness={0.01}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <ringGeometry args={[51.6, 52.4, 128]} />
        <meshStandardMaterial color="#6f8178" roughness={0.75} />
      </mesh>
    </group>
  );
}

function RoadGrid() {
  const roadTexture = useMemo(() => getRoadTexture(), []);
  const roadLines = useMemo(() => [-216, -180, -144, -108, -72, -36, 0, 36, 72, 108, 144, 180, 216], []);
  return (
    <group>
      {roadLines.map((x) => (
        <mesh key={`road-x-${x}`} receiveShadow rotation-x={-Math.PI / 2} position={[x, 0, 0]}>
          <planeGeometry args={[x % 72 === 0 ? 8.5 : 5.2, 500]} />
          <meshStandardMaterial map={roadTexture} color="#ffffff" roughness={0.86} metalness={0.02} polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
        </mesh>
      ))}
      {roadLines.map((z) => (
        <mesh key={`road-z-${z}`} receiveShadow rotation-x={-Math.PI / 2} rotation-z={Math.PI / 2} position={[0, 0.01, z]}>
          <planeGeometry args={[500, z % 72 === 0 ? 8.5 : 5.2]} />
          <meshStandardMaterial map={roadTexture} color="#ffffff" roughness={0.86} metalness={0.02} polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
        </mesh>
      ))}
      {roadLines.flatMap((line) =>
        [-1.45, 1.45].map((offset) => (
          <mesh key={`lane-a-${line}-${offset}`} rotation-x={-Math.PI / 2} position={[line + offset, 0.025, 0]}>
            <planeGeometry args={[0.08, 480]} />
            <meshStandardMaterial color="#d8cfad" roughness={0.6} />
          </mesh>
        ))
      )}
      {roadLines.flatMap((line) =>
        [-1.45, 1.45].map((offset) => (
          <mesh key={`lane-b-${line}-${offset}`} rotation-x={-Math.PI / 2} position={[0, 0.03, line + offset]}>
            <planeGeometry args={[480, 0.08]} />
            <meshStandardMaterial color="#d8cfad" roughness={0.6} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Skyline({ accent }: { accent: string }) {
  return (
    <group>
      {buildingSpecs.map(([x, z, w, h, d, color], index) => {
        const kind = getBuildingKind(h);
        const texture = getWindowTexture(kind);
        const isGlass = kind === "skyscraper";
        const palette = BUILDING_PALETTES[kind];
        const facade = index % 4 === 0 ? accent : palette[index % palette.length] ?? color;

        return (
        <group key={`${x}-${z}`} position={[x, 0, z]}>
          <mesh castShadow receiveShadow position={[0, h / 2, 0]}>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial
              map={texture}
              color={facade}
              roughness={isGlass ? 0.26 : 0.72}
              metalness={isGlass ? 0.42 : 0.06}
              envMapIntensity={isGlass ? 0.9 : 0.24}
            />
          </mesh>
          <mesh position={[0, h + 0.08, 0]}>
            <boxGeometry args={[w * 0.78, 0.16, d * 0.78]} />
            <meshStandardMaterial color="#d4ddd7" roughness={0.48} metalness={0.18} />
          </mesh>
          {Array.from({ length: Math.floor(h / 2) }).map((_, floor) => (
            <mesh key={floor} position={[0, 1.5 + floor * 2, d / 2 + 0.015]}>
              <boxGeometry args={[w * 0.72, 0.18, 0.04]} />
              <meshStandardMaterial color="#f1dca3" emissive="#c89539" emissiveIntensity={0.12} />
            </mesh>
          ))}
        </group>
        );
      })}
    </group>
  );
}

function StreetLights() {
  return (
    <group>
      {streetLightPositions.map(([x, , z], index) => (
        <group key={index} position={[x, 0, z]}>
          <mesh castShadow position={[0, 2.2, 0]}>
            <cylinderGeometry args={[0.08, 0.11, 4.4, 8]} />
            <meshStandardMaterial color="#353838" roughness={0.32} metalness={0.82} />
          </mesh>
          <mesh position={[0, 4.55, 0]}>
            <boxGeometry args={[0.65, 0.25, 0.65]} />
            <meshStandardMaterial color="#fff6c2" emissive="#ffd879" emissiveIntensity={1.6} roughness={0.25} />
          </mesh>
          {index < 6 ? <pointLight position={[0, 4.45, 0]} intensity={0.42} distance={16} color="#ffd98a" /> : null}
        </group>
      ))}
    </group>
  );
}

function CityFurniture() {
  return (
    <group>
      {treePositions.map(([x, y, z], index) => (
        <group key={index} position={[x, y, z]}>
          <mesh castShadow position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 2.4, 14]} />
            <meshStandardMaterial color="#5a4e40" roughness={0.8} />
          </mesh>
          <mesh castShadow position={[0, 2.7, 0]}>
            <coneGeometry args={[1.35, 2.7, 14]} />
            <meshStandardMaterial color={index % 3 === 0 ? "#3f6348" : "#416c4c"} roughness={0.78} />
          </mesh>
        </group>
      ))}
      {benchPositions.map(([x, y, z], index) => (
        <group key={`bench-${index}`} position={[x, y, z]} rotation-y={index % 2 ? Math.PI / 2 : 0}>
          <mesh castShadow position={[0, 0.35, 0]}>
            <boxGeometry args={[2.5, 0.22, 0.55]} />
            <meshStandardMaterial color="#b78c5d" roughness={0.72} />
          </mesh>
          <mesh castShadow position={[-0.9, 0.15, 0]}>
            <boxGeometry args={[0.15, 0.3, 0.5]} />
            <meshStandardMaterial color="#584b3d" />
          </mesh>
          <mesh castShadow position={[0.9, 0.15, 0]}>
            <boxGeometry args={[0.15, 0.3, 0.5]} />
            <meshStandardMaterial color="#584b3d" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function HubSign() {
  return (
    <group position={[0, 0, -20]}>
      <mesh castShadow receiveShadow position={[0, 2.4, 0]}>
        <boxGeometry args={[10, 3.2, 0.28]} />
        <meshStandardMaterial color="#f7f4eb" roughness={0.76} />
      </mesh>
      <mesh castShadow position={[-5.2, 1.35, 0]}>
        <boxGeometry args={[0.25, 2.7, 0.25]} />
        <meshStandardMaterial color="#59625c" />
      </mesh>
      <mesh castShadow position={[5.2, 1.35, 0]}>
        <boxGeometry args={[0.25, 2.7, 0.25]} />
        <meshStandardMaterial color="#59625c" />
      </mesh>
      <Html position={[0, 2.48, 0.22]} center distanceFactor={12}>
        <div className="world-label sign">
          <strong>Human Connect</strong>
          <span>주제와 사람들이 섞여 있는 열린 도시</span>
        </div>
      </Html>
    </group>
  );
}

function Stage({ accent }: { accent: string }) {
  return (
    <group position={[0, 0, 18]}>
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[11, 0.4, 4]} />
        <meshStandardMaterial color="#746d5f" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[-4.4, 1.0, -0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 1.6, 16]} />
        <meshStandardMaterial color={accent} roughness={0.35} />
      </mesh>
      <mesh castShadow position={[-4.4, 1.9, -0.2]}>
        <sphereGeometry args={[0.24, 20, 20]} />
        <meshStandardMaterial color="#222725" roughness={0.2} />
      </mesh>
      <Html position={[0, 1.25, -1.15]} center distanceFactor={14}>
        <div className="world-label compact">오픈 피치 광장</div>
      </Html>
    </group>
  );
}

function PrivatePods() {
  return (
    <group>
      {podPositions.map(([x, y, z], index) => (
        <group key={index} position={[x, y, z]}>
          <mesh castShadow receiveShadow position={[0, 0.08, 0]}>
            <cylinderGeometry args={[2.25, 2.25, 0.16, 64]} />
            <meshStandardMaterial color="#d7d1c1" roughness={0.88} />
          </mesh>
          <mesh position={[0, 1.35, 0]}>
            <torusGeometry args={[2.18, 0.045, 8, 96]} />
            <meshStandardMaterial color="#8fbab0" emissive="#133d35" emissiveIntensity={0.16} />
          </mesh>
          <mesh position={[0, 0.04, 0]} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[2.35, 2.55, 72]} />
            <meshStandardMaterial color="#f6edd4" transparent opacity={0.55} />
          </mesh>
          <Html position={[0, 2.05, 0]} center distanceFactor={14}>
            <div className="world-label compact">1:1 조용한 포드</div>
          </Html>
        </group>
      ))}
    </group>
  );
}

function TopicTableMesh({ table }: { table: TopicTable }) {
  const joinTable = useLoungeStore((state) => state.joinTable);
  const currentTableId = useLoungeStore((state) => state.currentTableId);
  const active = currentTableId === table.id;

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    joinTable(table.id);
  };

  return (
    <group position={table.position} onClick={handleClick}>
      <mesh rotation-x={-Math.PI / 2}>
        <ringGeometry args={[3.6, 4.05, 96]} />
        <meshStandardMaterial color={active ? "#ffffff" : table.color} transparent opacity={active ? 0.64 : 0.3} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[2.08, 2.08, 0.34, 64]} />
        <meshStandardMaterial color="#f2ebd8" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.35, 0.52, 0.64, 24]} />
        <meshStandardMaterial color="#8b806d" roughness={0.6} />
      </mesh>
      {Array.from({ length: table.seats }).map((_, index) => {
        const angle = (index / table.seats) * Math.PI * 2;
        const x = Math.cos(angle) * 3.05;
        const z = Math.sin(angle) * 3.05;
        return (
          <mesh key={index} castShadow receiveShadow position={[x, 0.34, z]} rotation-y={-angle}>
            <boxGeometry args={[0.72, 0.68, 0.72]} />
            <meshStandardMaterial color={index < table.occupied ? table.color : "#ddd3be"} roughness={0.78} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.04, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[4.85, 72]} />
        <meshStandardMaterial color={table.color} transparent opacity={0.08} />
      </mesh>
      <Html position={[0, 1.65, 0]} center distanceFactor={12}>
        <div className="world-label table">
          <strong>{table.label}</strong>
          <span>{table.occupied}/{table.seats} 착석 · 근처에서 E</span>
        </div>
      </Html>
    </group>
  );
}

function GuestAvatar({
  guest,
  index,
  onSelectGuest
}: {
  guest: Guest;
  index: number;
  onSelectGuest: (guest: Guest) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const blocked = useLoungeStore((state) => state.blockedGuestIds.includes(guest.id));
  const playerPosition = useLoungeStore((state) => state.playerPosition);
  const muted = useLoungeStore((state) => state.muted);
  const crowdCount = useMemo(() => getCrowdCount(playerPosition), [playerPosition]);
  const voiceRadius = getVoiceRadius(crowdCount);
  const distance = planarDistance(playerPosition, guest.position);
  const audible = !muted && !blocked && distance <= voiceRadius;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + index * 0.75;
    ref.current.position.y = Math.sin(t * 1.3) * 0.045;
    ref.current.rotation.y = Math.sin(t * 0.45) * 0.32;
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelectGuest(guest);
  };

  return (
    <Float speed={1.05} rotationIntensity={0.04} floatIntensity={0.12}>
      <group ref={ref} position={guest.position} onClick={handleClick}>
        <HumanoidAvatar
          audible={audible}
          color={blocked ? "#555555" : guest.color}
          muted={muted || blocked}
          skin={blocked ? "#777777" : "#f0c8a9"}
          speaking={audible && isGuestSpeaking(index)}
          name={guest.name}
        />
      </group>
    </Float>
  );
}

function NpcAvatar({
  npc,
  index,
  onSelectNpc
}: {
  npc: CityNpc;
  index: number;
  onSelectNpc: (npc: CityNpc) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const origin = useMemo(() => new THREE.Vector3(...npc.position), [npc.position]);
  const audible = useLoungeStore((state) => planarDistance(state.playerPosition, npc.position) < 16);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * 0.18 + index * 1.7;
    const x = origin.x + Math.sin(t) * (8 + index * 1.6);
    const z = origin.z + Math.cos(t * 0.8) * (6 + index * 1.2);
    const dx = x - ref.current.position.x;
    const dz = z - ref.current.position.z;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x, 0.018);
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, z, 0.018);
    ref.current.rotation.y = Math.atan2(dx, dz);
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelectNpc(npc);
  };

  return (
    <group ref={ref} position={npc.position} onClick={handleClick}>
      <HumanoidAvatar
        audible={audible}
        color={npc.color}
        name={npc.name}
        skin="#e8c3a1"
        speaking={audible && isGuestSpeaking(index + 8)}
      />
      <Html position={[0, 2.95, 0]} center distanceFactor={12}>
        <div className="world-label npc">
          <strong>{npc.role}</strong>
          <span>NPC · E 대화</span>
        </div>
      </Html>
    </group>
  );
}

function HumanoidAvatar({
  color,
  skin,
  name,
  moving = false,
  speaking = false,
  audible = false,
  muted = false,
  seated = false,
  jumping = false
}: {
  color: string;
  skin: string;
  name: string;
  moving?: boolean;
  speaking?: boolean;
  audible?: boolean;
  muted?: boolean;
  seated?: boolean;
  jumping?: boolean;
}) {
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const isMoving = !seated && (moving || keys.has("w") || keys.has("a") || keys.has("s") || keys.has("d"));
    const stride = isMoving ? Math.sin(clock.elapsedTime * 8) : Math.sin(clock.elapsedTime * 1.4) * 0.16;
    if (leftArm.current) leftArm.current.rotation.x = seated ? -0.42 : stride * 0.55 - 0.15;
    if (rightArm.current) rightArm.current.rotation.x = seated ? -0.42 : -stride * 0.55 - 0.15;
    if (leftLeg.current) leftLeg.current.rotation.x = seated ? -1.15 : jumping ? -0.2 : -stride * 0.42;
    if (rightLeg.current) rightLeg.current.rotation.x = seated ? -1.15 : jumping ? -0.2 : stride * 0.42;
  });

  return (
    <group>
      <mesh castShadow position={[0, 1.04, 0]}>
        <capsuleGeometry args={[0.34, 0.8, 8, 18]} />
        <meshStandardMaterial color={color} roughness={0.48} />
      </mesh>
      <mesh castShadow position={[0, 1.74, 0]}>
        <sphereGeometry args={[0.31, 28, 28]} />
        <meshStandardMaterial color={skin} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 2.02, -0.03]}>
        <sphereGeometry args={[0.24, 18, 18]} />
        <meshStandardMaterial color="#202725" roughness={0.38} />
      </mesh>
      <mesh position={[-0.105, 1.77, 0.29]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial color="#17201d" />
      </mesh>
      <mesh position={[0.105, 1.77, 0.29]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial color="#17201d" />
      </mesh>
      <mesh position={[0, 1.63, 0.31]}>
        <boxGeometry args={[0.22, 0.035, 0.025]} />
        <meshStandardMaterial color="#5d2d2a" />
      </mesh>

      <group ref={leftArm} position={[-0.46, 1.25, 0]}>
        <mesh castShadow position={[0, -0.34, 0]}>
          <capsuleGeometry args={[0.09, 0.58, 7, 12]} />
          <meshStandardMaterial color={color} roughness={0.52} />
        </mesh>
        <mesh castShadow position={[0, -0.75, 0.02]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={skin} roughness={0.5} />
        </mesh>
      </group>
      <group ref={rightArm} position={[0.46, 1.25, 0]}>
        <mesh castShadow position={[0, -0.34, 0]}>
          <capsuleGeometry args={[0.09, 0.58, 7, 12]} />
          <meshStandardMaterial color={color} roughness={0.52} />
        </mesh>
        <mesh castShadow position={[0, -0.75, 0.02]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={skin} roughness={0.5} />
        </mesh>
      </group>
      <group ref={leftLeg} position={[-0.17, 0.55, 0]}>
        <mesh castShadow position={[0, -0.36, 0]}>
          <capsuleGeometry args={[0.11, 0.62, 7, 12]} />
          <meshStandardMaterial color="#2f3d39" roughness={0.58} />
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.17, 0.55, 0]}>
        <mesh castShadow position={[0, -0.36, 0]}>
          <capsuleGeometry args={[0.11, 0.62, 7, 12]} />
          <meshStandardMaterial color="#2f3d39" roughness={0.58} />
        </mesh>
      </group>
      <mesh castShadow position={[0, 1.18, 0.36]}>
        <boxGeometry args={[0.38, 0.08, 0.05]} />
        <meshStandardMaterial color="#f8f4ea" />
      </mesh>
      <Html position={[0, 2.38, 0]} center distanceFactor={10}>
        <div className={`world-label name ${speaking ? "speaking" : ""} ${audible ? "audible" : ""}`}>
          <span>{name}</span>
          {seated ? <em>착석 중</em> : null}
          {jumping ? <em>점프</em> : null}
          {muted ? <em>음성 꺼짐</em> : speaking ? <em>말하는 중</em> : audible ? <em>들림</em> : null}
        </div>
      </Html>
    </group>
  );
}

function Player({ lounges, onSelectGuest, onSelectNpc }: LoungeWorldProps) {
  const ref = useRef<THREE.Group>(null);
  const lastSync = useRef(0);
  const movingRef = useRef(false);
  const verticalVelocity = useRef(0);
  const tables = useMemo(() => lounges.flatMap((lounge) => lounge.tables), [lounges]);
  const guests = useMemo(() => lounges.flatMap((lounge) => lounge.guests), [lounges]);
  const colliders = useMemo(() => getWorldColliders(lounges), [lounges]);
  const nickname = useLoungeStore((state) => state.nickname);
  const currentTableId = useLoungeStore((state) => state.currentTableId);
  const isJumping = useLoungeStore((state) => state.isJumping);
  const joinTable = useLoungeStore((state) => state.joinTable);
  const leaveTable = useLoungeStore((state) => state.leaveTable);
  const setPlayerPose = useLoungeStore((state) => state.setPlayerPose);
  const setPlayerJumping = useLoungeStore((state) => state.setPlayerJumping);
  const velocity = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (["KeyW", "KeyA", "KeyS", "KeyD", "Space", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.code)) {
        event.preventDefault();
      }
      keys.add(event.key.toLowerCase());
      if (event.code === "Space" && ref.current && ref.current.position.y <= 0.02 && !currentTableId) {
        verticalVelocity.current = JUMP_POWER;
        setPlayerJumping(true);
      }
      if (event.key.toLowerCase() === "e" && ref.current) {
        if (currentTableId) {
          leaveTable();
          return;
        }

        const position = ref.current.position;
        const nearestGuest = getNearest(guests, position);
        const nearestNpc = getNearest(cityNpcs, position);
        const nearestTable = getNearest(tables, position);

        if (nearestNpc && nearestNpc.distance <= INTERACTION_RADIUS + 1.2) {
          onSelectNpc(nearestNpc.item);
          return;
        }

        if (nearestGuest && nearestGuest.distance <= INTERACTION_RADIUS) {
          onSelectGuest(nearestGuest.item);
          return;
        }

        if (nearestTable && nearestTable.distance <= INTERACTION_RADIUS + 1.6) {
          joinTable(nearestTable.item.id);
        }
      }
    };
    const up = (event: KeyboardEvent) => keys.delete(event.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [currentTableId, guests, joinTable, leaveTable, onSelectGuest, onSelectNpc, setPlayerJumping, tables]);

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;

    if (currentTableId) {
      movingRef.current = false;
      velocity.set(0, 0, 0);
    }

    const turnInput = (keys.has("a") ? 1 : 0) + (keys.has("d") ? -1 : 0);
    if (turnInput !== 0 && !currentTableId) {
      ref.current.rotation.y += turnInput * delta * 2.35;
    }

    const moveInput = (keys.has("w") ? 1 : 0) + (keys.has("s") ? -1 : 0);
    movingRef.current = moveInput !== 0 && !currentTableId;

    if (moveInput !== 0 && !currentTableId) {
      const forward = ref.current.rotation.y;
      direction.set(Math.sin(forward) * moveInput, 0, Math.cos(forward) * moveInput);
      velocity.lerp(direction.multiplyScalar(7.1), 0.2);
    } else {
      velocity.multiplyScalar(Math.max(0, 1 - delta * 8));
    }

    const nextX = ref.current.position.x + velocity.x * delta;
    const nextZ = ref.current.position.z + velocity.z * delta;
    const canClearLowObstacle = ref.current.position.y > 0.72;

    if (!hitsCollider(nextX, ref.current.position.z, colliders, canClearLowObstacle)) {
      ref.current.position.x = THREE.MathUtils.clamp(nextX, -WORLD_LIMIT, WORLD_LIMIT);
    } else {
      velocity.x = 0;
    }

    if (!hitsCollider(ref.current.position.x, nextZ, colliders, canClearLowObstacle)) {
      ref.current.position.z = THREE.MathUtils.clamp(nextZ, -WORLD_LIMIT, WORLD_LIMIT);
    } else {
      velocity.z = 0;
    }

    if (!currentTableId) {
      ref.current.position.y += verticalVelocity.current * delta;
      verticalVelocity.current -= GRAVITY * delta;
      if (ref.current.position.y <= 0) {
        ref.current.position.y = 0;
        verticalVelocity.current = 0;
        setPlayerJumping(false);
      }
    } else {
      ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, 0.22, 8, delta);
      setPlayerJumping(false);
    }

    if (clock.elapsedTime - lastSync.current > 0.18) {
      lastSync.current = clock.elapsedTime;
      setPlayerPose([ref.current.position.x, ref.current.position.y, ref.current.position.z], ref.current.rotation.y);
    }
  });

  return (
    <group ref={ref} name="local-player" position={[0, 0, 7]}>
      <HumanoidAvatar
        color="#2b8c73"
        skin="#f0c8a9"
        name={nickname}
        moving={movingRef.current}
        seated={Boolean(currentTableId)}
        jumping={isJumping}
      />
    </group>
  );
}

function CameraRig() {
  const { camera, scene } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);
  const yaw = useRef(0);
  const pitch = useRef(0);

  useFrame((_, delta) => {
    const player = scene.getObjectByName("local-player");
    if (!player) return;

    const yawInput = (keys.has("arrowleft") ? 1 : 0) + (keys.has("arrowright") ? -1 : 0);
    const pitchInput = (keys.has("arrowup") ? 1 : 0) + (keys.has("arrowdown") ? -1 : 0);

    if (yawInput !== 0) {
      yaw.current = THREE.MathUtils.clamp(yaw.current + yawInput * delta * 1.65, -1.1, 1.1);
    } else {
      yaw.current = THREE.MathUtils.damp(yaw.current, 0, 5.2, delta);
    }

    if (pitchInput !== 0) {
      pitch.current = THREE.MathUtils.clamp(pitch.current + pitchInput * delta * 0.85, -0.45, 0.55);
    } else {
      pitch.current = THREE.MathUtils.damp(pitch.current, 0, 5.2, delta);
    }

    target.copy(player.position);
    const avatarYaw = player.rotation.y;
    const cameraYaw = avatarYaw + Math.PI + yaw.current;
    const radius = 14.5;
    const height = 8.4 + pitch.current * 6;
    desired.set(
      target.x + Math.sin(cameraYaw) * radius,
      target.y + height,
      target.z + Math.cos(cameraYaw) * radius
    );
    lookTarget.set(
      target.x + Math.sin(avatarYaw) * 2.4,
      target.y + 1.35,
      target.z + Math.cos(avatarYaw) * 2.4
    );
    camera.position.lerp(desired, 0.075);
    camera.lookAt(lookTarget);
  });

  return null;
}

function distanceTo(position: Vector3Tuple, target: THREE.Vector3) {
  const dx = position[0] - target.x;
  const dz = position[2] - target.z;
  return Math.sqrt(dx * dx + dz * dz);
}

function planarDistance(a: Vector3Tuple, b: Vector3Tuple) {
  const dx = a[0] - b[0];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dz * dz);
}

function getCrowdCount(position: Vector3Tuple) {
  return allGuests.filter((guest) => planarDistance(position, guest.position) <= 18).length;
}

function getVoiceRadius(crowdCount: number) {
  return BASE_VOICE_RADIUS + Math.min(12, Math.max(0, crowdCount - 2) * 3);
}

function isGuestSpeaking(index: number) {
  return Math.floor(Date.now() / 1500 + index) % 4 === 0;
}

function getNearest<T extends { position: Vector3Tuple }>(items: T[], position: THREE.Vector3) {
  return items.reduce<{ item: T; distance: number } | null>((nearest, item) => {
    const distance = distanceTo(item.position, position);
    if (!nearest || distance < nearest.distance) return { item, distance };
    return nearest;
  }, null);
}

function getWorldColliders(lounges: Lounge[]): Collider[] {
  const buildingColliders = buildingSpecs.map(([x, z, w, , d]) => ({
    x,
    z,
    halfX: w / 2 + 0.75,
    halfZ: d / 2 + 0.75
  }));

  const tables = lounges.flatMap((lounge) => lounge.tables);
  const guests = lounges.flatMap((lounge) => lounge.guests);

  const tableColliders = tables.map((table) => ({
    x: table.position[0],
    z: table.position[2],
    halfX: 2.7,
    halfZ: 2.7
  }));

  const guestColliders = guests.map((guest) => ({
    x: guest.position[0],
    z: guest.position[2],
    halfX: 0.9,
    halfZ: 0.9
  }));

  const treeColliders = treePositions.map(([x, , z]) => ({
    x,
    z,
    halfX: 0.9,
    halfZ: 0.9
  }));

  const benchColliders = benchPositions.map(([x, , z], index) => ({
    x,
    z,
    halfX: index % 2 ? 0.65 : 1.45,
    halfZ: index % 2 ? 1.45 : 0.65,
    kind: "bench" as const
  }));

  const podColliders = podPositions.map(([x, , z]) => ({
    x,
    z,
    halfX: 2.8,
    halfZ: 2.8
  }));

  const lightColliders = streetLightPositions.map(([x, , z]) => ({
    x,
    z,
    halfX: 0.38,
    halfZ: 0.38
  }));

  return [
    ...buildingColliders,
    ...tableColliders,
    ...guestColliders,
    ...treeColliders,
    ...benchColliders,
    ...podColliders,
    ...lightColliders,
    { x: 0, z: 18, halfX: 6.2, halfZ: 2.6 },
    { x: 0, z: -20, halfX: 5.5, halfZ: 0.9 }
  ];
}

function getBuildingKind(height: number): keyof typeof BUILDING_PALETTES {
  if (height >= 28) return "skyscraper";
  if (height >= 20) return "office";
  return "apartment";
}

function hitsCollider(x: number, z: number, colliders: Collider[], canClearLowObstacle = false) {
  return colliders.some(
    (collider) =>
      !(canClearLowObstacle && collider.kind === "bench") &&
      Math.abs(x - collider.x) < collider.halfX + PLAYER_RADIUS &&
      Math.abs(z - collider.z) < collider.halfZ + PLAYER_RADIUS
  );
}
