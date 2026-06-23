"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, RoundedBox, Grid } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface CableProps {
  isConnected: boolean;
  onConnect: () => void;
}

function CinematicCable({ isConnected, onConnect }: CableProps) {
  const { raycaster, pointer, camera } = useThree();
  const tubeRef = useRef<THREE.Mesh>(null);
  const plugRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);

  const socketPos = useMemo(() => new THREE.Vector3(0, 0.20, 0.42), []);
  const basePos = useMemo(() => new THREE.Vector3(0.7, -1.8, -0.2), []);
  const plugPos = useRef(new THREE.Vector3(0.5, -0.6, 0.7));
  const plugVelocity = useRef(new THREE.Vector3(0, 0, 0));
  const smoothPlugPos = useRef(new THREE.Vector3(0.5, -0.6, 0.7));

  const trackingPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.7), []);
  const intersection = useMemo(() => new THREE.Vector3(), []);
  const dummyObj = useMemo(() => new THREE.Object3D(), []);
  const targetQuaternion = useMemo(() => new THREE.Quaternion(), []);

  const _localZ = useMemo(() => new THREE.Vector3(), []);
  const _plugBackPos = useMemo(() => new THREE.Vector3(), []);
  const _midPoint1 = useMemo(() => new THREE.Vector3(), []);
  const _midPoint2 = useMemo(() => new THREE.Vector3(), []);
  const _dir = useMemo(() => new THREE.Vector3(), []);
  const _tangent = useMemo(() => new THREE.Vector3(), []);
  const _lookTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    if (isDragging && !isConnected) {
      raycaster.setFromCamera(pointer, camera);
      if (raycaster.ray.intersectPlane(trackingPlane, intersection)) {
        intersection.x = Math.max(-2, Math.min(2, intersection.x));
        intersection.y = Math.max(-1.8, Math.min(1.4, intersection.y));

        const maxLength = 2.4;
        if (intersection.distanceTo(basePos) > maxLength) {
          _dir.subVectors(intersection, basePos).normalize();
          intersection.copy(basePos).addScaledVector(_dir, maxLength);
        }
        plugPos.current.copy(intersection);
      }
    } else if (isConnected) {
      plugPos.current.lerp(socketPos, 1 - Math.pow(0.001, dt));
    }

    const lerpFactor = 1 - Math.pow(0.00001, dt);
    const prev = smoothPlugPos.current.clone();
    smoothPlugPos.current.lerp(plugPos.current, lerpFactor);
    plugVelocity.current.subVectors(smoothPlugPos.current, prev).divideScalar(dt);

    _localZ.set(0, 0, 1);
    if (plugRef.current) {
      _localZ.applyQuaternion(plugRef.current.quaternion);
    }
    _plugBackPos.copy(smoothPlugPos.current).addScaledVector(_localZ, 0.28);

    _midPoint1.set(basePos.x + 0.1, basePos.y + 0.5, basePos.z);

    const distance = smoothPlugPos.current.distanceTo(socketPos);
    const cableLength = smoothPlugPos.current.distanceTo(basePos);
    const gravity = 0.45;
    const baseSag = isConnected ? 0.25 : gravity * cableLength * 0.4;
    const velocitySag = Math.min(0.15, Math.abs(plugVelocity.current.y) * 0.02);
    const sag = baseSag + velocitySag;

    const midX = (_plugBackPos.x + basePos.x) * 0.5;
    const midY = Math.min(_plugBackPos.y, basePos.y) - sag;
    _midPoint2.set(midX, midY, _plugBackPos.z - 0.05);

    const curve = new THREE.CubicBezierCurve3(basePos, _midPoint1, _midPoint2, _plugBackPos);

    if (tubeRef.current) {
      tubeRef.current.geometry.dispose();
      tubeRef.current.geometry = new THREE.TubeGeometry(curve, 24, 0.045, 8, false);
    }

    if (plugRef.current) {
      plugRef.current.position.copy(smoothPlugPos.current);

      if (isConnected) {
        targetQuaternion.identity();
      } else {
        _tangent.copy(curve.getTangentAt(1.0)).normalize().negate();
        _lookTarget.copy(smoothPlugPos.current).add(_tangent);
        dummyObj.position.copy(smoothPlugPos.current);
        dummyObj.lookAt(_lookTarget);
        targetQuaternion.copy(dummyObj.quaternion);
      }

      plugRef.current.quaternion.slerp(targetQuaternion, 1 - Math.pow(0.0001, dt));
    }
  });

  return (
    <group>
      <mesh ref={tubeRef} castShadow receiveShadow>
        <tubeGeometry args={[new THREE.LineCurve3(basePos, plugPos.current), 2, 0.045, 8, false]} />
        <meshStandardMaterial color="#111113" roughness={0.9} metalness={0.1} />
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
          <RoundedBox args={[0.2, 0.14, 0.32]} radius={0.015} smoothness={4} castShadow>
            <meshPhysicalMaterial
              color="#ffffff"
              transparent={true}
              opacity={0.3}
              roughness={0.1}
              transmission={0.96}
              thickness={0.7}
              clearcoat={1}
              ior={1.5}
            />
          </RoundedBox>

          <RoundedBox args={[0.16, 0.12, 0.14]} radius={0.02} position={[0, 0, 0.18]} castShadow>
            <meshStandardMaterial color="#2563eb" roughness={0.6} metalness={0.2} />
          </RoundedBox>

          <RoundedBox args={[0.04, 0.03, 0.2]} radius={0.005} position={[0, 0.08, -0.05]} rotation={[-0.1, 0, 0]}>
            <meshStandardMaterial color="#cccccc" roughness={0.1} metalness={0.9} />
          </RoundedBox>

          <group position={[0, -0.05, -0.14]}>
            {Array.from({ length: 8 }).map((_, i) => (
              <mesh key={i} position={[-0.07 + i * 0.02, 0, 0]}>
                <boxGeometry args={[0.008, 0.01, 0.03]} />
                <meshStandardMaterial color="#fcd34d" metalness={1} roughness={0.1} />
              </mesh>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
}

function NetworkSwitch({ isConnected }: { isConnected: boolean }) {
  const ledColor = isConnected ? "#10b981" : "#ef4444";
  const ledEmissive = isConnected ? "#10b981" : "#7f1d1d";

  return (
    <group position={[0, 0.25, 0]}>
      <RoundedBox args={[3.6, 0.48, 0.8]} radius={0.05} smoothness={5} castShadow receiveShadow>
        <meshPhysicalMaterial color="#212329" metalness={0.8} roughness={0.2} clearcoat={0.3} />
      </RoundedBox>

      <RoundedBox args={[3.45, 0.38, 0.01]} radius={0.015} position={[0, 0, 0.401]}>
        <meshStandardMaterial color="#0b0c0e" roughness={0.9} metalness={0.3} />
      </RoundedBox>

      <group position={[-0.5, -0.05, 0.41]}>
        <RoundedBox args={[0.12, 0.12, 0.03]} radius={0.005}>
          <meshStandardMaterial color="#5e6d81" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0, -0.012]}>
          <boxGeometry args={[0.08, 0.08, 0.01]} />
          <meshStandardMaterial color="#000000" roughness={1} />
        </mesh>
      </group>

      <group position={[0, -0.05, 0.41]}>
        <RoundedBox args={[0.26, 0.19, 0.03]} radius={0.01}>
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <mesh position={[0, 0, -0.011]}>
          <boxGeometry args={[0.22, 0.15, 0.01]} />
          <meshStandardMaterial color="#000000" roughness={1} />
        </mesh>
        <mesh position={[0.08, 0.12, 0.015]}>
          <boxGeometry args={[0.02, 0.02, 0.01]} />
          <meshStandardMaterial
            color={ledColor}
            emissive={ledEmissive}
            emissiveIntensity={isConnected ? 4 : 0.4}
          />
        </mesh>
      </group>

      <group position={[0.5, -0.05, 0.41]}>
        <RoundedBox args={[0.12, 0.12, 0.03]} radius={0.005}>
          <meshStandardMaterial color="#5e6d81" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0, -0.012]}>
          <boxGeometry args={[0.08, 0.08, 0.01]} />
          <meshStandardMaterial color="#000000" roughness={1} />
        </mesh>
      </group>

      <pointLight position={[0, -0.04, 0.45]} distance={1} intensity={isConnected ? 3 : 0} color="#10b981" />
    </group>
  );
}

function Core3DScene({ onSystemOnline }: { onSystemOnline: () => void }) {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <>
      <color attach="background" args={["#08080a"]} />
      <Environment preset="studio" />

      <Grid position={[0, -2.5, 0]} args={[40, 40]} sectionColor="#1a1b1e" cellColor="#111112" sectionThickness={1.5} fadeDistance={30} />

      <ambientLight intensity={0.2} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={2.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
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
        <shadowMaterial transparent={true} opacity={0.4} color="#000000" />
      </mesh>
    </>
  );
}

function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 rounded-full border-2 border-neutral-700 border-t-emerald-500 animate-spin" />
        <p className="text-xs font-mono text-neutral-500 tracking-wider">Caricamento scena 3D...</p>
      </div>
    </div>
  );
}

export default function NotFound() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleManualReturn = () => {
    setIsSwitching(true);
    setTimeout(() => router.push("/"), 600);
  };

  return (
    <main className="relative w-screen h-screen bg-[#08080a] overflow-hidden antialiased select-none flex items-center justify-center font-sans">

      {/* Interfaccia Desktop */}
      <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">

        <div className="absolute top-8 left-8 xl:top-12 xl:left-12">
          <h1 className="text-6xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 drop-shadow-[0_0_40px_rgba(255,255,255,0.08)] tracking-tighter leading-none">404</h1>
          <p className="text-lg xl:text-xl font-medium text-neutral-400 mt-2">Connessione persa</p>
          <p className="text-xs font-mono text-neutral-600 mt-1 tracking-wider">ERR_CONNECTION_REFUSED</p>
        </div>

        <div className="absolute bottom-10 left-8 xl:bottom-12 xl:left-12 flex flex-col items-start gap-5">
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] max-w-md pointer-events-auto">
            <p className="text-sm xl:text-base font-medium text-neutral-200 leading-relaxed">
              Ops, è saltato il collegamento! Collega il cavo nella porta corretta per ripristinare il sistema.
            </p>
            <p className="text-xs font-mono mt-3 flex items-center gap-2">
              <span className={`inline-block h-2 w-2 rounded-full ${isConnected ? "bg-emerald-500 shadow-[0_0_6px_#10b981]" : "bg-red-500 shadow-[0_0_6px_#ef4444] animate-pulse"}`} />
              <span className={isConnected ? "text-emerald-400" : "text-red-400"}>
                {isConnected ? "Connesso — ripristino in corso..." : "Stato: Disconnesso"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-5 pointer-events-auto">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Oppure</span>

            <button
              onClick={handleManualReturn}
              className={`group flex items-center gap-4 py-2 px-3 bg-white/[0.04] backdrop-blur-xl border ${isSwitching ? 'border-emerald-500/40' : 'border-white/[0.08] hover:border-white/[0.15]'} rounded-2xl transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70`}
            >
              <div className="relative w-14 h-7 bg-neutral-950 rounded-full border border-neutral-800 shadow-inner p-1 overflow-hidden flex items-center">
                <div
                  className={`w-5 h-5 rounded-full shadow-md transition-all duration-300 ${isSwitching ? 'bg-emerald-500 translate-x-7 shadow-[0_0_10px_#10b981]' : 'bg-neutral-500 translate-x-0'}`}
                ></div>
              </div>
              <span className={`font-semibold pr-2 text-sm transition-colors duration-300 ${isSwitching ? 'text-emerald-400' : 'text-neutral-300'}`}>
                Riattiva ed esci
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scena 3D */}
      <div className="hidden md:block absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing">
        {isMounted && (
          <Canvas shadows="soft" camera={{ position: [0, 0.4, 4.0], fov: 42 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
            <Core3DScene onSystemOnline={() => {
              setIsConnected(true);
              setTimeout(() => router.push("/"), 1500);
            }} />
          </Canvas>
        )}
      </div>

      {/* Interfaccia Mobile */}
      <div className="flex md:hidden absolute inset-0 z-30 flex-col items-center justify-center p-6 text-center">
        <div className="space-y-6 max-w-sm w-full">
          <div className="w-64 h-64 mx-auto -mb-4">
            <DotLottieReact
              src="/creaturina404.lottie"
              loop
              autoplay
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-neutral-100">Questa pagina non esiste</h2>
            <p className="text-sm text-neutral-400 leading-relaxed px-4">
              Ops, sembra che la pagina che stai cercando non esiste!
            </p>
          </div>

          <button
  onClick={handleManualReturn}
  disabled={isSwitching}
  className={`
    group relative w-full flex items-center justify-center gap-3 py-4 px-6
    rounded-2xl font-medium tracking-wide transition-all duration-500 ease-out
    active:scale-[0.96] overflow-hidden isolate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70
    ${isSwitching
      ? 'bg-neutral-100 text-neutral-900 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] border-transparent cursor-default'
      : 'bg-gradient-to-b from-neutral-800/80 to-neutral-900/90 text-neutral-200 border border-neutral-700/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_20px_-6px_rgba(0,0,0,0.5)] hover:border-neutral-600/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_10px_25px_-6px_rgba(0,0,0,0.7)] hover:text-white'
    }
  `}
>
  {!isSwitching && (
    <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-[50%] pointer-events-none -z-10" />
  )}

  {isSwitching ? (
    <>
      <svg className="w-5 h-5 text-neutral-900 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className="font-bold">Ritorno alla home...</span>
    </>
  ) : (
    <>
      <span>Ritorna alla Home</span>
      <svg
        className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-neutral-100 transition-all duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </>
  )}
</button>
        </div>
      </div>

    </main>
  );
}
