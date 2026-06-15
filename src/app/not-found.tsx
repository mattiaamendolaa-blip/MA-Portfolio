"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, RoundedBox, Grid, SoftShadows } from "@react-three/drei";
import { useRouter } from "next/navigation";

interface CableProps {
  isConnected: boolean;
  onConnect: () => void;
}
function CinematicCable({ isConnected, onConnect }: CableProps) {
  const { raycaster, pointer, camera } = useThree();
  const tubeRef = useRef<THREE.Mesh>(null);
  const plugRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);

  const socketPos = useMemo(() => new THREE.Vector3(0, 0.25, 0.38), []);
  const basePos = useMemo(() => new THREE.Vector3(0.7, -1.8, -0.2), []);
  const plugPos = useRef(new THREE.Vector3(0.5, -0.6, 0.7));

  const trackingPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.7), []);
  const intersection = useMemo(() => new THREE.Vector3(), []);
  const dummyObj = useMemo(() => new THREE.Object3D(), []);
  const targetQuaternion = useMemo(() => new THREE.Quaternion(), []);

  useFrame(() => {
    if (isDragging && !isConnected) {
      raycaster.setFromCamera(pointer, camera);
      if (raycaster.ray.intersectPlane(trackingPlane, intersection)) {
        intersection.x = Math.max(-2, Math.min(2, intersection.x));
        intersection.y = Math.max(-1.8, Math.min(1.4, intersection.y));
        
        const maxLength = 2.4; 
        if (intersection.distanceTo(basePos) > maxLength) {
          const dir = new THREE.Vector3().subVectors(intersection, basePos).normalize();
          intersection.copy(basePos).addScaledVector(dir, maxLength);
        }
        plugPos.current.copy(intersection);
      }
    } else if (isConnected) {
      plugPos.current.lerp(socketPos, 0.15);
    }

    const localZ = new THREE.Vector3(0, 0, 1);
    if (plugRef.current) {
      localZ.applyQuaternion(plugRef.current.quaternion);
    }
    const plugBackPos = plugPos.current.clone().addScaledVector(localZ, 0.28);

    const midPoint1 = new THREE.Vector3(basePos.x + 0.1, basePos.y + 0.3, basePos.z);
    const distance = plugPos.current.distanceTo(socketPos);
    const sag = isConnected ? 0.3 : Math.max(0.15, 1.2 - distance * 0.4);
    const midPoint2 = new THREE.Vector3(plugBackPos.x, plugBackPos.y - sag, plugBackPos.z - 0.1);
    
    const curve = new THREE.CubicBezierCurve3(basePos, midPoint1, midPoint2, plugBackPos);

    if (tubeRef.current) {
      tubeRef.current.geometry.dispose(); 
      tubeRef.current.geometry = new THREE.TubeGeometry(curve, 40, 0.045, 12, false);
    }

    if (plugRef.current) {
      plugRef.current.position.copy(plugPos.current);
      
      if (isConnected) {
        targetQuaternion.identity();
      } else {
        const tangent = curve.getTangentAt(1.0).normalize();
        const lookDir = tangent.clone().negate();
        
        dummyObj.position.copy(plugPos.current);
        dummyObj.lookAt(plugPos.current.clone().add(lookDir));
        targetQuaternion.copy(dummyObj.quaternion);
      }
      
      plugRef.current.quaternion.slerp(targetQuaternion, 0.15);
    }
  });

  return (
    <group>
      <mesh ref={tubeRef} castShadow receiveShadow>
        <tubeGeometry args={[new THREE.LineCurve3(basePos, plugPos.current), 2, 0.045, 8, false]} />
        <meshStandardMaterial attach="material" color="#111113" roughness={0.9} metalness={0.1} />
      </mesh>

      <group
        ref={plugRef}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (!isConnected) setIsDragging(true);
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          setIsDragging(false);
          if (plugPos.current.distanceTo(socketPos) < 0.45) {
            onConnect();
          }
        }}
      >
        <group position={[0, 0, 0.15]}>
          {/* Corpo Plastica Trasparente */}
          <RoundedBox args={[0.2, 0.14, 0.32]} radius={0.015} smoothness={4} castShadow>
            <meshPhysicalMaterial 
              attach="material"
              color="#ffffff" 
              transparent={true} 
              opacity={0.3} 
              roughness={0.1}
              transmission={0.96} 
              thickness={0.7} 
              clearcoat={1}
            />
          </RoundedBox>
          
          <RoundedBox args={[0.16, 0.12, 0.14]} radius={0.02} position={[0, 0, 0.18]} castShadow>
            <meshStandardMaterial attach="material" color="#2563eb" roughness={0.6} metalness={0.2} />
          </RoundedBox>
          
          <RoundedBox args={[0.04, 0.03, 0.2]} radius={0.005} position={[0, 0.08, -0.05]} rotation={[-0.1, 0, 0]}>
            <meshStandardMaterial attach="material" color="#cccccc" roughness={0.1} metalness={0.9} />
          </RoundedBox>
          
          <group position={[0, -0.05, -0.14]}>
            {Array.from({ length: 8 }).map((_, i) => (
              <mesh key={i} position={[-0.07 + i * 0.02, 0, 0]}>
                <boxGeometry args={[0.008, 0.01, 0.03]} />
                <meshStandardMaterial attach="material" color="#fcd34d" metalness={1} roughness={0.1} />
              </mesh>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
}

// --- SWITCH DI RETE TIPIZZATO ---
function NetworkSwitch({ isConnected }: { isConnected: boolean }) {
  // Parsing del colore esplicito per prevenire errori TypeScript/React
  const ledColor = isConnected ? "#10b981" : "#ef4444";
  const ledEmissive = isConnected ? "#10b981" : "#7f1d1d";

  return (
    <group position={[0, 0.25, 0]}>
      <RoundedBox args={[3.6, 0.48, 0.8]} radius={0.05} smoothness={5} castShadow receiveShadow>
        <meshPhysicalMaterial attach="material" color="#212329" metalness={0.8} roughness={0.2} clearcoat={0.3} />
      </RoundedBox>
      
      <RoundedBox args={[3.45, 0.38, 0.01]} radius={0.015} position={[0, 0, 0.401]}>
        <meshStandardMaterial attach="material" color="#0b0c0e" roughness={0.9} metalness={0.3} />
      </RoundedBox>

      {/* SFP Port Sinistra */}
      <group position={[-0.5, -0.05, 0.41]}>
        <RoundedBox args={[0.22, 0.22, 0.03]} radius={0.005}>
          <meshStandardMaterial attach="material" color="#5e6d81" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0, -0.012]}>
          <boxGeometry args={[0.18, 0.18, 0.01]} />
          <meshStandardMaterial attach="material" color="#000000" roughness={1} />
        </mesh>
      </group>

      {/* Porta RJ45 Centrale (Target) */}
      <group position={[0, -0.05, 0.41]}>
        <RoundedBox args={[0.26, 0.19, 0.03]} radius={0.01}>
          <meshStandardMaterial attach="material" color="#64748b" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <mesh position={[0, 0, -0.011]}>
          <boxGeometry args={[0.22, 0.15, 0.01]} />
          <meshStandardMaterial attach="material" color="#000000" roughness={1} />
        </mesh>
        {/* LED Tipizzato */}
        <mesh position={[0.08, 0.12, 0.015]}>
          <boxGeometry args={[0.02, 0.02, 0.01]} />
          <meshStandardMaterial 
            attach="material"
            color={ledColor} 
            emissive={ledEmissive} 
            emissiveIntensity={isConnected ? 4 : 0.4} 
          />
        </mesh>
      </group>

      {/* SFP Port Destra */}
      <group position={[0.5, -0.05, 0.41]}>
        <RoundedBox args={[0.22, 0.22, 0.03]} radius={0.005}>
          <meshStandardMaterial attach="material" color="#5e6d81" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0, -0.012]}>
          <boxGeometry args={[0.18, 0.18, 0.01]} />
          <meshStandardMaterial attach="material" color="#000000" roughness={1} />
        </mesh>
      </group>

      <pointLight position={[0, -0.04, 0.45]} distance={1} intensity={isConnected ? 3 : 0} color="#10b981" />
    </group>
  );
}

// --- AMBIENTE 3D ---
function Core3DScene({ onSystemOnline }: { onSystemOnline: () => void }) {
  const [isConnected, setIsConnected] = useState(false);
  
  return (
    <>
      <color attach="background" args={["#08080a"]} />
      <Environment preset="studio" />
      <SoftShadows size={2.5} focus={0.5} samples={18} />
      
      <Grid position={[0, -2.5, 0]} args={[40, 40]} sectionColor="#1a1b1e" cellColor="#111112" sectionThickness={1.5} fadeDistance={30} />

      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[6, 9, 5]} 
        intensity={2.8} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0003}
      />
      <pointLight position={[-1.5, -0.6, 1.5]} intensity={1.5} color="#06b6d4" />

      <NetworkSwitch isConnected={isConnected} />
      <CinematicCable isConnected={isConnected} onConnect={() => {
        setIsConnected(true);
        onSystemOnline();
      }} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        {/* Shadow Material Tipizzato Correttamente */}
        <shadowMaterial attach="material" transparent={true} opacity={0.4} color="#000000" />
      </mesh>
    </>
  );
}

// --- PAGINA ROOT ---
export default function NotFound() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="relative w-screen h-screen bg-[#08080a] overflow-hidden antialiased select-none flex items-center justify-center p-6 text-neutral-100">
      <div className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing">
        {isMounted && (
          <Canvas shadows camera={{ position: [0, 0, 3.2], fov: 40 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
            <Core3DScene onSystemOnline={() => {
              setTimeout(() => router.push("/"), 1500);
            }} />
          </Canvas>
        )}
      </div>
    </main>
  );
}