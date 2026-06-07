import { formatMl } from "./format";

/** e.g. "breathing for 24 hours" or "10 queries of full chatgpt conversation" */
export function formatShareActivityPhrase(
  activityName: string,
  quantity: number,
  unit: string,
  unitPlural: string
): string {
  const units = quantity === 1 ? unit : unitPlural;
  const name = activityName.toLowerCase();
  if (unit === "hour" || unit === "minute") {
    return `${name} for ${quantity} ${units}`;
  }
  return `${quantity} ${units} of ${name}`;
}

export function buildShareTweetText(
  totalMl: number,
  activityName: string,
  quantity: number,
  unit: string,
  unitPlural: string
): string {
  const phrase = formatShareActivityPhrase(
    activityName,
    quantity,
    unit,
    unitPlural
  );
  return `I used ${formatMl(totalMl)} ml of water by ${phrase}! AI uses a few ml of water per query — and it's worth it. See the real numbers:`;
}