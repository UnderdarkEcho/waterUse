export type ImpactLevel = "low" | "medium" | "high";

export function getImpactLevel(ml: number): ImpactLevel {
  if (ml < 100) return "low";
  if (ml <= 2000) return "medium";
  return "high";
}

export function getImpactColor(level: ImpactLevel): string {
  switch (level) {
    case "low":
      return "bg-emerald-500";
    case "medium":
      return "bg-amber-400";
    case "high":
      return "bg-red-500";
  }
}

/** Round percentages so SSR and client hydration produce identical style strings */
export function roundPct(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function getImpactBarWidth(ml: number, maxMl: number): number {
  if (maxMl <= 0) return 0;
  const logMl = Math.log10(Math.max(1, ml));
  const logMax = Math.log10(Math.max(1, maxMl));
  return roundPct(Math.min(100, Math.max(4, (logMl / logMax) * 100)));
}

export function getWaterDropFill(ml: number): number {
  const logMl = Math.log10(Math.max(1, ml));
  const fill = Math.min(95, Math.max(5, (logMl / 4.5) * 100));
  return roundPct(100 - fill);
}