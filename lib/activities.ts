export type ActivityCategory =
  | "ai"
  | "streaming"
  | "communication"
  | "browsing"
  | "transport"
  | "physical"
  | "food";

export type CalculationType = "energy" | "fixed";

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
  sourceUrl: string;
  sourceLabel: string;
  description: string;
}

export const DEFAULT_DIRECT_ML_PER_WH = 0.8;
export const DEFAULT_INDIRECT_ML_PER_WH = 1.2;

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
    energyWhPerUnit: 1.75,
    directMlPerWh: 0.8,
    indirectMlPerWh: 1.2,
    rangeMl: [2, 40],
    sourceUrl:
      "https://theconversation.com/ai-has-a-hidden-water-cost-heres-how-to-calculate-yours-263252",
    sourceLabel: "The Conversation (GPT-4o, 1.75 Wh × 1.3–2.0 ml/Wh)",
    description:
      "GPT-4o-class model, ~150–200 word reply, 1.75 Wh → 3.5 ml (see definition).",
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
    energyWhPerUnit: 1.75,
    directMlPerWh: 0.8,
    indirectMlPerWh: 1.2,
    rangeMl: [23, 400],
    sourceUrl:
      "https://theconversation.com/ai-has-a-hidden-water-cost-heres-how-to-calculate-yours-263252",
    sourceLabel: "The Conversation (10 × single query estimate)",
    description: "A typical back-and-forth session of about 10 prompts.",
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
    energyWhPerUnit: 1.75,
    directMlPerWh: 0.8,
    indirectMlPerWh: 1.2,
    rangeMl: [2, 40],
    sourceUrl:
      "https://theconversation.com/ai-has-a-hidden-water-cost-heres-how-to-calculate-yours-263252",
    sourceLabel: "The Conversation (~100-word AI output)",
    description: "Drafting a short ~100-word email with AI assistance.",
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
    sourceLabel: "Purdue / Obringer et al. (data-center-focused estimate)",
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
    sourceLabel: "Obringer et al. (mixed SD/HD video, lower than 4K)",
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
    sourceLabel: "Obringer et al. (audio-only, minimal data transfer)",
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
    sourceLabel: "Purdue / Obringer et al. (short-form video, lower bitrate)",
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
    fixedMlPerUnit: 1750,
    fixedMlDirect: 700,
    fixedMlIndirect: 1050,
    rangeMl: [1500, 2000],
    sourceUrl:
      "https://www.purdue.edu/newsroom/archive/releases/2021/Q1/turn-off-that-camera-during-virtual-meetings,-environmental-study-says.html",
    sourceLabel: "Purdue / Obringer et al. (2–12 L/hr, camera on)",
    description: "One hour of videoconferencing with camera enabled.",
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
    sourceLabel: "Obringer et al., Resources Conservation & Recycling",
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
    unit: "hour",
    unitPlural: "hours",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 473000000,
    fixedMlDirect: 473000000,
    fixedMlIndirect: 0,
    rangeMl: [200000000, 800000000],
    sourceUrl:
      "https://www.usga.org/content/dam/usga/pdf/Water%20Resource%20Center/how-much-water-does-golf-use.pdf",
    sourceLabel: "USGA Water Resource Center (avg. course, peak hour)",
    description:
      "One hour of irrigation on an 18-hole golf course in season.",
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
    id: "ribeye-12oz",
    name: "Ribeye Steak (12 oz)",
    category: "food",
    icon: "beef",
    unit: "steak",
    unitPlural: "steaks",
    defaultQuantity: 1,
    calculationType: "fixed",
    fixedMlPerUnit: 5241000,
    fixedMlDirect: 0,
    fixedMlIndirect: 5241000,
    rangeMl: [4500000, 6500000],
    sourceUrl:
      "https://www.waterfootprint.org/resources/Report38-WaterFootprintAnimalProducts.pdf",
    sourceLabel:
      "WFN beef (~15,400 L/kg global avg × 340 g / 12 oz serving)",
    description:
      "Restaurant-cut ribeye — feed, grazing, and processing water embedded in the meat.",
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
    fixedMlPerUnit: 4000,
    fixedMlDirect: 4000,
    fixedMlIndirect: 0,
    rangeMl: [3800, 4500],
    sourceUrl: "https://www.epa.gov/watersense/showerheads",
    sourceLabel: "EPA WaterSense (2.5 gal/min)",
    description: "Running a standard shower head.",
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
    label: "12 oz ribeye",
    activityId: "ribeye-12oz",
    quantity: 1,
  },
];