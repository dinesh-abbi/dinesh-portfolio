import { useRef, useCallback } from "react";

/**
 * Magnetic hover effect hook — element pulls toward the cursor.
 * Returns event handlers to attach to any element.
 */
export function useMagneticHover(strength: number = 0.35) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.transition = "transform 0.1s linear";
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
