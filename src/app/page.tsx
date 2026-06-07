"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/home/Hero";
import { Skills } from "@/components/home/Skills";
import { Header } from "@/components/layout/Header";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { SpotlightCard } from "@/components/ui/Spotlightcard";
import {
  ArrowUpRight,
  Terminal as TerminalIcon,
  Cpu,
  Zap,
  Globe,
  Play,
  RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"terminal" | "pipeline" | "benchmark" | "cloud">("terminal");
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchProgress, setBenchProgress] = useState({ py: 0, asm: 0 });

  const [nfcState, setNfcState] = useState<"idle" | "tapping" | "showing">("idle");

  useEffect(() => {
    if (activeTab !== "terminal") return;
    setBootLogs([]);
    const logs = [
      "Initializing Raspberry Pi Edge Node...",
      "Mounting 16GB Embedded Flash Buffer...",
      "Hooking x86 Assembly optimization routine...",
      "Video stream initialized at 720p @ 60fps...",
      "Establishing encrypted TLS Cloud Tunnel...",
      "System status: HIGH-PERFORMANCE LIVE"
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setBootLogs(prev => [...prev, log]);
      }, (index + 1) * 600);
    });
  }, [activeTab]);

  // Effetto che gestisce la durata dell'animazione del telefono prima di mostrare il risultato
  useEffect(() => {
    if (nfcState !== "tapping") return;

    const timer = setTimeout(() => {
      setNfcState("showing");
    }, 1400);

    return () => clearTimeout(timer);
  }, [nfcState]);

  const runBenchmark = () => {
    if (isBenchmarking) return;
    setIsBenchmarking(true);
    setBenchProgress({ py: 0, asm: 0 });

    setTimeout(() => setBenchProgress(p => ({ ...p, asm: 100 })), 200);

    const interval = setInterval(() => {
      setBenchProgress(p => {
        if (p.py >= 35) {
          clearInterval(interval);
          setIsBenchmarking(false);
          return p;
        }
        return { ...p, py: p.py + 5 };
      });
    }, 150);
  };

  const projectTabs = [
    { id: "terminal", icon: TerminalIcon, label: "System" },
    { id: "pipeline", icon: Cpu, label: "Data Flow" },
    { id: "benchmark", icon: Zap, label: "Perf" },
    { id: "cloud", icon: Globe, label: "Cloud" }
  ] as const;

  return (
    <>
      <MeshBackground />
      <Header />
      <main className="relative flex min-h-screen flex-col antialiased subpixel-antialiased selection:bg-emerald-500/20 w-full overflow-x-hidden">
        <Hero />

        <section id="progetti" className="px-4 py-20 sm:px-6 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl px-2">
              <h2 className="mt-3 font-[family:var(--font-display)] text-3xl font-bold tracking-[-0.04em] text-neutral-950 dark:text-neutral-50 md:text-4xl">
                I miei progetti
              </h2>
              <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                Ecco alcuni dei progetti che ci tengo a condividere
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

              {/* PROGETTO 1: ECOSYSTEM IOT */}
              <SpotlightCard className="group col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden rounded-3xl border border-neutral-200/80 dark:border-white/10 shadow-sm backdrop-blur-sm bg-white/20 dark:bg-neutral-900/10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-4 sm:p-6 lg:p-8">

                  <div className="lg:col-span-2 flex flex-col justify-between z-10 gap-6">
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-500/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">01</span>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/10">
                          Rete
                        </span>
                      </div>

                      <h3 className="mb-3 text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                        Ecosistema IoT Cloud di Videosorveglianza per la Scuola
                      </h3>

                      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4 font-normal">
                        Infrastruttura IoT end-to-end per flussi video real-time 720p. Ottimizzazione a basso livello
                        in Assembly x86 per massimizzare il throughput dei buffer di memoria su nodi edge (Raspberry Pi),
                        con orchestrazione cloud in Python e cifratura dei dati. Questo progetto l'ho fatto alle superiori col mio prof. di Sistemi e Reti e dei miei compagni di classe
                        l'idea mi ha subito incuriosito perchè sono sempre stato affascinato dal mondo dell'IT
                      </p>

                      <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-2 mb-6 list-disc pl-4 leading-relaxed">
                        <li>Ingegnerizzazione Case CAD & Stampa 3D per dissipazione termica.</li>
                        <li>Indicizzazione spazio-temporale dei metadati video.</li>
                        <li>Abbattimento Intoppi di I/O tramite routine custom a basso livello.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {["Assembly x86", "Python", "Raspberry Pi", "AutoCAD", "Linux Embedded"].map((tech) => (
                          <span key={tech} className="rounded-full border border-neutral-200 bg-neutral-100/80 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 sm:flex sm:flex-row gap-1.5 bg-neutral-100 dark:bg-neutral-950 p-1.5 rounded-xl border border-neutral-200/60 dark:border-white/5 shadow-inner relative">
                        {projectTabs.map((tab) => {
                          const isActive = activeTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              aria-selected={isActive}
                              role="tab"
                              className={`relative w-full sm:flex-1 flex items-center justify-center py-2.5 sm:py-2 text-[11px] sm:text-xs rounded-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                                isActive
                                  ? "text-emerald-700 dark:text-white font-semibold"
                                  : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-400 font-medium"
                              }`}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="active-tab-indicator"
                                  className="absolute inset-0 bg-white dark:bg-white/10 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] border border-black/5 dark:border-white/5"
                                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                />
                              )}
                              <span className="relative z-10 flex items-center gap-1.5">
                                <tab.icon className="h-3.5 w-3.5" />
                                <span className="tracking-wide">{tab.label}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 min-h-[340px] sm:min-h-[380px] bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl border border-neutral-950 dark:border-white/10 p-4 sm:p-5 font-mono text-sm relative flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="h-full w-full flex flex-col"
                      >
                        {activeTab === "terminal" && (
                          <div className="flex flex-col gap-1.5 text-emerald-400 text-xs sm:text-sm tracking-normal h-full justify-start overflow-y-auto">
                            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2 text-neutral-500">
                              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
                              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
                              <span className="text-[10px] ml-2 font-sans tracking-wider uppercase text-neutral-400">bash - core_service.py</span>
                            </div>
                            {bootLogs.map((log, i) => (
                              <div key={i} className="animate-fade-in font-medium leading-normal">{log}</div>
                            ))}
                            <div className="h-4 w-1.5 bg-emerald-400 animate-pulse mt-1 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                          </div>
                        )}

                        {activeTab === "pipeline" && (
                          <div className="h-full flex flex-col justify-center items-center gap-6 text-neutral-200 py-4 w-full">
                            <span className="text-[10px] sm:text-xs text-neutral-400 tracking-widest font-sans font-bold">ARCHITETTURA DEL DATO</span>
                            <div className="flex items-center justify-between w-full max-w-md relative px-2 sm:px-4">
                              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-neutral-800 -translate-y-1/2 z-0"></div>
                              <div className="absolute top-1/2 left-0 h-[2px] bg-emerald-500 -translate-y-1/2 z-0 animate-pulse w-full"></div>

                              <div className="z-10 flex flex-col items-center gap-1.5 bg-neutral-900 p-2 rounded-xl border border-white/5 shadow-md max-w-[80px] sm:max-w-none text-center">
                                <span className="text-lg">📹</span>
                                <span className="text-[9px] sm:text-[10px] text-neutral-400 font-sans font-semibold leading-none">720p Cam</span>
                              </div>
                              <div className="z-10 flex flex-col items-center gap-1.5 bg-neutral-900 p-2 rounded-xl border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] max-w-[80px] sm:max-w-none text-center">
                                <span className="text-lg animate-pulse text-amber-400">⚡</span>
                                <span className="text-[9px] sm:text-[10px] text-emerald-400 font-sans font-bold tracking-wider leading-none">ASM Buffer</span>
                              </div>
                              <div className="z-10 flex flex-col items-center gap-1.5 bg-neutral-900 p-2 rounded-xl border border-white/5 shadow-md max-w-[80px] sm:max-w-none text-center">
                                <span className="text-lg">☁️</span>
                                <span className="text-[9px] sm:text-[10px] text-neutral-400 font-sans font-semibold leading-none">Cloud API</span>
                              </div>
                            </div>
                            <span className="text-[10px] sm:text-[11px] text-center max-w-xs text-neutral-400 font-sans leading-relaxed px-2">
                              Il flusso video bypassa gli intoppi del Kernel Linux, scrivendo direttamente nel buffer di memoria tramite routine x86.
                            </span>
                          </div>
                        )}

                        {activeTab === "benchmark" && (
                          <div className="h-full flex flex-col justify-between py-1 gap-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2 gap-2">
                              <span className="text-[10px] sm:text-xs text-neutral-400 font-sans font-bold tracking-wider">BENCHMARK: I/O THROUGHPUT (MB/s)</span>
                              <button onClick={runBenchmark} disabled={isBenchmarking} className="self-start sm:self-auto flex items-center gap-1.5 bg-emerald-400 hover:bg-emerald-500 disabled:bg-neutral-800 text-neutral-950 disabled:text-neutral-500 text-xs font-bold px-3 py-1.5 rounded-lg transition-all font-sans">
                                <Play className="h-3 w-3 fill-current" /> {isBenchmarking ? "Calcolo..." : "Avvia Test"}
                              </button>
                            </div>

                            <div className="space-y-4 my-auto px-1 w-full">
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs text-neutral-400 font-sans">
                                  <span>Standard Python I/O Layer</span>
                                  <span className="text-[11px]">{benchProgress.py === 0 ? "0 MB/s" : `${benchProgress.py} MB/s`}</span>
                                </div>
                                <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-white/5">
                                  <motion.div 
                                    className="bg-amber-500 h-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(benchProgress.py / 100) * 100}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                  />
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-bold text-emerald-400 font-sans">
                                  <span>x86 Assembly Buffer</span>
                                  <span className="text-[11px]">{benchProgress.asm === 0 ? "0 MB/s" : `${benchProgress.asm} MB/s`}</span>
                                </div>
                                <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-white/5">
                                  <motion.div 
                                    className="bg-emerald-400 h-full shadow-[0_0_12px_rgba(52,211,153,0.4)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${benchProgress.asm}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                  />
                                </div>
                              </div>
                            </div>

                            {benchProgress.asm > 0 && (
                              <div className="text-center text-[11px] text-emerald-400 font-medium bg-emerald-500/10 py-2 rounded-lg border border-emerald-500/20 animate-fade-in font-sans mx-1">
                                Ottimizzazione a basso livello: +300% velocità svuotamento buffer.
                              </div>
                            )}
                          </div>
                        )}

                        {activeTab === "cloud" && (
                          <div className="h-full flex flex-col justify-between text-xs text-neutral-300 gap-2">
                            <div className="border-b border-white/5 pb-2 text-neutral-400 flex justify-between items-center font-sans font-bold tracking-wider">
                              <span>TELEMETRIA CLOUD CENTRALIZZATA</span>
                              <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-ping"></span>
                            </div>

                            <div className="grid grid-cols-6 gap-1.5 bg-neutral-950/70 border border-white/5 p-2 rounded-xl my-auto text-center opacity-90 relative group/map overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/90 rounded-xl opacity-0 group-hover/map:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                                <div className="text-center space-y-1 p-2 font-sans">
                                  <p className="text-emerald-400 font-bold text-[10px] tracking-wider">📍 EDGE_NODE_01 ACTIVE</p>
                                  <p className="text-[9px] text-neutral-300 font-mono">Lat: 45.4642° N | Lng: 9.1900° E</p>
                                </div>
                              </div>
                              {[...Array(18)].map((_, i) => (
                                <div key={i} className={`py-1.5 text-xs border rounded border-white/[0.01] ${i === 7 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold" : "text-neutral-800"}`}>
                                  {i === 7 ? "●" : "+"}
                                </div>
                              ))}
                            </div>

                            <div className="bg-white/[0.02] p-2 rounded-xl border border-white/5 text-[10px] sm:text-[11px] text-neutral-400 font-mono space-y-0.5">
                              <div className="truncate"><span className="text-neutral-500 font-sans font-semibold">Payload:</span> chunk_9982.bin</div>
                              <div className="truncate"><span className="text-neutral-500 font-sans font-semibold">Luogo:</span> San Donato Milanese</div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>
              </SpotlightCard>

              {/* PROGETTO 2: Biglietto da visita*/}
              <SpotlightCard className="group col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden rounded-3xl border border-neutral-200/80 dark:border-white/10 shadow-sm backdrop-blur-sm bg-white/20 dark:bg-neutral-900/10">

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-4 sm:p-6 lg:p-8 h-full">

                  <div className="lg:col-span-2 flex flex-col justify-between z-10 gap-6">
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-300/30 bg-blue-400/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-300">02</span>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/10">
                          {nfcState === "idle" && "Phygital Experience"}
                          {nfcState === "tapping" && "Lettura Tag..."}
                          {nfcState === "showing" && "E siamo connessi😊"}
                        </span>
                      </div>

                      <h3 className="mb-3 text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                        Biglietto da Visita con card NFC 215
                      </h3>

                      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4 font-normal">
                        Ecosistema hardware-software per lo scambio di contatti. Sviluppo di una web-app ultra-leggera ottimizzata per il caricamento istantaneo all'atto del "Tap" con una card NFC fisica. L'idea mi è venuta pensando ai bigliettini da visita tradizionali (di cui io facevo collezione) mi ha sempre affascinato il gesto di riceverlo da una persona, un ristorante e vedere quanto fossero belli ed intriganti i loro stili, quindi ho pensato di creare una versione digitale che potesse essere condivisa con un semplice gesto, senza bisogno di app o connessioni lente. Le mie key words erano semplice ed accessibile a tutti, senza perdere quella sensazione di condivisione con qualcuno.
                      </p>

                      <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-2 list-disc pl-4 mb-4 leading-relaxed">
                        <li>Rendere più semplice lo scambio di contatti e anche accessibile.</li>
                        <li>Ottimizzazione degli asset web per connessioni mobile 4G/5G lente.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        {["Web NFC API", "Next.js", "Tailwind", "NDEF Payload"].map((tech) => (
                          <span key={tech} className="rounded-full border border-neutral-200 bg-neutral-100/80 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl border border-neutral-950 dark:border-white/10 p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[380px] sm:min-h-[440px] shadow-[0_20px_40px_rgba(0,0,0,0.3)] w-full">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                    {nfcState === "idle" && (
                      <div className="z-10 flex flex-col items-center gap-5 text-center animate-fade-in w-full px-2">
                        <button
                          onClick={() => setNfcState("tapping")}
                          className="w-full max-w-[280px] aspect-[1.8/1] bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] flex flex-col justify-between p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/50 cursor-pointer active:scale-95 group/card"
                        >
                          <div className="flex justify-between items-center w-full">                            
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white font-sans tracking-tight">Amendola Mattia</p>
                            <p className="text-[10px] text-neutral-400 font-mono mt-0.5 tracking-wide">Full-Stack Dev.</p>
                          </div>
                        </button>
                        <p className="text-xs sm:text-sm text-neutral-300 font-sans font-medium mt-2 animate-pulse tracking-wide">
                          👆 Avvicina lo smartphone per leggere la carta
                        </p>
                      </div>
                    )}

                    {nfcState === "tapping" && (
                      <div className="z-10 w-full h-full flex items-center justify-center relative min-h-[320px]">
                        <div className="w-48 aspect-[1.586/1] bg-neutral-800/30 rounded-2xl border border-white/5 flex flex-col justify-between p-4 opacity-20 scale-95 transition-all">
                          <span className="text-[10px] text-neutral-600 font-mono">NFC CHIP</span>
                          <p className="text-[10px] font-bold text-neutral-600">PORTFOLIO CARD</p>
                        </div>

                        <motion.div
                          animate={{
                            scale: [0.2, 1, 2.2],
                            opacity: [0, 0.8, 0],
                            boxShadow: ["0 0 0px rgba(59,130,246,0)", "0 0 20px rgba(59,130,246,0.4)", "0 0 0px rgba(59,130,246,0)"],
                            borderColor: ["rgba(59,130,246,0)", "rgba(59,130,246,0.8)", "rgba(59,130,246,0)"]
                          }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4, times: [0, 0.4, 1] }}
                          className="absolute w-36 h-36 border-2 rounded-full"
                        />

                        <motion.svg
                          viewBox="0 0 240 480"
                          className="absolute w-48 sm:w-56 h-auto max-h-[350px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
                          initial={{ y: -120, scale: 1.1, rotate: -6, opacity: 0 }}
                          animate={{
                            y: [-120, 0, 6, 0, 0, 0],
                            scale: [1.1, 1, 0.97, 1, 1, 1.02],
                            rotate: [-6, 0, 0, 0, 0, 0],
                            opacity: [0, 1, 1, 1, 1, 0]
                          }}
                          transition={{
                            duration: 1.4,
                            ease: "easeInOut",
                            times: [0, 0.35, 0.45, 0.55, 0.85, 1]
                          }}
                        >
                          <defs>
                            <linearGradient id="phone-body" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#454545" />
                              <stop offset="50%" stopColor="#262626" />
                              <stop offset="100%" stopColor="#131313" />
                            </linearGradient>
                            <linearGradient id="screen-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#0d0d0d" />
                              <stop offset="40%" stopColor="#0f172a" />
                              <stop offset="100%" stopColor="#020617" />
                            </linearGradient>
                          </defs>

                          <rect x="0" y="100" width="3" height="35" rx="1.5" fill="#525252" />
                          <rect x="0" y="145" width="3" height="35" rx="1.5" fill="#525252" />
                          <rect x="237" y="120" width="3" height="50" rx="1.5" fill="#525252" />
                          <rect x="3" y="3" width="234" height="474" rx="42" fill="url(#phone-body)" stroke="#5e5e5e" strokeWidth="2.5" />
                          <rect x="12" y="12" width="216" height="456" rx="33" fill="url(#screen-glow)" />
                          <rect x="75" y="24" width="90" height="18" rx="9" fill="#000000" />
                          
                          <g transform="translate(120, 220)" textAnchor="middle">
                            <image
                              href="/NFCLogo.png"
                              x="-20"
                              y="-35"
                              width="40"
                              height="40"
                              className="animate-pulse brightness-0 invert"
                            />
                            <text x="0" y="35" className="fill-neutral-200 font-sans text-[11px] font-bold tracking-[0.15em] uppercase">
                              Lettura...
                            </text>
                          </g>
                          <rect x="80" y="456" width="80" height="4" rx="2" fill="#404040" />
                        </motion.svg>
                      </div>
                    )}

                    {nfcState === "showing" && (
                      <div className="z-10 w-full h-full flex flex-col items-center justify-center animate-fade-in relative group max-w-[290px] sm:max-w-[340px]">
                        <img
                          src="/FotoNFC.png"
                          alt="NFC Business card"
                          className="h-auto max-h-[320px] sm:max-h-[360px] w-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10 dark:ring-white/15"
                        />

                        <button
                          onClick={() => setNfcState("idle")}
                          className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-neutral-950/90 hover:bg-neutral-900 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white px-3.5 py-2 rounded-full text-xs font-mono transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 shadow-xl active:scale-95"
                        >
                          <RotateCcw className="h-3.5 w-3.5" /> Allontana telefono
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </SpotlightCard>

            </div>
          </div>
        </section>
        <Skills />
      </main>
      <footer className="relative z-10 w-full border-t border-neutral-200/50 dark:border-white/5 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400 mt-auto">
        &copy; {new Date().getFullYear()} Amendola Mattia. Tutti i diritti riservati.
      </footer>
    </>
  );
}