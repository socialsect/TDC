import type { ComponentProps, ReactNode } from "react";
import { ArrowIcon } from "./icons";

type Variant = "primary" | "secondary" | "inverse" | "ghost-inverse";

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-[0.9375rem] font-medium tracking-[-0.005em] " +
  "transition-[background-color,color,box-shadow,transform] duration-300 ease-(--ease-out-soft) active:scale-[0.98] " +
  "focus-visible:outline-2 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:shadow-lift focus-visible:outline-ink",
  secondary: "border border-ink bg-paper text-ink hover:bg-ink hover:text-paper focus-visible:outline-ink",
  inverse: "bg-paper text-ink hover:shadow-[0_18px_40px_-16px_rgb(255_255_255/0.35)] focus-visible:outline-paper",
  "ghost-inverse": "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink focus-visible:outline-paper",
};

type Props = ComponentProps<"a"> & {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
};

/** All CTAs on the homepage are links (anchors, tel:, WhatsApp, external pages). */
export function ButtonLink({ variant = "primary", arrow = false, className = "", children, ...rest }: Props) {
  const external = rest.href?.startsWith("http");
  return (
    <a
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden
          className="grid size-7 place-items-center rounded-full bg-current/10 transition-transform duration-300 ease-(--ease-out-soft) group-hover/btn:translate-x-0.5"
        >
          <ArrowIcon className="size-3.5" />
        </span>
      )}
    </a>
  );
}

export function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.22em] ${
        inverse ? "text-muted-inverse" : "text-muted"
      }`}
    >
      <span aria-hidden className={`h-px w-8 ${inverse ? "bg-paper/40" : "bg-ink/30"}`} />
      {children}
    </p>
  );
}
