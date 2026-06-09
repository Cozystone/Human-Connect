"use client";

import { Environment, Float, Text } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Guest, Lounge, TopicTable } from "./loungeData";
import { useLoungeStore } from "./loungeStore";

type LoungeWorldProps = {
  lounge: Lounge;
  onSelectGuest: (guest: Guest) => void;
};

const keys = new Set<string>();

export function LoungeWorld({ lounge, onSelectGuest }: LoungeWorldProps) {
  return (
    <Canvas shadows camera={{ position: [0, 5.5, 8], fov: 45 }} dpr={[1, 1.6]}>
      <color attach="background" args={["#10120f"]} />
      <fog attach="fog" args={["#10120f", 12, 28]} />
      <ambientLight intensity={0.72} />
      <directionalLight castShadow position={[6, 10, 5]} intensity={1.4} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Environment preset="city" />
      <LoungeScene lounge={lounge} onSelectGuest={onSelectGuest} />
      <Player />
      <CameraRig />
    </Canvas>
  );
}

function LoungeScene({ lounge, onSelectGuest }: LoungeWorldProps) {
  return (
    <group>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.02, 0]}>
        <planeGeometry args={[18, 14]} />
        <meshStandardMaterial color="#c4b79d" roughness={0.82} metalness={0.04} />
      </mesh>

      <mesh receiveShadow position={[0, 1.65, -5.25]}>
        <boxGeometry args={[18, 3.4, 0.25]} />
        <meshStandardMaterial color="#5f736a" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[-8.85, 1.2, 0]}>
        <boxGeometry args={[0.25, 2.5, 10.5]} />
        <meshStandardMaterial color="#738177" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[8.85, 1.2, 0]}>
        <boxGeometry args={[0.25, 2.5, 10.5]} />
        <meshStandardMaterial color="#738177" roughness={0.88} />
      </mesh>

      <Signage lounge={lounge} />
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

function Signage({ lounge }: { lounge: Lounge }) {
  return (
    <group position={[0, 2.1, -5.05]}>
      <mesh>
        <boxGeometry args={[6.8, 1.45, 0.12]} />
        <meshStandardMaterial color="#f7f4eb" roughness={0.72} />
      </mesh>
      <Text position={[0, 0.28, 0.08]} fontSize={0.34} maxWidth={5.8} color="#17201d" anchorX="center" anchorY="middle">
        {lounge.name}
      </Text>
      <Text position={[0, -0.26, 0.08]} fontSize={0.16} maxWidth={5.9} color="#52615c" anchorX="center" anchorY="middle">
        {lounge.prompt}
      </Text>
    </group>
  );
}

function Stage({ accent }: { accent: string }) {
  return (
    <group position={[0, 0, 3.7]}>
      <mesh castShadow receiveShadow position={[0, 0.18, 0]}>
        <boxGeometry args={[5.5, 0.35, 1.7]} />
        <meshStandardMaterial color="#746d5f" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[-2.2, 0.75, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.1, 16]} />
        <meshStandardMaterial color={accent} roughness={0.35} />
      </mesh>
      <mesh castShadow position={[-2.2, 1.35, 0]}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial color="#222725" roughness={0.2} />
      </mesh>
      <Text position={[0, 0.65, -0.35]} rotation-x={-0.2} fontSize={0.2} color="#f7f4eb" anchorX="center">
        Pitch Zone
      </Text>
    </group>
  );
}

function PrivatePods() {
  return (
    <group>
      {[
        [-6.4, 0, 3.3],
        [6.4, 0, 3.3]
      ].map(([x, y, z], index) => (
        <group key={index} position={[x, y, z]}>
          <mesh castShadow receiveShadow position={[0, 0.06, 0]}>
            <cylinderGeometry args={[1.1, 1.1, 0.12, 48]} />
            <meshStandardMaterial color="#d7d1c1" roughness={0.88} />
          </mesh>
          <mesh position={[0, 0.78, 0]}>
            <torusGeometry args={[1.08, 0.025, 8, 72]} />
            <meshStandardMaterial color="#8fbab0" emissive="#133d35" emissiveIntensity={0.15} />
          </mesh>
          <Text position={[0, 1.2, 0]} fontSize={0.18} color="#f7f4eb" anchorX="center">
            1:1 Pod
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
        <ringGeometry args={[1.52, 1.68, 64]} />
        <meshStandardMaterial color={active ? "#ffffff" : table.color} transparent opacity={active ? 0.55 : 0.32} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.26, 48]} />
        <meshStandardMaterial color="#f2ebd8" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.18, 0.24, 0.5, 24]} />
        <meshStandardMaterial color="#8b806d" roughness={0.6} />
      </mesh>
      {Array.from({ length: table.seats }).map((_, index) => {
        const angle = (index / table.seats) * Math.PI * 2;
        const x = Math.cos(angle) * 1.72;
        const z = Math.sin(angle) * 1.72;
        return (
          <mesh key={index} castShadow receiveShadow position={[x, 0.22, z]} rotation-y={-angle}>
            <boxGeometry args={[0.46, 0.44, 0.46]} />
            <meshStandardMaterial color={index < table.occupied ? table.color : "#ddd3be"} roughness={0.78} />
          </mesh>
        );
      })}
      <Text position={[0, 1.05, 0]} fontSize={0.18} maxWidth={2.2} color="#ffffff" anchorX="center">
        {table.label}
      </Text>
      <Text position={[0, 0.78, 0]} fontSize={0.12} maxWidth={2.3} color="#f8f4ea" anchorX="center">
        {table.occupied}/{table.seats} seated
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
    ref.current.position.y = Math.sin(clock.elapsedTime * 1.5 + index) * 0.035;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.8 + index) * 0.2;
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelectGuest(guest);
  };

  return (
    <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.18}>
      <group ref={ref} position={guest.position} onClick={handleClick}>
        <mesh castShadow position={[0, 0.78, 0]}>
          <capsuleGeometry args={[0.28, 0.72, 8, 16]} />
          <meshStandardMaterial color={blocked ? "#555555" : guest.color} roughness={0.55} />
        </mesh>
        <mesh castShadow position={[0, 1.45, 0]}>
          <sphereGeometry args={[0.27, 24, 24]} />
          <meshStandardMaterial color={blocked ? "#777777" : "#f0c8a9"} roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.08, 0.31]}>
          <boxGeometry args={[0.34, 0.08, 0.04]} />
          <meshStandardMaterial color="#17201d" />
        </mesh>
        <Text position={[0, 1.9, 0]} fontSize={0.16} color="#ffffff" anchorX="center">
          {guest.name}
        </Text>
      </group>
    </Float>
  );
}

function Player() {
  const ref = useRef<THREE.Group>(null);
  const nickname = useLoungeStore((state) => state.nickname);
  const wave = useLoungeStore((state) => state.wave);
  const velocity = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      keys.add(event.key.toLowerCase());
      if (event.code === "Space") wave();
    };
    const up = (event: KeyboardEvent) => keys.delete(event.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [wave]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    direction.set(0, 0, 0);
    if (keys.has("w") || keys.has("arrowup")) direction.z -= 1;
    if (keys.has("s") || keys.has("arrowdown")) direction.z += 1;
    if (keys.has("a") || keys.has("arrowleft")) direction.x -= 1;
    if (keys.has("d") || keys.has("arrowright")) direction.x += 1;

    if (direction.lengthSq() > 0) {
      direction.normalize();
      velocity.lerp(direction.multiplyScalar(3.3), 0.22);
      const targetAngle = Math.atan2(velocity.x, velocity.z);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetAngle, 0.18);
    } else {
      velocity.lerp(new THREE.Vector3(0, 0, 0), 0.18);
    }

    ref.current.position.addScaledVector(velocity, delta);
    ref.current.position.x = THREE.MathUtils.clamp(ref.current.position.x, -7.4, 7.4);
    ref.current.position.z = THREE.MathUtils.clamp(ref.current.position.z, -4.1, 4.8);
  });

  return (
    <group ref={ref} name="local-player" position={[0, 0, 1.1]}>
      <mesh castShadow position={[0, 0.78, 0]}>
        <capsuleGeometry args={[0.31, 0.82, 8, 16]} />
        <meshStandardMaterial color="#2b8c73" roughness={0.45} />
      </mesh>
      <mesh castShadow position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.29, 24, 24]} />
        <meshStandardMaterial color="#f0c8a9" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.13, 0.34]}>
        <boxGeometry args={[0.38, 0.08, 0.04]} />
        <meshStandardMaterial color="#f8f4ea" />
      </mesh>
      <Text position={[0, 1.98, 0]} fontSize={0.16} color="#ffffff" anchorX="center">
        {nickname}
      </Text>
    </group>
  );
}

function CameraRig() {
  const { camera, scene } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const player = scene.getObjectByName("local-player");
    if (!player) return;
    target.copy(player.position);
    desired.set(target.x, target.y + 4.8, target.z + 6.8);
    camera.position.lerp(desired, 0.08);
    camera.lookAt(target.x, target.y + 1.0, target.z);
  });

  return null;
}
