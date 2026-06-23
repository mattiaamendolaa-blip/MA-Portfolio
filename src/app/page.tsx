"use client";

import { useState, useEffect, useCallback } from "react";
import { Hero } from "@/components/home/Hero";
import { Skills } from "@/components/home/Skills";
import { Header } from "@/components/layout/Header";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { SpotlightCard } from "@/components/ui/Spotlightcard";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
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
    { id: "terminal", icon: TerminalIcon, label: "System", lang: "en" },
    { id: "pipeline", icon: Cpu, label: "Data Flow", lang: "en" },
    { id: "benchmark", icon: Zap, label: "Perf", lang: "en" },
    { id: "cloud", icon: Globe, label: "Cloud", lang: "en" }
  ] as const;

  const tabIds = projectTabs.map((t) => t.id);

  const handleTabKeyDown = useCallback((e: React.KeyboardEvent) => {
    const idx = tabIds.indexOf(activeTab);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % tabIds.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + tabIds.length) % tabIds.length;
    else return;
    e.preventDefault();
    const nextId = tabIds[next];
    setActiveTab(nextId);
    document.getElementById(`tab-${nextId}`)?.focus();
  }, [activeTab]);

  return (
    <>
      <ScrollProgress />
      <MeshBackground />
      <Header />
      <main id="main-content" className="relative flex min-h-screen flex-col antialiased subpixel-antialiased w-full overflow-x-hidden">
        <Hero />

        <section id="progetti" className="relative px-6 py-28 md:px-12 lg:px-24 overflow-hidden scroll-mt-24">
          <div className="absolute top-[25%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-6xl w-full">
            <div className="mb-24 max-w-2xl">
              <span className="block w-10 h-0.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mb-4" aria-hidden="true" />
              <h2 className="font-[family:var(--font-display)] text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-5xl">
                I miei progetti
              </h2>
              <p className="mt-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">
                Ecco le architetture e le esperienze digitali che ho curato da cima a fondo.
              </p>
            </div>

            <div className="flex flex-col gap-40 md:gap-52">

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
                  className="w-full lg:w-[45%] flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/[0.12] border border-emerald-500/[0.15] dark:border-emerald-400/[0.12] px-2.5 py-1 rounded-lg backdrop-blur-sm shadow-[inset_0_1px_0_rgba(52,211,153,0.1)]">
                        Progetto 01
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                        Rete & Embedded
                      </span>
                    </motion.div>

                    <motion.h3 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 leading-tight">
                      Ecosistema IoT Cloud di Videosorveglianza per la Scuola
                    </motion.h3>

                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">
                      Infrastruttura IoT end-to-end per flussi video real-time 720p. Ottimizzazione a basso livello
                      in Assembly x86 per massimizzare il throughput dei buffer di memoria su nodi edge (Raspberry Pi),
                      con orchestrazione cloud in Python e cifratura dei dati.
                      <span className="block mt-3 p-3 bg-white/[0.45] dark:bg-white/[0.03] border border-white/[0.3] dark:border-white/[0.06] rounded-xl text-xs italic text-neutral-600 dark:text-neutral-300 shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-lg">
                        "Questo progetto l'ho fatto alle superiori col mio prof. di Sistemi e Reti e dei miei compagni di classe, l'idea mi ha subito incuriosito perché sono sempre stato affascinato dal mondo dell'IT."
                      </span>
                    </motion.p>

                    <motion.ul variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="text-xs text-neutral-600 dark:text-neutral-300 space-y-2.5 list-none pl-1 font-medium">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5">✓</span> Ingegnerizzazione Case CAD & Stampa 3D per dissipatione termica.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5">✓</span> Indicizzazione spazio-temporale dei metadati video.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5">✓</span> Abbattimento Intoppi di I/O tramite routine custom a basso livello.
                      </li>
                    </motion.ul>
                  </div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {["Assembly x86", "Python", "Raspberry Pi", "AutoCAD", "Linux Embedded"].map((tech) => (
                        <span key={tech} className="rounded-full border border-white/[0.3] bg-white/[0.5] px-2.5 py-0.5 text-xs font-medium text-neutral-700 backdrop-blur-lg shadow-[0_1px_4px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.6)] dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-neutral-300 dark:shadow-[0_1px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                <div className="w-full lg:w-[55%] relative group/canvas">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <SpotlightCard className="w-full overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-md bg-white/40 dark:bg-neutral-900/40 p-4">
                    <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" aria-hidden="true" />

                    <div role="tablist" onKeyDown={handleTabKeyDown} className="grid grid-cols-2 sm:flex sm:flex-row gap-1 bg-neutral-100/80 dark:bg-neutral-950 p-1 rounded-xl border border-neutral-200/50 dark:border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)] mb-4 relative z-20">
                      {projectTabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            id={`tab-${tab.id}`}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            role="tab"
                            className={`relative w-full sm:flex-1 flex items-center justify-center py-2 text-xs rounded-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-1 ${isActive
                              ? "text-emerald-700 dark:text-white font-semibold"
                              : "text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 font-medium"
                              }`}
                            {...{
                              "aria-selected": isActive,
                              "aria-controls": `panel-${tab.id}`,
                              tabIndex: isActive ? 0 : -1
                            }}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="active-tab-indicator"
                                className="absolute inset-0 bg-white dark:bg-white/10 rounded-lg shadow-sm border border-black/5 dark:border-white/5"
                                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                              />
                            )}
                            <span className="relative z-10 flex items-center gap-1.5">
                              <tab.icon className="h-3.5 w-3.5" aria-hidden="true" />
                              <span className="tracking-wide" lang={tab.lang}>{tab.label}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div 
                      id={`panel-${activeTab}`}
                      role="tabpanel"
                      aria-labelledby={`tab-${activeTab}`}
                      tabIndex={0}
                      className="min-h-[320px] sm:min-h-[350px] bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-xl border border-white/[0.06] p-5 font-mono text-sm relative flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.3)] overflow-hidden z-10"
                    >

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                          transition={{ duration: 0.2 }}
                          className="h-full w-full flex flex-col"
                        >
                          {activeTab === "terminal" && (
                            <div className="flex flex-col gap-1.5 text-emerald-400 text-xs sm:text-sm tracking-normal h-full justify-start overflow-y-auto">
                              <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2 text-neutral-500">
                                <div className="h-2 w-2 rounded-full bg-red-500/60"></div>
                                <div className="h-2 w-2 rounded-full bg-yellow-500/60"></div>
                                <div className="h-2 w-2 rounded-full bg-green-500/60"></div>
                                <span className="text-[10px] ml-1 font-sans text-neutral-400">bash - core_service.py</span>
                              </div>
                              {bootLogs.map((log, i) => (
                                <div key={i} className="font-medium leading-normal animate-fade-in">{log}</div>
                              ))}
                              <div className="h-4 w-1.5 bg-emerald-400 animate-pulse mt-1 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                            </div>
                          )}

                          {activeTab === "pipeline" && (
                            <div className="h-full flex flex-col justify-center items-center gap-6 text-neutral-200 py-4 w-full">
                              <span className="text-[10px] text-neutral-400 tracking-widest font-sans font-bold">ARCHITETTURA DEL DATO</span>
                              <div className="flex items-center justify-between w-full max-w-sm relative px-2">
                                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-neutral-800 -translate-y-1/2 z-0"></div>
                                <div className="absolute top-1/2 left-0 h-[2px] bg-emerald-500 -translate-y-1/2 z-0 animate-pulse w-full"></div>

                                <div className="z-10 flex flex-col items-center gap-1.5 bg-neutral-900 p-2 rounded-xl border border-white/5 shadow-md text-center">
                                  <span className="text-base">📹</span>
                                  <span className="text-[9px] sm:text-[10px] text-neutral-400 font-sans font-semibold">720p Cam</span>
                                </div>
                                <div className="z-10 flex flex-col items-center gap-1.5 bg-neutral-900 p-2 rounded-xl border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] text-center">
                                  <span className="text-base animate-pulse text-amber-400">⚡</span>
                                  <span className="text-[9px] sm:text-[10px] text-emerald-400 font-sans font-bold">ASM Buffer</span>
                                </div>
                                <div className="z-10 flex flex-col items-center gap-1.5 bg-neutral-900 p-2 rounded-xl border border-white/5 shadow-md text-center">
                                  <span className="text-base">☁️</span>
                                  <span className="text-[9px] sm:text-[10px] text-neutral-400 font-sans font-semibold">Cloud API</span>
                                </div>
                              </div>
                              <p className="text-[11px] text-center max-w-xs text-neutral-400 font-sans leading-relaxed px-2">
                                Il flusso video bypassa gli intoppi del Kernel Linux, scrivendo direttamente nel buffer di memoria tramite routine x86.
                              </p>
                            </div>
                          )}

                          {activeTab === "benchmark" && (
                            <div className="h-full flex flex-col justify-between py-1 gap-4">
                              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-[10px] text-neutral-400 font-sans font-bold tracking-wider">THROUGHPUT (MB/s)</span>
                                <button type="button" onClick={runBenchmark} disabled={isBenchmarking} className="flex items-center gap-1 bg-emerald-400 hover:bg-emerald-500 disabled:bg-neutral-800 text-neutral-950 disabled:text-neutral-500 text-xs font-bold px-2.5 py-1 rounded-lg transition-all font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70">
                                  <Play className="h-3 w-3 fill-current" /> {isBenchmarking ? "Calcolo..." : "Test"}
                                </button>
                              </div>

                              <div className="space-y-4 my-auto w-full">
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs text-neutral-400 font-sans">
                                    <span>Standard Python I/O</span>
                                    <span>{benchProgress.py === 0 ? "0 MB/s" : `${benchProgress.py} MB/s`}</span>
                                  </div>
                                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-white/5">
                                    <motion.div className="bg-amber-500 h-full" initial={{ width: 0 }} animate={{ width: `${benchProgress.py}%` }} />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs font-bold text-emerald-400 font-sans">
                                    <span>x86 Assembly Buffer</span>
                                    <span>{benchProgress.asm === 0 ? "0 MB/s" : `${benchProgress.asm} MB/s`}</span>
                                  </div>
                                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-white/5">
                                    <motion.div className="bg-emerald-400 h-full shadow-[0_0_12px_rgba(52,211,153,0.4)]" initial={{ width: 0 }} animate={{ width: `${benchProgress.asm}%` }} />
                                  </div>
                                </div>
                              </div>

                              {benchProgress.asm > 0 && (
                                <div className="text-center text-[11px] text-emerald-400 font-medium bg-emerald-500/10 py-1.5 rounded-lg border border-emerald-500/20 font-sans">
                                  Ottimizzazione a basso livello: +300% velocità di svuotamento.
                                </div>
                              )}
                            </div>
                          )}

                          {activeTab === "cloud" && (
                            <div className="h-full flex flex-col justify-between text-xs text-neutral-300 gap-2">
                              <div className="border-b border-white/5 pb-2 text-neutral-400 flex justify-between items-center font-sans font-bold tracking-wider">
                                <span>TELEMETRIA CLOUD</span>
                                <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-ping"></span>
                              </div>

                              <div className="grid grid-cols-6 gap-1 bg-neutral-950/70 border border-white/5 p-2 rounded-xl my-auto text-center relative group/map overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/90 rounded-xl opacity-0 group-hover/map:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                                  <div className="text-center font-sans">
                                    <p className="text-emerald-400 font-bold text-[10px]">📍 EDGE_NODE_01 ACTIVE</p>
                                    <p className="text-[9px] text-neutral-400 font-mono">45.4642° N | 9.1900° E</p>
                                  </div>
                                </div>
                                {[...Array(18)].map((_, i) => (
                                  <div key={i} className={`py-1 text-xs border rounded border-white/[0.01] ${i === 7 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold" : "text-neutral-800"}`}>
                                    {i === 7 ? "●" : "+"}
                                  </div>
                                ))}
                              </div>

                              <div className="bg-white/[0.02] p-2 rounded-xl border border-white/5 text-[10px] font-mono space-y-0.5">
                                <div className="truncate"><span className="text-neutral-500 font-sans font-semibold">Payload:</span> chunk_9982.bin</div>
                                <div className="truncate"><span className="text-neutral-500 font-sans font-semibold">Luogo:</span> San Donato Milanese</div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </SpotlightCard>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16"
              >
                <div className="w-full lg:w-[55%] relative group/canvas">
                  <div className="absolute -inset-4 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <SpotlightCard className="w-full overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-md bg-white/40 dark:bg-neutral-900/40 p-5 min-h-[420px] sm:min-h-[460px] flex flex-col justify-center items-center relative">
                    <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" aria-hidden="true" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

                    {nfcState === "idle" && (
                      <div className="z-10 flex flex-col items-center gap-5 text-center animate-fade-in w-full px-2">
                        <button
                          type="button"
                          onClick={() => setNfcState("tapping")}
                          className="w-full max-w-[250px] aspect-[1.8/1] bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between p-4 text-left transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(59,130,246,0.1)] active:scale-95 group/card cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                        >
                          <div>
                            <p className="text-sm font-bold text-white font-sans tracking-tight">Amendola Mattia</p>
                            <p className="text-[9px] text-neutral-400 font-mono tracking-wide">Full-Stack Dev.</p>
                          </div>
                        </button>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans font-medium mt-2 animate-pulse">
                          👆 Clicca sulla card per fare il "Tap" con lo smartphone
                        </p>
                      </div>
                    )}

                    {nfcState === "tapping" && (
                      <div className="z-10 w-full h-full flex items-center justify-center relative min-h-[320px]">
                        <div className="w-44 aspect-[1.586/1] bg-neutral-800/30 rounded-2xl border border-white/5 flex flex-col justify-between p-4 opacity-10 scale-95">
                          <span className="text-[9px] text-neutral-600 font-mono">NFC CHIP</span>
                        </div>

                        <motion.div
                          animate={{
                            scale: [0.2, 1, 2.2],
                            opacity: [0, 0.8, 0],
                          }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                          className="absolute w-32 h-32 border-2 border-blue-500/50 rounded-full"
                        />

                        <motion.svg
                          viewBox="0 0 240 480"
                          className="absolute w-44 sm:w-52 h-auto max-h-[330px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
                          initial={{ y: -100, scale: 1.1, rotate: -6, opacity: 0 }}
                          animate={{
                            y: [-100, 0, 6, 0, 0, 0],
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
                              <stop offset="0%" stopColor="#404040" />
                              <stop offset="100%" stopColor="#171717" />
                            </linearGradient>
                            <linearGradient id="screen-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#0f172a" />
                              <stop offset="100%" stopColor="#020617" />
                            </linearGradient>
                          </defs>
                          <rect x="3" y="3" width="234" height="474" rx="42" fill="url(#phone-body)" stroke="#4a4a4a" strokeWidth="2" />
                          <rect x="12" y="12" width="216" height="456" rx="33" fill="url(#screen-glow)" />
                          <rect x="75" y="22" width="90" height="18" rx="9" fill="#000000" />

                          <g transform="translate(120, 185)" role="img" aria-label="Logo NFC animato">
                            <title>Logo NFC animato</title>
                            <image
                              href="/NFCLogo.png"
                              x="-30"
                              y="-30"
                              width="60"
                              height="60"
                              aria-label="Logo NFC"
                              className="animate-pulse invert drop-shadow-[0_0_12px_rgba(96,165,250,0.6)] brightness-200"
                            />
                          </g>

                          <g transform="translate(120, 245)" textAnchor="middle">
                            <text x="0" y="0" className="fill-blue-400 font-sans text-xs font-bold tracking-[0.15em] uppercase animate-pulse">
                              Lettura...
                            </text>
                          </g>
                        </motion.svg>
                      </div>
                    )}

                    {nfcState === "showing" && (
                      <div className="z-10 w-full h-full flex flex-col items-center justify-center animate-fade-in relative group max-w-[260px] sm:max-w-[300px]">
                        <img
                          src="/FotoNFC.png"
                          alt="Schermata biglietto da visita NFC"
                          className="h-auto max-h-[300px] sm:max-h-[340px] w-full object-contain rounded-2xl shadow-xl ring-1 ring-white/10"
                        />
                        <button
                          type="button"
                          onClick={() => setNfcState("idle")}
                          className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-neutral-950/90 hover:bg-neutral-900 backdrop-blur-md border border-white/10 text-neutral-300 px-3 py-1.5 rounded-full text-xs font-mono transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
                        >
                          <RotateCcw className="h-3 w-3" /> Allontana telefono
                        </button>
                      </div>
                    )}
                  </SpotlightCard>
                </div>

                <div className="w-full lg:w-[45%] flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-500/[0.12] border border-blue-500/[0.15] dark:border-blue-400/[0.12] px-2.5 py-1 rounded-lg backdrop-blur-sm shadow-[inset_0_1px_0_rgba(59,130,246,0.1)]">
                        Progetto 02
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                        {nfcState === "showing" ? "E siamo connessi 😊" : "Phygital Experience"}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 leading-tight">
                      Biglietto da Visita con card NFC 215
                    </h3>

                    <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">
                      Ecosistema hardware-software per lo scambio di contatti. Sviluppo di una web-app ultra-leggera ottimizzata per il caricamento istantaneo all'atto del "Tap" con una card NFC fisica.
                      <span className="block mt-3 p-3 bg-white/[0.45] dark:bg-white/[0.03] border border-white/[0.3] dark:border-white/[0.06] rounded-xl text-xs italic text-neutral-600 dark:text-neutral-300 shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-lg">
                        "L'idea mi è venuta pensando ai bigliettini da visita tradizionali (di cui io facevo collezione): mi ha sempre affascinato il gesto di riceverlo e vedere quanto fossero intriganti i loro stili. Ho creato una versione digitale per condividere tutto con un simple gesto, senza app. Le mie keyword? Semplice ed accessibile."
                      </span>
                    </p>

                    <ul className="text-xs text-neutral-600 dark:text-neutral-300 space-y-2.5 list-none pl-1 font-medium">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">✓</span> Rendere più semplice e accessibile lo scambio di contatti commerciali.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">✓</span> Ottimizzazione estrema degli asset per connessioni mobile 4G/5G critiche o sature.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {["Web NFC API", "HTML", "NDEF Payload"].map((tech) => (
                        <span key={tech} className="rounded-full border border-white/[0.3] bg-white/[0.5] px-2.5 py-0.5 text-xs font-medium text-neutral-700 backdrop-blur-lg shadow-[0_1px_4px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.6)] dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-neutral-300 dark:shadow-[0_1px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <div className="mx-auto max-w-xs" aria-hidden="true">
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-white/[0.08]" />
        </div>

        <Skills />
      </main>
      <footer className="relative z-10 w-full border-t border-white/[0.2] dark:border-white/[0.06] py-10 mt-auto backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-3">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            &copy; {new Date().getFullYear()} Amendola Mattia. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Progettato e sviluppato con attenzione al dettaglio.
          </p>
        </div>
      </footer>
      <ScrollToTop />
    </>
  );
}