export function formatMl(ml: number): string {
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
  if (gallons >= 1) return gallons.toFixed(2);
  return gallons.toFixed(3);
}