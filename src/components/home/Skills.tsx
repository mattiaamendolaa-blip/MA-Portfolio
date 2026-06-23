"use client";

import { useEffect, useRef } from "react";
import { IconType } from "react-icons";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  SiAngular,
  SiDocker,
  SiFigma,
  SiGit,
  SiGraphql,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiKotlin,
  SiSwift,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

const skills: Skill[] = [
  { name: "React", icon: SiReact, color: "text-[#0284c7] dark:text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-neutral-950 dark:text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#1d4ed8] dark:text-[#3178C6]" },
  { name: "Kotlin (Android)", icon: SiKotlin, color: "text-[#6d3bf5] dark:text-[#7F52FF]" },
  { name: "Swift (iOS)", icon: SiSwift, color: "text-[#e0432b] dark:text-[#F05138]" },
  { name: "Angular", icon: SiAngular, color: "text-[#b91c1c] dark:text-[#DD0031]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#0f766e] dark:text-[#38B2AC]" },
  { name: "Java", icon: FaJava, color: "text-[#ea580c] dark:text-[#ED8B00]" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-[#166534] dark:text-[#339933]" },
  { name: "Spring Boot", icon: SiSpringboot, color: "text-[#4d7c0f] dark:text-[#6DB33F]" },
  { name: "GraphQL", icon: SiGraphql, color: "text-[#be185d] dark:text-[#E10098]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#1e3a8a] dark:text-[#4169E1]" },
  { name: "MongoDB", icon: SiMongodb, color: "text-[#15803d] dark:text-[#47A248]" },
  { name: "Redis", icon: SiRedis, color: "text-[#b91c1c] dark:text-[#DC382D]" },
  { name: "Docker", icon: SiDocker, color: "text-[#0369a1] dark:text-[#2496ED]" },
  { name: "Kubernetes", icon: SiKubernetes, color: "text-[#1d4ed8] dark:text-[#326CE5]" },
  { name: "Git", icon: SiGit, color: "text-[#c2410c] dark:text-[#F05032]" },
  { name: "Figma", icon: SiFigma, color: "text-[#c2410c] dark:text-[#F24E1E]" },
];

export function Skills() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollLeft = 10;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft = el.scrollWidth - el.clientWidth - 10;
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="skills" className="overflow-x-clip pt-20 pb-28 md:pt-28 md:pb-36 relative scroll-mt-24">
      <div className="mx-auto max-w-8xl px-4 relative">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mt-3 font-[family:var(--font-display)] text-3xl font-bold tracking-[-0.04em] text-neutral-950 dark:text-white md:text-4xl text-balance">
            Le mie Skills
          </h2>
        </div>
        
        {/* MODIFICATO SOLO: md:flex md:flex-nowrap -> xl:flex xl:flex-nowrap */}
        <motion.div 
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="mx-auto hidden w-fit max-w-full h-[84px] items-end justify-start gap-4 rounded-[2rem] border border-white/[0.3] bg-white/[0.5] px-6 pb-4 shadow-[0_20px_40px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-1px_0_rgba(255,255,255,0.15)] backdrop-blur-[36px] backdrop-saturate-[1.7] transition-all duration-500 dark:border-white/[0.1] dark:bg-white/[0.04] dark:shadow-[0_20px_60px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(255,255,255,0.02)] dark:backdrop-saturate-[1.3] xl:flex xl:flex-nowrap overflow-visible [&::-webkit-scrollbar]:hidden relative z-10"
        >
          {skills.map((skill) => (
            <DesktopDockIcon key={skill.name} skill={skill} mouseX={mouseX} />
          ))}
        </motion.div>

        {/* MODIFICATO SOLO: md:hidden -> xl:hidden */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden xl:hidden"
        >
          <div className="flex w-max gap-4 px-6">
            {[...skills, ...skills].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={`${skill.name}-${index}`} className="flex min-w-[70px] flex-col items-center gap-2">
                  <div className="rounded-2xl border border-white/[0.3] bg-white/[0.6] p-3 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl dark:border-white/[0.1] dark:bg-white/[0.06] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <Icon className={cn("h-8 w-8 transition-colors", skill.color)} />
                  </div>
                  <span className="text-center text-[10px] font-medium text-neutral-700 dark:text-neutral-300">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}

const springConfig = { mass: 0.05, stiffness: 300, damping: 20 };

function DesktopDockIcon({ skill, mouseX }: { skill: Skill; mouseX: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = skill.icon;

  const distance = useTransform(mouseX, (val: number) => {
    const el = ref.current;
    if (!el) return Infinity;
    const bounds = el.getBoundingClientRect();
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distance, [-160, 0, 160], [52, 82, 52]);
  const iconSizeTransform = useTransform(distance, [-160, 0, 160], [26, 44, 26]);
  const yTransform = useTransform(distance, [-160, 0, 160], [0, -12, 0]);

  const size = useSpring(sizeTransform, springConfig);
  const iconSize = useSpring(iconSizeTransform, springConfig);
  const y = useSpring(yTransform, springConfig);

  return (
    <div 
      ref={ref} 
      className="group relative flex flex-col items-center justify-end shrink-0 overflow-visible"
    >
      <div className="pointer-events-none absolute -top-12 z-20 opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:opacity-100">
        <span className="whitespace-nowrap rounded-xl border border-white/[0.4] bg-white/[0.75] px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl backdrop-saturate-[1.6] dark:border-white/[0.12] dark:bg-white/[0.08] dark:text-white dark:shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]">
          {skill.name}
        </span>
      </div>
      
      <motion.div
        style={{ width: size, height: size, y, willChange: "width, height, transform" }}
        className="flex items-center justify-center rounded-2xl border border-white/[0.35] bg-white/[0.65] shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl dark:border-white/[0.1] dark:bg-white/[0.06] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        <motion.div style={{ width: iconSize, height: iconSize, willChange: "width, height" }}>
          <Icon
            className={cn(
              "w-full h-full drop-shadow-sm dark:drop-shadow-md",
              skill.color
            )}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}