"use client";

import { Environment, Float, Text } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Guest, Lounge, TopicTable, Vector3Tuple } from "./loungeData";
import { useLoungeStore } from "./loungeStore";

type LoungeWorldProps = {
  lounge: Lounge;
  onSelectGuest: (guest: Guest) => void;
};

const keys = new Set<string>();
const WORLD_LIMIT = 92;
const INTERACTION_RADIUS = 5.2;
const PLAYER_RADIUS = 0.55;

type Collider = {
  x: number;
  z: number;
  halfX: number;
  halfZ: number;
};

const treePositions: Vector3Tuple[] = [
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

const benchPositions: Vector3Tuple[] = [
  [-5, 0, 5],
  [7, 0, 5],
  [-16, 0, -1],
  [17, 0, 2],
  [-33, 0, 12],
  [35, 0, -8],
  [-12, 0, 33],
  [28, 0, 29]
];

const buildingSpecs = [
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

export function LoungeWorld({ lounge, onSelectGuest }: LoungeWorldProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 10, 14], fov: 48 }}
      dpr={[1, 1.85]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <color attach="background" args={["#a8c7cd"]} />
      <fog attach="fog" args={["#a8c7cd", 48, 155]} />
      <ambientLight intensity={0.48} />
      <hemisphereLight args={["#dceff1", "#47554e", 0.64]} />
      <directionalLight
        castShadow
        position={[35, 52, 28]}
        intensity={2.15}
        shadow-camera-left={-105}
        shadow-camera-right={105}
        shadow-camera-top={105}
        shadow-camera-bottom={-105}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
      />
      <Environment preset="city" />
      <OpenCity lounge={lounge} onSelectGuest={onSelectGuest} />
      <Player lounge={lounge} onSelectGuest={onSelectGuest} />
      <CameraRig />
    </Canvas>
  );
}

function OpenCity({ lounge, onSelectGuest }: LoungeWorldProps) {
  return (
    <group>
      <Ground />
      <RoadGrid />
      <Skyline accent={lounge.accent} />
      <CityFurniture />
      <HubSign lounge={lounge} />
      <Stage accent={lounge.accent} />
      <PrivatePods />

      {lounge.tables.map((table) => (
        <TopicTableMesh key={table.id} table={table} />
      ))}

      {lounge.guests.map((guest, index) => (
        <GuestAvatar key={guest.id} guest={guest} index={index} onSelectGuest={onSelectGuest} />
      ))}
    </group>
  );
}

function Ground() {
  return (
    <group>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.04, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#96a889" roughness={0.94} />
      </mesh>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.03, 0]}>
        <circleGeometry args={[38, 128]} />
        <meshStandardMaterial color="#d7d0bc" roughness={0.86} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <ringGeometry args={[37.7, 38.3, 128]} />
        <meshStandardMaterial color="#6f8178" roughness={0.75} />
      </mesh>
    </group>
  );
}

function RoadGrid() {
  return (
    <group>
      {[-72, -36, 0, 36, 72].map((x) => (
        <mesh key={`road-x-${x}`} receiveShadow rotation-x={-Math.PI / 2} position={[x, 0, 0]}>
          <planeGeometry args={[6, 196]} />
          <meshStandardMaterial color="#59625c" roughness={0.8} />
        </mesh>
      ))}
      {[-72, -36, 0, 36, 72].map((z) => (
        <mesh key={`road-z-${z}`} receiveShadow rotation-x={-Math.PI / 2} position={[0, 0.01, z]}>
          <planeGeometry args={[196, 6]} />
          <meshStandardMaterial color="#59625c" roughness={0.8} />
        </mesh>
      ))}
      {[-72, -36, 0, 36, 72].flatMap((line) =>
        [-1.45, 1.45].map((offset) => (
          <mesh key={`lane-a-${line}-${offset}`} rotation-x={-Math.PI / 2} position={[line + offset, 0.025, 0]}>
            <planeGeometry args={[0.08, 188]} />
            <meshStandardMaterial color="#d8cfad" roughness={0.6} />
          </mesh>
        ))
      )}
      {[-72, -36, 0, 36, 72].flatMap((line) =>
        [-1.45, 1.45].map((offset) => (
          <mesh key={`lane-b-${line}-${offset}`} rotation-x={-Math.PI / 2} position={[0, 0.03, line + offset]}>
            <planeGeometry args={[188, 0.08]} />
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
      {buildingSpecs.map(([x, z, w, h, d, color], index) => (
        <group key={`${x}-${z}`} position={[x, 0, z]}>
          <mesh castShadow receiveShadow position={[0, h / 2, 0]}>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color={index % 4 === 0 ? accent : color} roughness={0.62} metalness={0.08} />
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

function HubSign({ lounge }: { lounge: Lounge }) {
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
      <Text position={[0, 2.82, 0.18]} fontSize={0.52} maxWidth={8.7} color="#17201d" anchorX="center" anchorY="middle">
        {lounge.name}
      </Text>
      <Text position={[0, 2.05, 0.18]} fontSize={0.22} maxWidth={8.4} color="#52615c" anchorX="center" anchorY="middle">
        {lounge.prompt}
      </Text>
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
      <Text position={[0, 1.2, -1.15]} rotation-x={-0.2} fontSize={0.34} color="#f7f4eb" anchorX="center">
        오픈 피치 광장
      </Text>
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
          <Text position={[0, 2.05, 0]} fontSize={0.28} color="#f7f4eb" anchorX="center">
            1:1 조용한 포드
          </Text>
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
      <Text position={[0, 1.75, 0]} fontSize={0.34} maxWidth={4.6} color="#ffffff" anchorX="center">
        {table.label}
      </Text>
      <Text position={[0, 1.28, 0]} fontSize={0.18} maxWidth={4.8} color="#f8f4ea" anchorX="center">
        {table.occupied}/{table.seats} 착석 - 근처에서 E
      </Text>
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
        <HumanoidAvatar color={blocked ? "#555555" : guest.color} skin={blocked ? "#777777" : "#f0c8a9"} name={guest.name} />
      </group>
    </Float>
  );
}

function HumanoidAvatar({
  color,
  skin,
  name,
  moving = false
}: {
  color: string;
  skin: string;
  name: string;
  moving?: boolean;
}) {
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const isMoving = moving || keys.has("w") || keys.has("a") || keys.has("s") || keys.has("d");
    const stride = isMoving ? Math.sin(clock.elapsedTime * 8) : Math.sin(clock.elapsedTime * 1.4) * 0.16;
    if (leftArm.current) leftArm.current.rotation.x = stride * 0.55 - 0.15;
    if (rightArm.current) rightArm.current.rotation.x = -stride * 0.55 - 0.15;
    if (leftLeg.current) leftLeg.current.rotation.x = -stride * 0.42;
    if (rightLeg.current) rightLeg.current.rotation.x = stride * 0.42;
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
      <Text position={[0, 2.38, 0]} fontSize={0.24} color="#ffffff" anchorX="center">
        {name}
      </Text>
    </group>
  );
}

function Player({ lounge, onSelectGuest }: LoungeWorldProps) {
  const ref = useRef<THREE.Group>(null);
  const lastSync = useRef(0);
  const movingRef = useRef(false);
  const nickname = useLoungeStore((state) => state.nickname);
  const wave = useLoungeStore((state) => state.wave);
  const joinTable = useLoungeStore((state) => state.joinTable);
  const setPlayerPosition = useLoungeStore((state) => state.setPlayerPosition);
  const velocity = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      keys.add(event.key.toLowerCase());
      if (event.code === "Space") wave();
      if (event.key.toLowerCase() === "e" && ref.current) {
        const position = ref.current.position;
        const nearestGuest = getNearest(lounge.guests, position);
        const nearestTable = getNearest(lounge.tables, position);

        if (nearestGuest && nearestGuest.distance <= INTERACTION_RADIUS) {
          onSelectGuest(nearestGuest.item);
          wave(nearestGuest.item.name);
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
  }, [joinTable, lounge, onSelectGuest, wave]);

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    direction.set(0, 0, 0);
    if (keys.has("w")) direction.z -= 1;
    if (keys.has("s")) direction.z += 1;
    if (keys.has("a")) direction.x -= 1;
    if (keys.has("d")) direction.x += 1;

    movingRef.current = direction.lengthSq() > 0;

    if (movingRef.current) {
      direction.normalize();
      velocity.lerp(direction.multiplyScalar(7.4), 0.18);
      const targetAngle = Math.atan2(velocity.x, velocity.z);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetAngle, 0.16);
    } else {
      velocity.lerp(new THREE.Vector3(0, 0, 0), 0.14);
    }

    const nextX = ref.current.position.x + velocity.x * delta;
    const nextZ = ref.current.position.z + velocity.z * delta;
    const colliders = getWorldColliders(lounge);

    if (!hitsCollider(nextX, ref.current.position.z, colliders)) {
      ref.current.position.x = THREE.MathUtils.clamp(nextX, -WORLD_LIMIT, WORLD_LIMIT);
    } else {
      velocity.x = 0;
    }

    if (!hitsCollider(ref.current.position.x, nextZ, colliders)) {
      ref.current.position.z = THREE.MathUtils.clamp(nextZ, -WORLD_LIMIT, WORLD_LIMIT);
    } else {
      velocity.z = 0;
    }

    if (clock.elapsedTime - lastSync.current > 0.18) {
      lastSync.current = clock.elapsedTime;
      setPlayerPosition([ref.current.position.x, ref.current.position.y, ref.current.position.z]);
    }
  });

  return (
    <group ref={ref} name="local-player" position={[0, 0, 7]}>
      <HumanoidAvatar color="#2b8c73" skin="#f0c8a9" name={nickname} moving={movingRef.current} />
    </group>
  );
}

function CameraRig() {
  const { camera, scene } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
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
    const radius = 14.5;
    const height = 8.4 + pitch.current * 6;
    desired.set(
      target.x + Math.sin(yaw.current) * radius,
      target.y + height,
      target.z + Math.cos(yaw.current) * radius
    );
    camera.position.lerp(desired, 0.075);
    camera.lookAt(target.x, target.y + 1.35, target.z - 1.2);
  });

  return null;
}

function distanceTo(position: Vector3Tuple, target: THREE.Vector3) {
  const dx = position[0] - target.x;
  const dz = position[2] - target.z;
  return Math.sqrt(dx * dx + dz * dz);
}

function getNearest<T extends { position: Vector3Tuple }>(items: T[], position: THREE.Vector3) {
  return items.reduce<{ item: T; distance: number } | null>((nearest, item) => {
    const distance = distanceTo(item.position, position);
    if (!nearest || distance < nearest.distance) return { item, distance };
    return nearest;
  }, null);
}

function getWorldColliders(lounge: Lounge): Collider[] {
  const buildingColliders = buildingSpecs.map(([x, z, w, , d]) => ({
    x,
    z,
    halfX: w / 2 + 0.75,
    halfZ: d / 2 + 0.75
  }));

  const tableColliders = lounge.tables.map((table) => ({
    x: table.position[0],
    z: table.position[2],
    halfX: 2.7,
    halfZ: 2.7
  }));

  const guestColliders = lounge.guests.map((guest) => ({
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
    halfZ: index % 2 ? 1.45 : 0.65
  }));

  const podColliders = podPositions.map(([x, , z]) => ({
    x,
    z,
    halfX: 2.8,
    halfZ: 2.8
  }));

  return [
    ...buildingColliders,
    ...tableColliders,
    ...guestColliders,
    ...treeColliders,
    ...benchColliders,
    ...podColliders,
    { x: 0, z: 18, halfX: 6.2, halfZ: 2.6 },
    { x: 0, z: -20, halfX: 5.5, halfZ: 0.9 }
  ];
}

function hitsCollider(x: number, z: number, colliders: Collider[]) {
  return colliders.some(
    (collider) =>
      Math.abs(x - collider.x) < collider.halfX + PLAYER_RADIUS &&
      Math.abs(z - collider.z) < collider.halfZ + PLAYER_RADIUS
  );
}
