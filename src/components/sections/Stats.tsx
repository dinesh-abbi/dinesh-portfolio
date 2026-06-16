import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

interface StatItemProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

function StatItem({ targetValue, prefix = "", suffix = "", label }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          
          const obj = { val: 0 };
          animate(obj, {
            val: targetValue,
            round: 1,
            duration: 1800,
            ease: "outExpo",
            onUpdate: () => {
              setDisplayValue(Math.floor(obj.val));
            }
          });
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [targetValue]);

  return (
    <div ref={itemRef} className="flex flex-col items-center justify-center p-6 text-center select-text">
      <span className="text-3xl md:text-5xl font-bold font-mono text-accent-blue-light mb-2">
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </span>
      <span className="text-sm md:text-base text-text-secondary font-medium tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function Stats() {
  const statsList = [
    { targetValue: 10000, suffix: "+", label: "Students Enabled" },
    { targetValue: 4, label: "Partner Colleges" },
    { targetValue: 15, label: "GPU Nodes Configured" },
    { targetValue: 60, prefix: "~", suffix: "%", label: "Manual Work Reduced" }
  ];

  return (
    <section className="w-full bg-bg-secondary/30 border-y border-border-custom py-4 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-custom">
        {statsList.map((stat, index) => (
          <StatItem
            key={index}
            targetValue={stat.targetValue}
            prefix={stat.prefix}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
