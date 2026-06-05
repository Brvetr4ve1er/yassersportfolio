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

      {/* Center — horse silhouette, faithful to the photographed seal:
          powerful flowing mane backward/upward, head pointing right,
          neck and chest visible below the head. */}
      <g transform="translate(100, 100)" fill={fill}>
        {/* Flowing mane — multiple overlapping curves for volume */}
        <path
          d="M-2 -22 C -10 -28 -22 -26 -28 -18 C -22 -22 -16 -22 -12 -20 Z
             M-6 -16 C -16 -22 -30 -18 -32 -8 C -24 -16 -16 -16 -10 -14 Z
             M-8 -10 C -22 -12 -32 -4 -30 6 C -22 -4 -14 -8 -8 -6 Z
             M-6 -2 C -20 0 -28 8 -24 16 C -18 6 -12 4 -6 4 Z"
          opacity="0.95"
        />
        {/* Horse head + neck */}
        <path
          d="M-4 -20
             C 4 -22 12 -18 14 -12
             L 18 -8
             C 22 -6 22 -2 18 0
             L 14 2
             C 12 6 8 8 4 8
             L 4 14
             C 8 16 12 18 14 22
             L 0 22
             C -6 18 -8 12 -8 6
             L -10 0
             C -12 -6 -10 -14 -4 -20 Z"
          opacity="0.95"
        />
        {/* Inner eye highlight (negative space) */}
        <ellipse
          cx="6"
          cy="-6"
          rx="1.2"
          ry="1.6"
          fill={tone === "noir" ? "#f1e9d6" : "#0c0d0a"}
        />
        {/* Nostril */}
        <ellipse
          cx="15"
          cy="-3"
          rx="1"
          ry="0.6"
          fill={tone === "noir" ? "#f1e9d6" : "#0c0d0a"}
        />
        {/* Bottom row — five 5-pointed stars (true to the photographed seal) */}
        <g transform="translate(0, 32)" opacity="0.85">
          {[-16, -8, 0, 8, 16].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${i % 2 === 0 ? 0 : 1.5})`}>
              <path
                d="M0 -2.4 L0.7 -0.7 L2.4 -0.7 L1 0.4 L1.5 2.1 L0 1.1 L-1.5 2.1 L-1 0.4 L-2.4 -0.7 L-0.7 -0.7 Z"
                fill={fill}
              />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
