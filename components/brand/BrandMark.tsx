import { cn } from "@/lib/utils";

/**
 * Oxygen Island brand mark — a custom SVG distilling the venue's DNA:
 *  · a circle = the lagoon
 *  · a frond = the Bouchaoui forest canopy framing it
 *  · the "O" of OXYGEN as the lagoon itself
 *
 * Three variants:
 *  · "mark"     — just the icon (header, favicon)
 *  · "wordmark" — icon + OXYGEN ISLAND lockup
 *  · "stamp"    — full circular badge with curved provenance lettering
 *
 * Until the owner supplies their real vector logo this stands in.
 */
type Props = {
  variant?: "mark" | "wordmark" | "stamp";
  className?: string;
  tone?: "sand" | "lagoon" | "ink";
};

export function BrandMark({
  variant = "mark",
  className,
  tone = "sand",
}: Props) {
  const color =
    tone === "lagoon" ? "#1d8da0" : tone === "ink" ? "#0c1a1d" : "#f4e8d0";
  const accent =
    tone === "lagoon" ? "#5fb9c6" : tone === "ink" ? "#1d8da0" : "#1d8da0";

  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-8 w-8", className)}
        aria-hidden
      >
        {/* Lagoon water circle */}
        <circle cx="24" cy="26" r="14" fill={accent} opacity="0.95" />
        {/* Caustic water highlights */}
        <path
          d="M14 24q4 -3 8 0 t8 0"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M16 28q3 -2 6 0 t6 0"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        {/* Palm frond arching over from upper-left */}
        <path
          d="M8 16 C 14 8, 22 6, 28 10"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M10 16 L7 14 M13 13 L11 10 M17 11 L16 7 M22 9 L22 5 M27 9 L29 6"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Sun above the lagoon */}
        <circle cx="36" cy="12" r="2.5" fill={color} />
      </svg>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={cn("inline-flex items-center gap-3", className)}>
        <BrandMark variant="mark" tone={tone} className="h-7 w-7" />
        <span
          className="font-display text-[0.95rem] font-bold uppercase leading-none tracking-[0.18em]"
          style={{ color }}
        >
          Oxygen <span style={{ color: accent }}>Island</span>
        </span>
      </div>
    );
  }

  // stamp — circular badge with curved lettering
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-32 w-32", className)}
      aria-hidden
    >
      <defs>
        <path id="oxi-top" d="M 30 100 A 70 70 0 0 1 170 100" fill="none" />
        <path
          id="oxi-bottom"
          d="M 35 100 A 65 65 0 0 0 165 100"
          fill="none"
        />
      </defs>
      <circle cx="100" cy="100" r="92" stroke={color} strokeWidth="1" />
      <circle cx="100" cy="100" r="78" stroke={color} strokeWidth="1.5" />

      {/* Sun glyph top */}
      <g transform="translate(100, 32)">
        <circle cx="0" cy="0" r="6" fill={color} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="0"
            y1="-10"
            x2="0"
            y2="-14"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            transform={`rotate(${deg})`}
          />
        ))}
      </g>

      {/* Center lagoon + palm arch + caustic ripples */}
      <g transform="translate(100, 110)">
        <circle cx="0" cy="0" r="32" fill={accent} opacity="0.95" />
        <path
          d="M-24 -8 q12 -8 24 0 t24 0"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M-22 4 q10 -6 20 0 t20 0"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M-20 14 q9 -5 18 0 t18 0"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
        {/* Palm frond arching */}
        <path
          d="M-44 -20 C -28 -42, -2 -46, 22 -32"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        {[
          [-38, -22, -42, -28],
          [-30, -32, -32, -38],
          [-20, -38, -20, -44],
          [-8, -42, -6, -48],
          [4, -42, 8, -47],
          [16, -38, 22, -42],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        ))}
      </g>

      <text
        fontSize="11"
        letterSpacing="3.5"
        fill={color}
        fontFamily="ui-sans-serif"
        fontWeight="600"
      >
        <textPath href="#oxi-top" startOffset="50%" textAnchor="middle">
          OXYGEN · ISLAND
        </textPath>
      </text>
      <text
        fontSize="9"
        letterSpacing="4"
        fill={color}
        fontFamily="ui-sans-serif"
        fontWeight="500"
      >
        <textPath href="#oxi-bottom" startOffset="50%" textAnchor="middle">
          BOUCHAOUI · ALGER
        </textPath>
      </text>
    </svg>
  );
}
