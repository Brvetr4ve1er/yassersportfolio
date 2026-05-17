import { cn } from "@/lib/utils";

type Props = {
  variant?: "mark" | "seal" | "minimal";
  className?: string;
  tone?: "bronze" | "cream" | "noir";
};

/**
 * BrandMark — abstracted from the L'Étoile de l'Est seal.
 * Three variants:
 *  - "mark"     : the star + lightning bolt (used as a recurring motif)
 *  - "seal"     : full circular seal with horse silhouette + curved lettering
 *  - "minimal"  : single thin star ornament
 *
 * This is NOT a copy of the photographed logo. It is a typographic /
 * geometric distillation that survives at any size, including 16px favicon.
 * The owner's real vector logo, once provided, replaces this component.
 */
export function BrandMark({
  variant = "mark",
  className,
  tone = "bronze",
}: Props) {
  const stroke =
    tone === "bronze" ? "#c9a35b" : tone === "cream" ? "#f1e9d6" : "#0c0d0a";
  const fill =
    tone === "bronze" ? "#c9a35b" : tone === "cream" ? "#f1e9d6" : "#0c0d0a";

  if (variant === "minimal") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-5 w-5", className)}
        aria-hidden
      >
        <path
          d="M12 2L14.09 8.26L20.5 9.18L15.75 13.64L17.18 20L12 16.77L6.82 20L8.25 13.64L3.5 9.18L9.91 8.26L12 2Z"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  if (variant === "mark") {
    // Star with embedded lightning bolt — the iconic top element of the seal.
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-7 w-7", className)}
        aria-hidden
      >
        <path
          d="M20 2L24.49 14.81L38 16.65L28 25.93L30.98 39L20 32.36L9.02 39L12 25.93L2 16.65L15.51 14.81L20 2Z"
          fill={fill}
        />
        {/* Lightning bolt notch — the silver flash through the star */}
        <path
          d="M21.5 13L17 22H21L18.5 28L24 19H20L21.5 13Z"
          fill="#f1e9d6"
        />
      </svg>
    );
  }

  // "seal" — full circular emblem
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-32 w-32", className)}
      aria-hidden
    >
      <defs>
        <path
          id="seal-top"
          d="M 30 100 A 70 70 0 0 1 170 100"
          fill="none"
        />
        <path
          id="seal-bottom"
          d="M 30 100 A 70 70 0 0 0 170 100"
          fill="none"
        />
      </defs>

      {/* Outer ring */}
      <circle cx="100" cy="100" r="92" stroke={stroke} strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="80" stroke={stroke} strokeWidth="1.5" fill="none" />
      <circle cx="100" cy="100" r="78" stroke={stroke} strokeWidth="0.3" fill="none" opacity="0.5" />

      {/* Top star (the mark) */}
      <g transform="translate(100, 26)">
        <path
          d="M0 -14L4.49 -1.19L18 0.65L8 9.93L10.98 23L0 16.36L-10.98 23L-8 9.93L-18 0.65L-4.49 -1.19L0 -14Z"
          fill={fill}
        />
        <path
          d="M1.5 -3L-3 6H1L-1.5 12L4 3H0L1.5 -3Z"
          fill={tone === "noir" ? "#f1e9d6" : "#0c0d0a"}
        />
      </g>

      {/* Top text curving */}
      <text fontSize="11" letterSpacing="3" fill={fill} fontFamily="serif" fontWeight="500">
        <textPath href="#seal-top" startOffset="50%" textAnchor="middle">
          L'ÉTOILE · DE L'EST
        </textPath>
      </text>

      {/* Bottom text */}
      <text fontSize="10" letterSpacing="4" fill={fill} fontFamily="serif" fontWeight="500">
        <textPath href="#seal-bottom" startOffset="50%" textAnchor="middle">
          CONSTANTINE
        </textPath>
      </text>

      {/* Center — abstracted horse silhouette with flowing mane */}
      <g transform="translate(100, 105)" fill={fill}>
        {/* Horse head */}
        <path
          d="M-10 -18 C -18 -16, -22 -8, -20 0 C -18 8, -10 14, -2 14 L 12 14 C 16 14, 18 10, 18 6 L 18 -2 C 18 -6, 16 -10, 12 -12 L 4 -14 C 4 -18, 0 -22, -4 -22 C -8 -22, -10 -20, -10 -18 Z"
          opacity="0.95"
        />
        {/* Eye */}
        <circle cx="8" cy="-2" r="1" fill={tone === "noir" ? "#f1e9d6" : "#0c0d0a"} />
        {/* Mane wisps */}
        <path
          d="M-12 -18 C -20 -22, -28 -18, -30 -10 M-14 -14 C -24 -16, -30 -8, -28 -2 M-12 -10 C -22 -8, -26 -2, -24 4"
          stroke={fill}
          strokeWidth="1.5"
          fill="none"
          opacity="0.85"
        />
        {/* Tiny stars under */}
        <g transform="translate(0, 22)" opacity="0.7">
          <circle cx="-14" cy="0" r="1" />
          <circle cx="-7" cy="2" r="1.2" />
          <circle cx="0" cy="0" r="1" />
          <circle cx="7" cy="2" r="1.2" />
          <circle cx="14" cy="0" r="1" />
        </g>
      </g>
    </svg>
  );
}
