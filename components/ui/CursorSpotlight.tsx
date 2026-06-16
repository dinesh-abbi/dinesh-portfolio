"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    let targetX = -400;
    let targetY = -400;
    let currentX = -400;
    let currentY = -400;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      // Lerp for smooth trailing
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;

      el.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-10 will-change-transform"
      style={{
        width: 380,
        height: 380,
        background:
          "radial-gradient(circle, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.012) 35%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
}
