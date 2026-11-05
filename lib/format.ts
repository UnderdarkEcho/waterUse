export function formatMl(ml: number): string {
  if (ml >= 1_000_000_000) {
    const billions = ml / 1_000_000_000;
    const text =
      billions >= 10 ? Math.round(billions).toLocaleString() : billions.toFixed(1);
    return `${text} billion`;
  }
  if (ml >= 1_000_000) {
    const millions = ml / 1_000_000;
    return millions >= 10
      ? `${Math.round(millions).toLocaleString()}M`
      : `${millions.toFixed(1)}M`;
  }
  if (ml >= 1000) {
    return Math.round(ml).toLocaleString();
  }
  if (ml >= 10) {
    return Math.round(ml).toString();
  }
  return ml.toFixed(1);
}

export function formatLiters(ml: number): string {
  const liters = ml / 1000;
  if (liters >= 1_000_000) {
    const millions = liters / 1_000_000;
    const text =
      millions >= 10 ? Math.round(millions).toLocaleString() : millions.toFixed(1);
    return `${text} million`;
  }
  if (liters >= 10) return liters.toFixed(1);
  if (liters >= 1) return liters.toFixed(2);
  return liters.toFixed(3);
}

export function formatActivityUsage(
  activityName: string,
  quantity: number,
  unit: string,
  unitPlural: string
): string {
  const units = quantity === 1 ? unit : unitPlural;
  return `${quantity} ${units} of ${activityName.toLowerCase()}`;
}

export function formatGallons(ml: number): string {
  const gallons = ml / 3785.41;
  if (gallons >= 1_000_000) {
    const millions = gallons / 1_000_000;
    const text =
      millions >= 10 ? Math.round(millions).toLocaleString() : millions.toFixed(1);
    return `${text} million`;
  }
  if (gallons >= 1) return gallons.toFixed(2);
  return gallons.toFixed(3);
}

/** Two decimals under 1 mL so 0.26 and 0.32 do not both become 0.3. */
export function formatPreciseMl(ml: number): string {
  if (ml > 0 && ml < 1) {
    return (Math.round(ml * 100) / 100).toFixed(2);
  }
  return formatMl(ml);
}

export function formatRangeMl(low: number, high: number): string {
  return `${formatPreciseMl(low)}–${formatPreciseMl(high)}`;
}

export function formatResultMl(result: {
  totalMl: number;
  citedRangeMl?: [number, number];
}): string {
  if (result.citedRangeMl) {
    return formatRangeMl(result.citedRangeMl[0], result.citedRangeMl[1]);
  }
  return formatMl(result.totalMl);
}