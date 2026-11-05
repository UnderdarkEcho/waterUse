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
  amountMl: string,
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
  return `About ${amountMl} ml of water for ${phrase}.`;
}