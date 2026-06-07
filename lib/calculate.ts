import { Activity } from "./activities";

export interface CalculationOptions {
  includeIndirect: boolean;
  aiEfficient?: boolean;
}

export interface CalculationResult {
  totalMl: number;
  directMl: number;
  indirectMl: number;
}

export function calculateWater(
  activity: Activity,
  quantity: number,
  options: CalculationOptions
): CalculationResult {
  const qty = Math.max(0, quantity);

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
  const indirectRate = options.aiEfficient
    ? (activity.indirectMlPerWh ?? 1.2) * 0.65
    : (activity.indirectMlPerWh ?? 1.2);

  const directMl = energyWh * directRate;
  const indirectMl = energyWh * indirectRate;

  return {
    totalMl: options.includeIndirect ? directMl + indirectMl : directMl,
    directMl,
    indirectMl,
  };
}