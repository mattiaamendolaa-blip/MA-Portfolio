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
    <section id="skills" className="overflow-hidden py-20 md:py-28 relative">
      <div className="mx-auto max-w-8xl px-4 relative">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mt-3 font-[family:var(--font-display)] text-3xl font-bold tracking-[-0.04em] text-neutral-950 dark:text-white md:text-4xl">
            Le mie Skills
          </h2>
        </div>
        
        <motion.div 
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="mx-auto hidden w-fit max-w-full h-[84px] items-end justify-start gap-4 rounded-[2rem] border border-neutral-200 bg-white/[0.72] px-6 pb-4 shadow-[0_20px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/[0.12] dark:bg-[#0f172a]/[0.42] dark:shadow-[0_20px_60px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.04)] md:flex md:flex-nowrap overflow-visible [&::-webkit-scrollbar]:hidden relative z-10"
        >
          {skills.map((skill) => (
            <DesktopDockIcon key={skill.name} skill={skill} mouseX={mouseX} />
          ))}
        </motion.div>

        <div
          ref={scrollRef}
          className="w-full overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden md:hidden"
        >
          <div className="flex w-max gap-4 px-6">
            {[...skills, ...skills].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={`${skill.name}-${index}`} className="flex min-w-[70px] flex-col items-center gap-2">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-md shadow-black/5 dark:border-white/10 dark:bg-slate-900">
                    <Icon className={cn("h-8 w-8 transition-colors", skill.color)} />
                  </div>
                  <span className="text-center text-[10px] font-medium text-neutral-600 dark:text-neutral-400">
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

function DesktopDockIcon({ skill, mouseX }: { skill: Skill; mouseX: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = skill.icon;

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distance, [-140, 0, 140], [52, 82, 52]);
  const iconSizeTransform = useTransform(distance, [-140, 0, 140], [26, 44, 26]);
  const yTransform = useTransform(distance, [-140, 0, 140], [0, -12, 0]);

  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 150, damping: 15 });
  const iconSize = useSpring(iconSizeTransform, { mass: 0.1, stiffness: 150, damping: 15 });
  const y = useSpring(yTransform, { mass: 0.1, stiffness: 150, damping: 15 });

  return (
    <div 
      ref={ref} 
      className="group relative flex flex-col items-center justify-end shrink-0 overflow-visible"
    >
      <div className="pointer-events-none absolute -top-12 z-20 opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:opacity-100">
        <span className="whitespace-nowrap rounded-xl border border-white/70 bg-white/[0.92] px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-lg shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#111827]/[0.92] dark:text-white dark:shadow-xl">
          {skill.name}
        </span>
      </div>
      
      <motion.div 
        style={{ width: size, height: size, y }}
        className="flex items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900"
      >
        <motion.div style={{ width: iconSize, height: iconSize }}>
          <Icon 
            className={cn(
              "w-full h-full drop-shadow-sm dark:drop-shadow-md transition-colors duration-300", 
              skill.color
            )} 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}