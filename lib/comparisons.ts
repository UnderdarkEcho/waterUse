export interface ComparisonItem {
  name: string;
  ml: number;
  emoji: string;
}

const comparisons: ComparisonItem[] = [
  { name: "one hour of breathing", ml: 13, emoji: "🫁" },
  { name: "a few drops of water", ml: 1, emoji: "💧" },
  { name: "a teaspoon of water", ml: 5, emoji: "🥄" },
  { name: "a sip of water", ml: 15, emoji: "🥤" },
  { name: "a shot glass of water", ml: 44, emoji: "🥃" },
  { name: "a golf ball's worth of water", ml: 50, emoji: "⛳" },
  { name: "a small espresso cup", ml: 80, emoji: "☕" },
  { name: "a third of a coffee mug", ml: 120, emoji: "☕" },
  { name: "half a coffee mug", ml: 175, emoji: "☕" },
  { name: "a full coffee mug", ml: 350, emoji: "☕" },
  { name: "a can of soda", ml: 355, emoji: "🥤" },
  { name: "a standard water bottle", ml: 500, emoji: "🍶" },
  { name: "a horse at the trough", ml: 7570, emoji: "🐴" },
  { name: "a pint of water", ml: 473, emoji: "🫗" },
  { name: "a large water bottle", ml: 750, emoji: "🍶" },
  { name: "a liter of water", ml: 1000, emoji: "🫙" },
  { name: "a big gulp fountain drink", ml: 1500, emoji: "🥤" },
  { name: "a half-gallon jug", ml: 1900, emoji: "🫗" },
  { name: "a gallon of water", ml: 3785, emoji: "🪣" },
  { name: "a toilet flush", ml: 6000, emoji: "🚽" },
  { name: "a 5-minute shower", ml: 20000, emoji: "🚿" },
  { name: "a washing machine load", ml: 227000, emoji: "👕" },
  { name: "30 minutes of lawn watering", ml: 227000, emoji: "🌱" },
  { name: "a cross-country flight", ml: 1200000, emoji: "✈️" },
  { name: "an hour of golf course irrigation", ml: 473000000, emoji: "⛳" },
];

export function getComparison(ml: number): string {
  if (ml <= 0) return "almost no water at all";

  let closest = comparisons[0];
  let minDiff = Math.abs(Math.log(ml) - Math.log(closest.ml));

  for (const item of comparisons) {
    const diff = Math.abs(Math.log(ml) - Math.log(item.ml));
    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  }

  return `${closest.emoji} ${closest.name}`;
}