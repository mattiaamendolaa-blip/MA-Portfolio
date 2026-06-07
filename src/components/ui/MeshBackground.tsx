"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    className:
      "left-[-12rem] top-[-8rem] h-[24rem] w-[24rem] bg-emerald-200/45 dark:bg-emerald-400/12 md:h-[30rem] md:w-[30rem]",
    duration: 18,
    x: [0, 42, -20, 0],
    y: [0, 24, 52, 0],
    scale: [1, 1.08, 0.96, 1],
  },
  {
    className:
      "right-[-10rem] top-[12rem] h-[22rem] w-[22rem] bg-blue-200/45 dark:bg-blue-400/12 md:h-[28rem] md:w-[28rem]",
    duration: 22,
    x: [0, -36, 28, 0],
    y: [0, 32, -26, 0],
    scale: [1, 0.94, 1.06, 1],
  },
  {
    className:
      "bottom-[-10rem] left-1/3 h-[18rem] w-[18rem] bg-teal-100/45 dark:bg-teal-300/10 md:h-[22rem] md:w-[22rem]",
    duration: 20,
    x: [0, 24, -18, 0],
    y: [0, -34, 18, 0],
    scale: [1, 1.05, 0.98, 1],
  },
];

export function MeshBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-neutral-50 transition-colors duration-500 dark:bg-[#0a0d16]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.03),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(248,250,252,0.98))] transition-colors duration-500 dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_38%),linear-gradient(180deg,rgba(10,13,22,0.78),rgba(10,13,22,0.97))]" />
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-[120px] transition-colors duration-500 ${blob.className}`}
          animate={{ x: blob.x, y: blob.y, scale: blob.scale }}
          transition={{
            duration: blob.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
