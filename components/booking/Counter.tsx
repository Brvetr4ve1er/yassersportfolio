"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

/** +/- stepper used for adult & children guest counts. */
export function Counter({ label, hint, value, min = 0, max = 30, onChange }: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3">
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground">{label}</div>
        {hint ? <div className="text-xs text-muted-foreground">{hint}</div> : null}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          aria-label="−"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-lagoon-500/40 text-lagoon-700 transition hover:bg-lagoon-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-6 text-center font-display text-lg tabular-nums text-foreground">
          {value}
        </span>
        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          aria-label="+"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-lagoon-500/40 text-lagoon-700 transition hover:bg-lagoon-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
