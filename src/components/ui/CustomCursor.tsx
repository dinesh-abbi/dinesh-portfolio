import { useCursor } from "../../hooks/useCursor";
import { cn } from "../../lib/cn";

export default function CustomCursor() {
  const { position, isHovered, isVisible } = useCursor();

  // On touch/mobile devices, isVisible will remain false, hiding the custom cursor
  if (!isVisible) return null;

  return (
    <div
      className={cn("custom-cursor", isHovered && "hovered")}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
