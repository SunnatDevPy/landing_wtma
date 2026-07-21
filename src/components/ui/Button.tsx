import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  icon?: ReactNode;
  external?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  className,
  icon,
  external,
  onClick,
}: ButtonProps) {
  const base = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]",
    variant === "primary" &&
      "bg-brand-500 text-white shadow-lg shadow-brand-500/25 hover:bg-brand-500/90 hover:shadow-xl hover:shadow-brand-500/30",
    variant === "secondary" &&
      "border border-brand-800/15 bg-white text-brand-900 shadow-sm hover:border-brand-600/30 hover:bg-brand-50",
    variant === "ghost" &&
      "text-brand-800/70 hover:bg-brand-600/5 hover:text-brand-900",
    className,
  );

  const content = (
    <>
      {children}
      {icon && (
        <span
          className={cn(
            "flex size-7 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
            variant === "primary" ? "bg-white/20" : "bg-brand-800/5",
          )}
        >
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={base}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={base} onClick={onClick}>
      {content}
    </button>
  );
}
