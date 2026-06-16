import { useRef, useCallback } from "react";

/**
 * 3D Perspective tilt + spotlight shimmer effect hook.
 * Attach ref and event handlers to any card element.
 */
export function use3DTilt(maxTilt: number = 12) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // x relative to element
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -maxTilt;
      const rotY = ((x - cx) / cx) * maxTilt;

      // Update CSS variables for shimmer position
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      el.style.setProperty("--shimmer-x", `${px}%`);
      el.style.setProperty("--shimmer-y", `${py}%`);
      el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = "transform 0.05s linear";
    },
    [maxTilt]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    el.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    el.style.setProperty("--shimmer-x", "50%");
    el.style.setProperty("--shimmer-y", "50%");
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
