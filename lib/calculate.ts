import { Activity, WaterScopeId } from "./activities";

export interface CalculationOptions {
  includeIndirect: boolean;
  /** AI text and other cited ranges. Defaults to the activity's default scope. */
  waterScope?: WaterScopeId;
}

export interface CalculationResult {
  totalMl: number;
  directMl: number;
  indirectMl: number;
  /**
   * Set when the cited figure is a range with no single central value.
   * Display this. totalMl is the high end, for bar length only.
   */
  citedRangeMl?: [number, number];
  scopeLabel?: string;
}

export function calculateWater(
  activity: Activity,
  quantity: number,
  options: CalculationOptions
): CalculationResult {
  const qty = Math.max(0, quantity);

  if (activity.citedWater) {
    const cited = activity.citedWater;
    const scope =
      cited.scopes.find((s) => s.scope === (options.waterScope ?? cited.defaultScope)) ??
      cited.scopes[0];
    const low = scope.lowMlPerUnit * qty;
    const high = scope.highMlPerUnit * qty;
    return {
      totalMl: high,
      directMl: 0,
      indirectMl: 0,
      citedRangeMl: [low, high],
      scopeLabel: scope.label,
    };
  }

  if (activity.calculationType === "fixed") {
    const directPerUnit = activity.fixedMlDirect ?? activity.fixedMlPerUnit ?? 0;
    const indirectPerUnit = activity.fixedMlIndirect ?? 0;
    const directMl = directPerUnit * qty;
    const indirectMl = indirectPerUnit * qty;

    return {
      totalMl: options.includeIndirect ? directMl + indirectMl : directMl,
      directMl,
      indirectMl,
    };
  }

  const energyWh = (activity.energyWhPerUnit ?? 0) * qty;
  const directRate = activity.directMlPerWh ?? 0.8;
  const indirectRate = activity.indirectMlPerWh ?? 1.2;

  const directMl = energyWh * directRate;
  const indirectMl = energyWh * indirectRate;

  return {
    totalMl: options.includeIndirect ? directMl + indirectMl : directMl,
    directMl,
    indirectMl,
  };
}
