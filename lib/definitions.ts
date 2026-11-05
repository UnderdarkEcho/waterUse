import {
  AI_TEXT_ENERGY,
  AI_TEXT_ENERGY_DISPLAY,
  AI_TEXT_WATER,
} from "./activities";
import { formatRangeMl } from "./format";

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

const onSite = AI_TEXT_WATER.scopes[0];
const electricity = AI_TEXT_WATER.scopes[1];

const energyValue = `${AI_TEXT_ENERGY_DISPLAY} per prompt. Central ${AI_TEXT_ENERGY.centralWh} Wh (Epoch). Company-stated medians: ${AI_TEXT_ENERGY.companyMedianLowWh} Wh (Google) and ${AI_TEXT_ENERGY.companyMedianHighWh} Wh (Altman).`;

const onSiteValue = `about ${formatRangeMl(onSite.lowMlPerUnit, onSite.highMlPerUnit)} mL per prompt. ${onSite.note}`;

const electricityValue = `about ${formatRangeMl(electricity.lowMlPerUnit, electricity.highMlPerUnit)} mL per prompt. ${electricity.note}`;

const sharedAssumptions = [
  "Inference only. Training is not included.",
  `The high end, ${AI_TEXT_ENERGY.upperContextWh} Wh, is The Conversation’s GPT-4o figure (record ai-text-energy-conversation-gpt4o).`,
  "Epoch’s model-based range for a GPT-4o query also reaches 4 Wh under other assumptions (ai-text-energy-epoch-gpt4o high). That high is not the top of the line shown here.",
  "Google also reports 0.12 mL on-site for a narrower boundary (ai-text-water-google-onsite low). The 0.26 mL figure is the wider on-site median.",
  "Altman’s 0.32 mL does not state whether cooling water, electricity, or both are included.",
  "The 10–50 mL band is for GPT-3-class models in 2023 and includes power-plant water. It is a different scope from on-site cooling.",
  "A Conversation figure for a GPT-5 query is 19.3 Wh (ai-text-energy-conversation-gpt5). It is not included in the 0.1–1.75 Wh line.",
  "The data file has no separate email or multi-prompt record. A conversation multiplies the per-prompt ranges by the number of prompts.",
];

const sourceIds = [
  "google-gemini",
  "epoch-ai",
  "altman-openai",
  "conversation-2025",
  "li-2023",
];

export const AVERAGE_AI_QUERY: ActivityDefinition = {
  title: "What counts as one AI text prompt?",
  summary:
    "One text prompt. Energy and water are published ranges. The two water scopes are not added together.",
  specs: [
    { label: "Energy", value: energyValue },
    { label: "Water, on-site cooling", value: onSiteValue },
    { label: "Water, electricity-inclusive", value: electricityValue },
    {
      label: "Default shown",
      value: "On-site cooling. Electricity-inclusive is listed separately.",
    },
  ],
  formula: "Cited ranges per prompt. Water scopes are not added together.",
  typicalResult: `On-site cooling about ${formatRangeMl(onSite.lowMlPerUnit, onSite.highMlPerUnit)} mL per prompt.`,
  range: `Energy ${AI_TEXT_ENERGY_DISPLAY}. On-site water about ${formatRangeMl(onSite.lowMlPerUnit, onSite.highMlPerUnit)} mL. Electricity-inclusive water about ${formatRangeMl(electricity.lowMlPerUnit, electricity.highMlPerUnit)} mL.`,
  assumptions: sharedAssumptions,
  sourceIds,
};

const definitionsByActivityId: Record<string, ActivityDefinition> = {
  "ai-query": AVERAGE_AI_QUERY,
  "ai-conversation": {
    ...AVERAGE_AI_QUERY,
    title: "What counts as a conversation?",
    summary:
      "The default session is 10 text prompts. Each prompt uses the single-prompt ranges. The data file has no separate session total.",
    specs: [
      ...AVERAGE_AI_QUERY.specs,
      {
        label: "Session default",
        value: "10 prompts.",
      },
      {
        label: "On-site for 10 prompts",
        value: `about ${formatRangeMl(onSite.lowMlPerUnit * 10, onSite.highMlPerUnit * 10)} mL.`,
      },
      {
        label: "Electricity-inclusive for 10 prompts",
        value: `about ${formatRangeMl(electricity.lowMlPerUnit * 10, electricity.highMlPerUnit * 10)} mL.`,
      },
    ],
    typicalResult: `On-site cooling about ${formatRangeMl(onSite.lowMlPerUnit * 10, onSite.highMlPerUnit * 10)} mL for 10 prompts.`,
    range: `Ten times the per-prompt ranges. On-site about ${formatRangeMl(onSite.lowMlPerUnit * 10, onSite.highMlPerUnit * 10)} mL. Electricity-inclusive about ${formatRangeMl(electricity.lowMlPerUnit * 10, electricity.highMlPerUnit * 10)} mL.`,
  },
  "ai-email": {
    ...AVERAGE_AI_QUERY,
    title: "What counts as one AI-drafted email?",
    summary:
      "One email counted as one text prompt. The data file has no separate email figure.",
    specs: [
      {
        label: "Count",
        value: "One text prompt. No separate email record.",
      },
      ...AVERAGE_AI_QUERY.specs,
    ],
    typicalResult: `On-site cooling about ${formatRangeMl(onSite.lowMlPerUnit, onSite.highMlPerUnit)} mL per email.`,
    range: AVERAGE_AI_QUERY.range,
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
