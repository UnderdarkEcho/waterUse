export interface ActivityDefinition {
  title: string;
  summary: string;
  specs: { label: string; value: string }[];
  formula: string;
  typicalResult: string;
  range: string;
  assumptions: string[];
  sourceIds: string[];
}

export const AVERAGE_AI_QUERY: ActivityDefinition = {
  title: "What counts as one average AI query?",
  summary:
    "One user prompt plus a single medium-length assistant reply, using a modern efficient model (GPT-4o class) hosted at a typical data center.",
  specs: [
    {
      label: "Model reference",
      value: "GPT-4o (OpenAI production tier, 2024–2025)",
    },
    {
      label: "Output size",
      value: "~150–200 words (~200–300 tokens)",
    },
    {
      label: "Energy per query",
      value: "1.75 watt-hours (Wh)",
    },
    {
      label: "Water factor (direct)",
      value: "0.8 ml/Wh — on-site data center cooling",
    },
    {
      label: "Water factor (indirect)",
      value: "1.2 ml/Wh — thermoelectric power generation",
    },
    {
      label: "Water factor (total)",
      value: "2.0 ml/Wh (typical facility)",
    },
    {
      label: "Result (this calculator)",
      value: "1.75 Wh × 2.0 ml/Wh = 3.5 ml per query",
    },
  ],
  formula: "water (ml) = energy (Wh) × ml/Wh",
  typicalResult: "3.5 ml total (1.4 ml direct + 2.1 ml indirect)",
  range:
    "2–40 ml per query. Lower bound: efficient data centers (1.3 ml/Wh) ≈ 2.3 ml. Upper bound: larger models like GPT-5 (~19.3 Wh) or less efficient sites (2.0 ml/Wh) ≈ 39 ml.",
  assumptions: [
    "Inference only — not model training (training uses vastly more water).",
    "Typical U.S./global grid mix; location changes scope-2 water significantly.",
    "Includes both evaporative cooling at the data center and power-plant water.",
    "A “quick yes/no” reply uses less; a long code block or essay uses more.",
  ],
  sourceIds: ["conversation-2025", "li-2023", "google-gemini"],
};

const definitionsByActivityId: Record<string, ActivityDefinition> = {
  "ai-query": AVERAGE_AI_QUERY,
  "ai-conversation": {
    ...AVERAGE_AI_QUERY,
    title: "What counts as one conversation query?",
    summary:
      "Same per-query definition as above — one prompt + medium reply — multiplied by session length (default: 10 queries).",
    specs: [
      ...AVERAGE_AI_QUERY.specs.slice(0, 6),
      {
        label: "Session default",
        value: "10 queries (typical back-and-forth session)",
      },
      {
        label: "Result (this calculator)",
        value: "10 × 3.5 ml = 35 ml total",
      },
    ],
    typicalResult: "35 ml for 10 queries (3.5 ml each)",
    range: "23–400 ml for 10 queries, depending on model size and facility efficiency.",
  },
  "ai-email": {
    ...AVERAGE_AI_QUERY,
    title: "What counts as one AI-drafted email?",
    summary:
      "One prompt producing a ~100-word email draft — similar energy to a medium query per The Conversation.",
    specs: [
      {
        label: "Model reference",
        value: "GPT-4o class",
      },
      {
        label: "Output size",
        value: "~100 words (short business email)",
      },
      {
        label: "Energy per email",
        value: "1.75 Wh (same as medium query)",
      },
      ...AVERAGE_AI_QUERY.specs.slice(3, 7),
    ],
    typicalResult: "3.5 ml per email",
    range: "2–40 ml, same drivers as a single query.",
  },
};

export function getActivityDefinition(
  activityId: string
): ActivityDefinition | undefined {
  return definitionsByActivityId[activityId];
}

export function isAiActivity(activityId: string): boolean {
  return activityId in definitionsByActivityId;
}