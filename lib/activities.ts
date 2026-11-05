import { formatRangeMl } from "./format";

export type ActivityCategory =
  | "ai"
  | "streaming"
  | "communication"
  | "browsing"
  | "transport"
  | "physical"
  | "food";

export type CalculationType = "energy" | "fixed";

/** One figure from footprint-data v0.1. */
export interface FigureCitation {
  recordId: string;
  version: "v0.1";
  sourceName: string;
}

export type WaterScopeId = "on-site" | "electricity-inclusive";

export interface CitedWaterScope {
  scope: WaterScopeId;
  label: string;
  lowMlPerUnit: number;
  highMlPerUnit: number;
  companyStated: boolean;
  citations: FigureCitation[];
  note: string;
}

export interface CitedWater {
  defaultScope: WaterScopeId;
  scopes: CitedWaterScope[];
}

export interface CitedEnergyWh {
  lowWh: number;
  centralWh: number;
  /** The Conversation GPT-4o figure. Display rounds this to "about 2 Wh". */
  upperContextWh: number;
  companyMedianLowWh: number;
  companyMedianHighWh: number;
  citations: FigureCitation[];
}

function cite(recordId: string, sourceName: string): FigureCitation {
  return { recordId, version: "v0.1", sourceName };
}

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  icon: string;
  unit: string;
  unitPlural: string;
  defaultQuantity: number;
  calculationType: CalculationType;
  energyWhPerUnit?: number;
  directMlPerWh?: number;
  indirectMlPerWh?: number;
  fixedMlPerUnit?: number;
  fixedMlDirect?: number;
  fixedMlIndirect?: number;
  rangeMl?: [number, number];
  /** When set, show this range. Do not multiply energy into water. */
  citedWater?: CitedWater;
  citedEnergyWh?: CitedEnergyWh;
  sourceUrl: string;
  sourceLabel: string;
  description: string;
}

/**
 * Display line requested by brief 001.
 * 2 Wh rounds ai-text-energy-conversation-gpt4o central 1.75 Wh (v0.1, The Conversation).
 * 2.0 Wh is not its own record, so it is not stored as a number.
 */
export const AI_TEXT_ENERGY_DISPLAY = "about 0.1–2 Wh";

export const AI_TEXT_ENERGY: CitedEnergyWh = {
  lowWh: 0.1, // ai-text-energy-google-gemini low; ai-text-energy-epoch-gpt4o low. v0.1. Google; Epoch AI.
  centralWh: 0.3, // ai-text-energy-epoch-gpt4o central. v0.1. Epoch AI.
  upperContextWh: 1.75, // ai-text-energy-conversation-gpt4o central. v0.1. The Conversation.
  companyMedianLowWh: 0.24, // ai-text-energy-google-gemini central. v0.1. Google. Company-stated.
  companyMedianHighWh: 0.34, // ai-text-energy-openai-altman central. v0.1. OpenAI (Sam Altman). Company-stated.
  citations: [
    cite("ai-text-energy-google-gemini", "Google"),
    cite("ai-text-energy-epoch-gpt4o", "Epoch AI"),
    cite("ai-text-energy-openai-altman", "OpenAI (Sam Altman)"),
    cite("ai-text-energy-conversation-gpt4o", "The Conversation"),
  ],
};

export const AI_TEXT_WATER: CitedWater = {
  defaultScope: "on-site",
  scopes: [
    {
      scope: "on-site",
      label: "On-site cooling",
      lowMlPerUnit: 0.26, // ai-text-water-google-onsite central. v0.1. Google. Company-stated, on-site.
      highMlPerUnit: 0.32, // ai-text-water-openai-altman central. v0.1. OpenAI (Sam Altman). Company-stated. Scope in the data file is unknown.
      companyStated: true,
      citations: [
        cite("ai-text-water-google-onsite", "Google"),
        cite("ai-text-water-openai-altman", "OpenAI (Sam Altman)"),
      ],
      note: "Google 0.26 mL is on-site cooling, company-stated. Altman 0.32 mL is company-stated and does not disclose a boundary.",
    },
    {
      scope: "electricity-inclusive",
      label: "Electricity-inclusive",
      lowMlPerUnit: 10, // ai-text-water-li-ren low. v0.1. Li, Yang, Islam, and Ren.
      highMlPerUnit: 50, // ai-text-water-li-ren high. v0.1. Li, Yang, Islam, and Ren.
      companyStated: false,
      citations: [cite("ai-text-water-li-ren", "Li, Yang, Islam, and Ren")],
      note: "Li et al. 2023, GPT-3-class, older. Includes power-plant water. Not added to on-site cooling.",
    },
  ],
};

/** cmp-shower-minute-watersense central. v0.1. EPA WaterSense. Max 2.0 gpm. */
export const SHOWER_ML_PER_MIN = 7570;

/** cmp-videocall-hour-water low. v0.1. Purdue / Obringer et al. Central is null. */
export const ZOOM_ML_PER_HOUR_LOW = 2000;
/** cmp-videocall-hour-water high. v0.1. Purdue / Obringer et al. Central is null. */
export const ZOOM_ML_PER_HOUR_HIGH = 12000;

/** cmp-golf-facility-year central. v0.1. GCSAA. Median US facility, 2024, mL per year. */
export const GOLF_FACILITY_ML_PER_YEAR = 85_000_000_000;

export const ZOOM_WATER: CitedWater = {
  defaultScope: "electricity-inclusive",
  scopes: [
    {
      scope: "electricity-inclusive",
      label: "Electricity-inclusive",
      lowMlPerUnit: ZOOM_ML_PER_HOUR_LOW,
      highMlPerUnit: ZOOM_ML_PER_HOUR_HIGH,
      companyStated: false,
      citations: [
        cite("cmp-videocall-hour-water", "Purdue / Obringer et al."),
      ],
      note: "Purdue / Obringer et al. 2021: 2–12 liters per hour. Electricity-inclusive.",
    },
  ],
};

export function aiEnergyNote(): string {
  return `Energy ${AI_TEXT_ENERGY_DISPLAY} per prompt. Company-stated medians are ${AI_TEXT_ENERGY.companyMedianLowWh}–${AI_TEXT_ENERGY.companyMedianHighWh} Wh.`;
}

export const activities: Activity[] = [
  {
    id: "ai-query",
    name: "Single AI Query",
    category: "ai",
    icon: "sparkles",
    unit: "query",
    unitPlural: "queries",
    defaultQuantity: 1,
    calculationType: "energy",
    citedWater: AI_TEXT_WATER,
    citedEnergyWh: AI_TEXT_ENERGY,
    sourceUrl: "https://arxiv.org/abs/2508.15734",
    sourceLabel:
      "Google 2025, on-site, company-stated; Altman 2025, company-stated; Epoch; Li et al. 2023",
    description: `One text prompt. ${aiEnergyNote()} On-site cooling about ${formatRangeMl(AI_TEXT_WATER.scopes[0].lowMlPerUnit, AI_TEXT_WATER.scopes[0].highMlPerUnit)} mL. Electricity-inclusive about ${formatRangeMl(AI_TEXT_WATER.scopes[1].lowMlPerUnit, AI_TEXT_WATER.scopes[1].highMlPerUnit)} mL (2023, GPT-3-class). Scopes are separate.`,
  },
  {
    id: "ai-conversation",
    name: "Full ChatGPT Conversation",
    category: "ai",
    icon: "messages-square",
    unit: "query",
    unitPlural: "queries",
    defaultQuantity: 10,
    calculationType: "energy",
    citedWater: AI_TEXT_WATER,
    citedEnergyWh: AI_TEXT_ENERGY,
    sourceUrl: "https://arxiv.org/abs/2508.15734",
    sourceLabel:
      "Google 2025, on-site, company-stated; Altman 2025, company-stated; Epoch; Li et al. 2023",
    description:
      "Default 10 text prompts. Each prompt uses the single-query ranges. The data file has no separate session total.",
  },
  {
    id: "ai-email",
    name: "AI-Drafted Email",
    category: "ai",
    icon: "mail",
    unit: "email",
    unitPlural: "emails",
    defaultQuantity: 1,
    calculationType: "energy",
    citedWater: AI_TEXT_WATER,
    citedEnergyWh: AI_TEXT_ENERGY,
    sourceUrl: "https://arxiv.org/abs/2508.15734",
    sourceLabel:
      "Google 2025, on-site, company-stated; Altman 2025, company-stated; Epoch; Li et al. 2023",
    description:
      "Counted as one text prompt. The data file has no separate email figure.",
  },
  {
    id: "netflix-4k",
    name: "4K Netflix / Streaming",
    category: "streaming",
    icon: "tv",
    unit: "hour",
    unitPlural: "hours",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 700,
    fixedMlDirect: 280,
    fixedMlIndirect: 420,
    rangeMl: [500, 800],
    sourceUrl:
      "https://www.purdue.edu/newsroom/archive/releases/2021/Q1/turn-off-that-camera-during-virtual-meetings,-environmental-study-says.html",
    sourceLabel:
      "Purdue / Obringer et al. (data-center-focused estimate). Per-service rate unverified.",
    description: "One hour of high-definition or 4K video streaming.",
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "streaming",
    icon: "play",
    unit: "hour",
    unitPlural: "hours",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 300,
    fixedMlDirect: 120,
    fixedMlIndirect: 180,
    rangeMl: [200, 500],
    sourceUrl:
      "https://doi.org/10.1016/j.resconrec.2020.105389",
    sourceLabel:
      "Obringer et al. (mixed SD/HD video, lower than 4K). Per-service rate unverified.",
    description:
      "Watching YouTube videos — tutorials, vlogs, or music videos.",
  },
  {
    id: "music-streaming",
    name: "Music / Podcast Streaming",
    category: "streaming",
    icon: "music",
    unit: "hour",
    unitPlural: "hours",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 100,
    fixedMlDirect: 40,
    fixedMlIndirect: 60,
    rangeMl: [60, 200],
    sourceUrl:
      "https://doi.org/10.1016/j.resconrec.2020.105389",
    sourceLabel:
      "Obringer et al. (audio-only, minimal data transfer). Per-service rate unverified.",
    description: "Listening to Spotify, Apple Music, or podcasts.",
  },
  {
    id: "social-media",
    name: "TikTok / Instagram",
    category: "streaming",
    icon: "smartphone",
    unit: "hour",
    unitPlural: "hours",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 400,
    fixedMlDirect: 160,
    fixedMlIndirect: 240,
    rangeMl: [300, 500],
    sourceUrl:
      "https://www.purdue.edu/newsroom/archive/releases/2021/Q1/turn-off-that-camera-during-virtual-meetings,-environmental-study-says.html",
    sourceLabel:
      "Purdue / Obringer et al. (short-form video, lower bitrate). Per-service rate unverified.",
    description: "Scrolling short-form video and social feeds for an hour.",
  },
  {
    id: "zoom-call",
    name: "Zoom / Video Call",
    category: "communication",
    icon: "video",
    unit: "hour",
    unitPlural: "hours",
    defaultQuantity: 1,
    calculationType: "fixed",
    citedWater: ZOOM_WATER,
    rangeMl: [ZOOM_ML_PER_HOUR_LOW, ZOOM_ML_PER_HOUR_HIGH],
    sourceUrl:
      "https://www.purdue.edu/newsroom/archive/releases/2021/Q1/turn-off-that-camera-during-virtual-meetings,-environmental-study-says.html",
    sourceLabel:
      "Purdue / Obringer et al. 2021 (2,000–12,000 mL/hr, electricity-inclusive)",
    description: `One hour of videoconferencing. Purdue/Obringer range is ${ZOOM_ML_PER_HOUR_LOW / 1000}–${ZOOM_ML_PER_HOUR_HIGH / 1000} liters per hour (${ZOOM_ML_PER_HOUR_LOW.toLocaleString()}–${ZOOM_ML_PER_HOUR_HIGH.toLocaleString()} mL), electricity-inclusive.`,
  },
  {
    id: "web-browsing",
    name: "Web Browsing",
    category: "browsing",
    icon: "globe",
    unit: "hour",
    unitPlural: "hours",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 150,
    fixedMlDirect: 60,
    fixedMlIndirect: 90,
    rangeMl: [100, 250],
    sourceUrl:
      "https://doi.org/10.1016/j.resconrec.2020.105389",
    sourceLabel:
      "Obringer et al., Resources Conservation & Recycling. Per-service rate unverified.",
    description: "General web browsing, reading articles, and light pages.",
  },
  {
    id: "send-email",
    name: "Sending Email",
    category: "browsing",
    icon: "send",
    unit: "email",
    unitPlural: "emails",
    defaultQuantity: 1,
    calculationType: "energy",
    energyWhPerUnit: 0.5,
    directMlPerWh: 0.8,
    indirectMlPerWh: 1.2,
    rangeMl: [1, 2],
    sourceUrl:
      "https://doi.org/10.1016/j.resconrec.2020.105389",
    sourceLabel: "Obringer et al. (light data transfer)",
    description: "Sending a plain-text email through webmail.",
  },
  {
    id: "drive",
    name: "Driving",
    category: "transport",
    icon: "car",
    unit: "minute",
    unitPlural: "minutes",
    defaultQuantity: 15,
    calculationType: "fixed",
    fixedMlPerUnit: 1420,
    fixedMlDirect: 0,
    fixedMlIndirect: 1420,
    rangeMl: [1000, 2000],
    sourceUrl: "https://watercalculator.org/posts/gasoline/",
    sourceLabel:
      "Water Footprint Calculator (~0.75 gal H₂O/mi; 30 mph avg)",
    description:
      "Gasoline car trip — water used to extract, refine, and transport fuel.",
  },
  {
    id: "flight-anc-wy",
    name: "Flight: Anchorage → Wyoming",
    category: "transport",
    icon: "plane",
    unit: "flight",
    unitPlural: "flights",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 1200000,
    fixedMlDirect: 0,
    fixedMlIndirect: 1200000,
    rangeMl: [900000, 1500000],
    sourceUrl:
      "https://www.waterfootprint.org/resources/Report44-BurningWater-WaterFootprintTransport.pdf",
    sourceLabel:
      "Water Footprint Network (~2,340 mi; fuel lifecycle water)",
    description:
      "One-way economy flight ANC to Jackson Hole area (~2,340 miles).",
  },
  {
    id: "lawn-sprinkler",
    name: "Lawn Sprinkler",
    category: "physical",
    icon: "flower",
    unit: "minute",
    unitPlural: "minutes",
    defaultQuantity: 30,
    calculationType: "fixed",
    fixedMlPerUnit: 7570,
    fixedMlDirect: 7570,
    fixedMlIndirect: 0,
    rangeMl: [6000, 10000],
    sourceUrl: "https://www.epa.gov/watersense/outdoors",
    sourceLabel: "EPA WaterSense (~2 gal/min typical zone)",
    description: "Running a residential sprinkler or hose on the lawn.",
  },
  {
    id: "golf-irrigation",
    name: "Golf Course Irrigation",
    category: "physical",
    icon: "flag",
    unit: "year",
    unitPlural: "years",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: GOLF_FACILITY_ML_PER_YEAR,
    fixedMlDirect: GOLF_FACILITY_ML_PER_YEAR,
    fixedMlIndirect: 0,
    sourceUrl:
      "https://www.gcsaa.org/docs/default-source/what-we-do/gcep-phase-4-water-report.pdf",
    sourceLabel: "GCSAA Phase 4 (2024 median, per year)",
    // 9,700 L/h is the annual average in cmp-golf-facility-year notes. v0.1. GCSAA.
    description: `Median water applied per US golf facility in 2024: about ${GOLF_FACILITY_ML_PER_YEAR / 1_000_000_000} million liters per year. Averaged over the year, about 9,700 liters per hour.`,
  },
  {
    id: "laundry",
    name: "Washing Machine Load",
    category: "physical",
    icon: "shirt",
    unit: "load",
    unitPlural: "loads",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 227000,
    fixedMlDirect: 227000,
    fixedMlIndirect: 0,
    rangeMl: [150000, 300000],
    sourceUrl: "https://www.epa.gov/watersense/how-we-use-water",
    sourceLabel: "EPA WaterSense (~60 gal/load top-loading)",
    description: "One full load in a conventional washing machine.",
  },
  {
    id: "dishes-hand",
    name: "Hand-Washing Dishes",
    category: "physical",
    icon: "utensils",
    unit: "minute",
    unitPlural: "minutes",
    defaultQuantity: 10,
    calculationType: "fixed",
    fixedMlPerUnit: 7500,
    fixedMlDirect: 7500,
    fixedMlIndirect: 0,
    rangeMl: [5000, 12000],
    sourceUrl: "https://www.epa.gov/watersense/how-we-use-water",
    sourceLabel: "EPA WaterSense (~2 gal/min tap running)",
    description: "Washing dishes by hand with the tap running.",
  },
  {
    id: "coffee",
    name: "Cup of Coffee",
    category: "food",
    icon: "coffee",
    unit: "cup",
    unitPlural: "cups",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 140000,
    fixedMlDirect: 250,
    fixedMlIndirect: 139750,
    rangeMl: [100000, 200000],
    sourceUrl:
      "https://www.waterfootprint.org/resources/Report53-WaterFootprintCoffees.pdf",
    sourceLabel:
      "Water Footprint Network (bean growing + processing virtual water)",
    description:
      "One cup — mostly water used growing coffee beans, not in the cup itself.",
  },
  {
    id: "starbucks-latte",
    name: "Starbucks Latte (16 oz)",
    category: "food",
    icon: "coffee",
    unit: "drink",
    unitPlural: "drinks",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 440000,
    fixedMlDirect: 470,
    fixedMlIndirect: 439530,
    rangeMl: [350000, 550000],
    sourceUrl:
      "https://www.waterfootprint.org/resources/Report38-WaterFootprintAnimalProducts.pdf",
    sourceLabel:
      "WFN milk (~1,020 L/kg) + coffee; ~14 oz milk + espresso in 16 oz drink",
    description:
      "Grande-style latte — virtual water mostly from dairy, not what's in the cup.",
  },
  {
    id: "ribeye-industrial",
    name: "Ribeye — Industrial (12 oz)",
    category: "food",
    icon: "beef",
    unit: "steak",
    unitPlural: "steaks",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 5236000,
    fixedMlDirect: 0,
    fixedMlIndirect: 5236000,
    rangeMl: [4500000, 6000000],
    sourceUrl:
      "https://www.waterfootprint.org/resources/Report38-WaterFootprintAnimalProducts.pdf",
    sourceLabel:
      "WFN / Mekonnen & Hoekstra — grain-finished, ~15,400 L/kg × 340 g",
    description:
      "Feedlot-style beef — heavy irrigated corn/soy feed, faster finish.",
  },
  {
    id: "ribeye-free-range",
    name: "Ribeye — Free Range (12 oz)",
    category: "food",
    icon: "beef",
    unit: "steak",
    unitPlural: "steaks",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 6970000,
    fixedMlDirect: 0,
    fixedMlIndirect: 6970000,
    rangeMl: [5800000, 8200000],
    sourceUrl:
      "https://www.waterfootprint.org/resources/Report38-WaterFootprintAnimalProducts.pdf",
    sourceLabel:
      "WFN / Mekonnen & Hoekstra — pasture-heavy, ~20,500 L/kg × 340 g",
    description:
      "Grass-finished / free-range — more green water on pasture, longer raise.",
  },
  {
    id: "salad",
    name: "Salad",
    category: "food",
    icon: "salad",
    unit: "salad",
    unitPlural: "salads",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 200000,
    fixedMlDirect: 500,
    fixedMlIndirect: 199500,
    rangeMl: [120000, 350000],
    sourceUrl:
      "https://www.waterfootprint.org/resources/Report48-WaterFootprintCrops.pdf",
    sourceLabel:
      "WFN crops (greens, tomato, cucumber) + dressing; ~300 g bowl",
    description:
      "Mixed greens bowl with veggies and dressing — far lighter than beef.",
  },
  {
    id: "tv-dinner",
    name: "TV Dinner",
    category: "food",
    icon: "microwave",
    unit: "meal",
    unitPlural: "meals",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 765000,
    fixedMlDirect: 50,
    fixedMlIndirect: 764950,
    rangeMl: [500000, 1000000],
    sourceUrl:
      "https://watercalculator.org/water-footprint-of-food-guide/",
    sourceLabel:
      "Water Footprint Calculator / WFN (~1,800 L/kg processed frozen meal)",
    description:
      "Typical frozen entrée with meat, starch, and sauce (~425 g tray).",
  },
  {
    id: "vegan-processed-meal",
    name: "Whole Foods Vegan Processed Meal",
    category: "food",
    icon: "sprout",
    unit: "meal",
    unitPlural: "meals",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 420000,
    fixedMlDirect: 50,
    fixedMlIndirect: 419950,
    rangeMl: [280000, 550000],
    sourceUrl:
      "https://watercalculator.org/water-footprint-of-food-guide/",
    sourceLabel:
      "Water Footprint Calculator / WFN (~1,200 L/kg plant-based processed)",
    description:
      "Prepared vegan bowl or heat-and-eat meal from Whole Foods (~350 g).",
  },
  {
    id: "almonds-serving",
    name: "Almonds (1 serving)",
    category: "food",
    icon: "nut",
    unit: "serving",
    unitPlural: "servings",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 459000,
    fixedMlDirect: 0,
    fixedMlIndirect: 459000,
    rangeMl: [380000, 620000],
    sourceUrl:
      "https://www.waterfootprint.org/resources/Report48-WaterFootprintCrops.pdf",
    sourceLabel:
      "WFN / Mekonnen & Hoekstra — ~16,190 L/kg × 28 g (1 oz USDA serving)",
    description:
      "Standard 1 oz handful — tree-nut irrigation, mostly from growing, not in the nut.",
  },
  {
    id: "brush-teeth",
    name: "Brushing Teeth (tap on)",
    category: "physical",
    icon: "droplets",
    unit: "minute",
    unitPlural: "minutes",
    defaultQuantity: 2,
    calculationType: "fixed",
    fixedMlPerUnit: 7500,
    fixedMlDirect: 7500,
    fixedMlIndirect: 0,
    rangeMl: [3000, 15000],
    sourceUrl: "https://www.epa.gov/watersense/how-we-use-water",
    sourceLabel: "EPA WaterSense (~2 gal/min; turn off tap to save)",
    description: "Brushing teeth while leaving the faucet running.",
  },
  {
    id: "horse-to-water",
    name: "Lead a Horse to Water",
    category: "physical",
    icon: "footprints",
    unit: "visit",
    unitPlural: "visits",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 7570,
    fixedMlDirect: 7570,
    fixedMlIndirect: 0,
    rangeMl: [3800, 14000],
    sourceUrl:
      "https://ker.com/equinews/horse-water-requirements-five-important-facts/",
    sourceLabel:
      "Kentucky Equine Research (5–15 gal/day ÷ ~4 trough visits)",
    description:
      "…but you can't make it drink. ~2 gallons when they actually do.",
  },
  {
    id: "breathing",
    name: "Breathing",
    category: "physical",
    icon: "wind",
    unit: "hour",
    unitPlural: "hours",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 13,
    fixedMlDirect: 13,
    fixedMlIndirect: 0,
    rangeMl: [8, 20],
    sourceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK544219/",
    sourceLabel:
      "StatPearls — ~250–300 ml/day respiratory water loss at rest",
    description:
      "Water vapor exhaled at rest — returns to the air in the room immediately.",
  },
  {
    id: "toilet-flush",
    name: "Toilet Flush",
    category: "physical",
    icon: "droplets",
    unit: "flush",
    unitPlural: "flushes",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 6000,
    fixedMlDirect: 6000,
    fixedMlIndirect: 0,
    rangeMl: [6000, 6000],
    sourceUrl: "https://www.epa.gov/watersense/how-we-use-water",
    sourceLabel: "EPA WaterSense (1.6 gal/flush standard)",
    description: "A single flush using a modern low-flow toilet.",
  },
  {
    id: "shower",
    name: "Shower",
    category: "physical",
    icon: "shower-head",
    unit: "minute",
    unitPlural: "minutes",
    defaultQuantity: 5,
    calculationType: "fixed",
    fixedMlPerUnit: SHOWER_ML_PER_MIN,
    fixedMlDirect: SHOWER_ML_PER_MIN,
    fixedMlIndirect: 0,
    sourceUrl: "https://www.epa.gov/watersense/showerheads",
    sourceLabel: "EPA WaterSense max 2.0 gpm",
    description: `EPA WaterSense maximum showerhead flow, 2.0 gallons per minute (${SHOWER_ML_PER_MIN.toLocaleString()} mL per minute).`,
  },
];

export function getActivity(id: string): Activity | undefined {
  return activities.find((a) => a.id === id);
}

export const presets = [
  {
    label: "ChatGPT for 30 min",
    activityId: "ai-conversation",
    quantity: 15,
  },
  {
    label: "Netflix all evening",
    activityId: "netflix-4k",
    quantity: 4,
  },
  {
    label: "1h Zoom meeting",
    activityId: "zoom-call",
    quantity: 1,
  },
  {
    label: "Quick AI question",
    activityId: "ai-query",
    quantity: 1,
  },
  {
    label: "YouTube rabbit hole",
    activityId: "youtube",
    quantity: 2,
  },
  {
    label: "15-min commute",
    activityId: "drive",
    quantity: 15,
  },
  {
    label: "Water the lawn",
    activityId: "lawn-sprinkler",
    quantity: 30,
  },
  {
    label: "Lead a horse to water",
    activityId: "horse-to-water",
    quantity: 1,
  },
  {
    label: "Starbucks latte",
    activityId: "starbucks-latte",
    quantity: 1,
  },
  {
    label: "Industrial ribeye",
    activityId: "ribeye-industrial",
    quantity: 1,
  },
  {
    label: "Free-range ribeye",
    activityId: "ribeye-free-range",
    quantity: 1,
  },
];