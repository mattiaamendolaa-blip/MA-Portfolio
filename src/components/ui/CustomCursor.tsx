"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const y = useSpring(mouseY, { stiffness: 500, damping: 28 });

  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [tabindex]");
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference">
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="absolute h-2 w-2 rounded-full bg-white"
      />
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: hovering ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
        className="absolute rounded-full border border-white"
      />
    </div>
  );
}
