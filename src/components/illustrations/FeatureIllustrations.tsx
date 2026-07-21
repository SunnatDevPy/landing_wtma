import { cn } from "@/lib/utils";

const ILLUSTRATIONS = [
  /* 0 — Clients */
  () => (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden>
      <rect x="8" y="12" width="48" height="56" rx="8" fill="#e8ecf5" stroke="#c5cfe3" strokeWidth="1" />
      <circle cx="24" cy="30" r="8" fill="#3b548d" opacity="0.8" />
      <rect x="36" y="26" width="14" height="3" rx="1.5" fill="#9aabcf" />
      <rect x="36" y="32" width="10" height="2" rx="1" fill="#c5cfe3" />
      <rect x="16" y="46" width="32" height="3" rx="1.5" fill="#c5cfe3" />
      <rect x="16" y="53" width="24" height="3" rx="1.5" fill="#c5cfe3" />
      <rect x="64" y="20" width="48" height="48" rx="8" fill="#f4f6fb" stroke="#c5cfe3" strokeWidth="1" />
      <circle cx="80" cy="38" r="10" fill="#e62e52" opacity="0.7" />
      <circle cx="96" cy="38" r="10" fill="#3b548d" opacity="0.7" />
      <rect x="72" y="54" width="32" height="3" rx="1.5" fill="#c5cfe3" />
    </svg>
  ),
  /* 1 — Contracts */
  () => (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden>
      <rect x="20" y="8" width="80" height="64" rx="6" fill="white" stroke="#c5cfe3" strokeWidth="1.5" />
      <rect x="30" y="20" width="40" height="3" rx="1.5" fill="#3b548d" />
      <rect x="30" y="28" width="60" height="2" rx="1" fill="#c5cfe3" />
      <rect x="30" y="34" width="50" height="2" rx="1" fill="#c5cfe3" />
      <rect x="30" y="46" width="60" height="14" rx="4" fill="#f4f6fb" stroke="#c5cfe3" strokeWidth="1" />
      <rect x="34" y="50" width="20" height="2" rx="1" fill="#9aabcf" />
      <rect x="58" y="50" width="16" height="2" rx="1" fill="#e62e52" opacity="0.6" />
      <rect x="72" y="58" width="14" height="6" rx="3" fill="#10b981" opacity="0.7" />
    </svg>
  ),
  /* 2 — Payments */
  () => (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden>
      <rect x="16" y="24" width="88" height="40" rx="10" fill="#1a2d52" />
      <rect x="24" y="34" width="20" height="14" rx="3" fill="#e62e52" opacity="0.8" />
      <rect x="50" y="38" width="40" height="3" rx="1.5" fill="white" opacity="0.6" />
      <rect x="50" y="46" width="28" height="2" rx="1" fill="white" opacity="0.3" />
      <circle cx="90" cy="44" r="8" fill="#10b981" opacity="0.8" />
      <path d="M86 44 L89 47 L94 40" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  /* 3 — Finance report */
  () => (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden>
      {[20, 35, 28, 50, 42, 58].map((h, i) => (
        <rect
          key={i}
          x={16 + i * 16}
          y={64 - h}
          width="10"
          height={h}
          rx="2"
          fill={i % 2 === 0 ? "#3b548d" : "#e62e52"}
          opacity={0.5 + i * 0.08}
        />
      ))}
      <line x1="12" y1="64" x2="108" y2="64" stroke="#c5cfe3" strokeWidth="1" />
    </svg>
  ),
  /* 4 — Excel */
  () => (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden>
      <rect x="24" y="12" width="72" height="56" rx="6" fill="white" stroke="#c5cfe3" strokeWidth="1.5" />
      <rect x="24" y="12" width="72" height="14" rx="6" fill="#10b981" opacity="0.8" />
      <rect x="24" y="22" width="72" height="2" fill="#10b981" opacity="0.3" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={32 + c * 22}
            y={30 + r * 10}
            width="16"
            height="6"
            rx="1"
            fill={c === 0 ? "#e8ecf5" : "#f4f6fb"}
            stroke="#c5cfe3"
            strokeWidth="0.5"
          />
        )),
      )}
      <path d="M88 52 L96 60 L108 44" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  /* 5 — Dashboard */
  () => (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden>
      <rect x="10" y="10" width="100" height="60" rx="8" fill="#0f1a30" />
      <rect x="18" y="18" width="28" height="18" rx="4" fill="#1a2d52" stroke="#3b548d" strokeWidth="0.5" />
      <rect x="50" y="18" width="28" height="18" rx="4" fill="#1a2d52" stroke="#3b548d" strokeWidth="0.5" />
      <rect x="82" y="18" width="20" height="18" rx="4" fill="#1a2d52" stroke="#e62e52" strokeWidth="0.5" opacity="0.8" />
      <rect x="18" y="42" width="56" height="22" rx="4" fill="#1a2d52" stroke="#3b548d" strokeWidth="0.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={22 + i * 10} y={56 - i * 3} width="6" height={8 + i * 3} rx="1" fill="#3b548d" opacity={0.5 + i * 0.1} />
      ))}
      <circle cx="92" cy="53" r="10" fill="none" stroke="#e62e52" strokeWidth="3" strokeDasharray="20 43" />
    </svg>
  ),
];

export function FeatureIllustration({ index, className }: { index: number; className?: string }) {
  const Illustration = ILLUSTRATIONS[index] ?? ILLUSTRATIONS[0];
  return (
    <div className={cn("pointer-events-none select-none opacity-80", className)}>
      <Illustration />
    </div>
  );
}
