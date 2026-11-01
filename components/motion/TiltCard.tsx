"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/**
 * A card that leans toward the pointer and carries a soft light that follows
 * it. Mouse only: on touch there is no hover to respond to, and under reduced
 * motion it is a plain box.
 */
export default function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  /** Maximum lean, in degrees. */
  max?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glow = useTransform(
    [px, py],
    ([x, y]: number[]) =>
      `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.22), transparent 55%)`,
  );

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{ background: glow }}
      />
    </motion.div>
  );
}
