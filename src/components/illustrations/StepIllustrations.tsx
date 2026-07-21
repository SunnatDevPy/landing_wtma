import { cn } from "@/lib/utils";

const STEPS = [
  /* Step 1 — Add clients */
  () => (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden>
      <rect x="20" y="20" width="120" height="80" rx="12" fill="#f4f6fb" stroke="#c5cfe3" strokeWidth="1.5" />
      <circle cx="56" cy="52" r="16" fill="#3b548d" opacity="0.15" />
      <circle cx="56" cy="48" r="8" fill="#3b548d" />
      <rect x="72" y="44" width="48" height="4" rx="2" fill="#3b548d" opacity="0.6" />
      <rect x="72" y="52" width="36" height="3" rx="1.5" fill="#c5cfe3" />
      <rect x="72" y="60" width="28" height="3" rx="1.5" fill="#c5cfe3" />
      <circle cx="120" cy="36" r="12" fill="#e62e52" opacity="0.15" />
      <path d="M116 36 L120 40 L126 32" stroke="#e62e52" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  /* Step 2 — Track contracts */
  () => (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden>
      <rect x="16" y="30" width="128" height="60" rx="10" fill="white" stroke="#c5cfe3" strokeWidth="1.5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="28" y={40 + i * 18} width="104" height="12" rx="4" fill="#f4f6fb" />
          <rect x="32" y={44 + i * 18} width={40 + i * 10} height="4" rx="2" fill="#9aabcf" />
          <rect
            x={110 - i * 8}
            y={42 + i * 18}
            width="18"
            height="8"
            rx="4"
            fill={i === 0 ? "#f59e0b" : i === 1 ? "#10b981" : "#3b548d"}
            opacity="0.7"
          />
        </g>
      ))}
      <path d="M140 24 L148 16" stroke="#e62e52" strokeWidth="2" strokeLinecap="round" />
      <circle cx="148" cy="16" r="4" fill="#e62e52" opacity="0.6" />
    </svg>
  ),
  /* Step 3 — Reports */
  () => (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden>
      <rect x="30" y="16" width="100" height="88" rx="10" fill="white" stroke="#c5cfe3" strokeWidth="1.5" />
      <rect x="30" y="16" width="100" height="20" rx="10" fill="#1a2d52" />
      <rect x="30" y="30" width="100" height="6" fill="#1a2d52" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={42 + i * 14}
          y={80 - i * 6}
          width="8"
          height={16 + i * 6}
          rx="2"
          fill="#3b548d"
          opacity={0.4 + i * 0.12}
        />
      ))}
      <circle cx="110" cy="70" r="14" fill="none" stroke="#e62e52" strokeWidth="3" strokeDasharray="22 66" />
      <rect x="42" y="48" width="40" height="3" rx="1.5" fill="#c5cfe3" />
      <rect x="42" y="56" width="28" height="3" rx="1.5" fill="#c5cfe3" />
    </svg>
  ),
];

export function StepIllustration({ step, className }: { step: number; className?: string }) {
  const Illustration = STEPS[step] ?? STEPS[0];
  return (
    <div className={cn("pointer-events-none select-none", className)}>
      <Illustration />
    </div>
  );
}
