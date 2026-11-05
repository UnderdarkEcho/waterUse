export interface Source {
  id: string;
  label: string;
  url: string;
  note?: string;
}

export const sources: Source[] = [
  {
    id: "li-2023",
    label: 'Li et al., "Making AI Less Thirsty" (2023)',
    url: "https://arxiv.org/abs/2304.03271",
    note: "v0.1 record ai-text-water-li-ren. About 10–50 mL per GPT-3 response in US data centers, electricity-inclusive, 2023. Mixed rating.",
  },
  {
    id: "ren-oecd",
    label: "Ren, OECD.AI — How much water does AI consume? (2023)",
    url: "https://oecd.ai/en/wonk/how-much-water-does-ai-consume",
    note: "Evaporated water stays on Earth; consumptive vs. withdrawal",
  },
  {
    id: "conversation-2025",
    label: "The Conversation — AI hidden water cost (2025)",
    url: "https://theconversation.com/ai-has-a-hidden-water-cost-heres-how-to-calculate-yours-263252",
    note: "v0.1 record ai-text-energy-conversation-gpt4o. 1.75 Wh for a medium GPT-4o query. Used only as the upper context for the about 0.1–2 Wh line. 2 Wh is that figure rounded, not a separate record.",
  },
  {
    id: "obringer-2021",
    label: "Obringer et al., Res. Conserv. Recycl. (2021)",
    url: "https://doi.org/10.1016/j.resconrec.2020.105389",
    note: "v0.1 record cmp-videocall-hour-water: video calls 2,000–12,000 mL/hr, electricity-inclusive. Per-service streaming rates in this app (Netflix, YouTube, music, social video) are unverified.",
  },
  {
    id: "eesi-dc",
    label: "EESI — Data Centers and Water Consumption",
    url: "https://www.eesi.org/articles/view/data-centers-and-water-consumption",
    note: "~80% evaporates; 20% discharged; hydrologic cycle",
  },
  {
    id: "wri-consumption",
    label: "WRI — Water use vs. water consumption",
    url: "https://www.wri.org/insights/whats-difference-between-water-use-and-water-consumption",
    note: "Withdrawal minus discharge; evaporation definition",
  },
  {
    id: "google-gemini",
    label: "Google — Environmental impact of delivering AI at Google scale (Elsworth et al. 2025)",
    url: "https://arxiv.org/abs/2508.15734",
    note: "v0.1 records ai-text-energy-google-gemini (0.24 Wh median, 0.1 Wh narrower) and ai-text-water-google-onsite (0.26 mL on-site, 0.12 mL narrower). Company-stated. Mixed rating.",
  },
  {
    id: "epoch-ai",
    label: "Epoch AI — How much energy does ChatGPT use? (2025)",
    url: "https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use",
    note: "v0.1 record ai-text-energy-epoch-gpt4o. Model-based GPT-4o query: 0.3 Wh central, low 0.1 Wh, high 4 Wh. Mixed rating.",
  },
  {
    id: "altman-openai",
    label: "DatacenterDynamics — Altman on a ChatGPT query (2025)",
    url: "https://www.datacenterdynamics.com/en/news/sam-altman-chatgpt-queries-consume-034-watt-hours-of-electricity-and-0000085-gallons-of-water/",
    note: "v0.1 records ai-text-energy-openai-altman (0.34 Wh) and ai-text-water-openai-altman (0.32 mL). Company-stated. No method or boundary. Weak rating.",
  },
  {
    id: "stanford-ai-index",
    label: "Stanford HAI — 2025 AI Index Report",
    url: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
    note: "AI adoption, R&D, scientific & economic impact",
  },
  {
    id: "oecd-productivity",
    label: "OECD — Impact of AI on productivity (2024)",
    url: "https://www.oecd.org/content/dam/oecd/en/publications/reports/2024/04/the-impact-of-artificial-intelligence-on-productivity-distribution-and-growth_d54e2842/8d900037-en.pdf",
    note: "Productivity growth from AI adoption",
  },
  {
    id: "wharton-productivity",
    label: "Wharton Budget Model — Generative AI & productivity (2025)",
    url: "https://budgetmodel.wharton.upenn.edu/p/2025-09-08-the-projected-impact-of-generative-ai-on-future-productivity-growth/",
    note: "Projected long-run productivity gains",
  },
  {
    id: "stl-fed",
    label: "Federal Reserve Bank of St. Louis — GenAI & work productivity (2025)",
    url: "https://www.stlouisfed.org/on-the-economy/2025/feb/impact-generative-ai-work-productivity",
    note: "Measured productivity improvements from AI tools",
  },
  {
    id: "ncbi-ai-health",
    label: "NCBI — AI in health care (2024)",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK613808/",
    note: "Drug discovery, diagnostics, clinical decision support",
  },
  {
    id: "royal-society",
    label: "Royal Society — Science in the Age of AI",
    url: "https://royalsociety.org/news-resources/projects/science-in-the-age-of-ai/",
    note: "AI accelerating scientific discovery",
  },
  {
    id: "epa-watersense",
    label: "EPA WaterSense",
    url: "https://www.epa.gov/watersense/how-we-use-water",
    note: "Household water benchmarks for context",
  },
  {
    id: "epa-showerheads",
    label: "EPA WaterSense — Showerheads",
    url: "https://www.epa.gov/watersense/showerheads",
    note: "v0.1 record cmp-shower-minute-watersense. WaterSense maximum 2.0 gpm = 7,570 mL/min. A 5-minute shower in the comparisons is 5 × that rate (37,850 mL).",
  },
  {
    id: "epa-outdoor",
    label: "EPA WaterSense — Outdoor water use",
    url: "https://www.epa.gov/watersense/outdoors",
    note: "Americans use ~9 billion gal/day on lawns",
  },
  {
    id: "water-calc-gas",
    label: "Water Footprint Calculator — Gasoline",
    url: "https://watercalculator.org/posts/gasoline/",
    note: "~0.75 gal water per mile driven (fuel lifecycle)",
  },
  {
    id: "wfn-transport",
    label: "Water Footprint Network — Transport",
    url: "https://www.waterfootprint.org/resources/Report44-BurningWater-WaterFootprintTransport.pdf",
    note: "Aviation fuel virtual water",
  },
  {
    id: "gcsaa-golf",
    label: "GCSAA — Golf Course Environmental Profile, Phase 4 water use (2025)",
    url: "https://www.gcsaa.org/docs/default-source/what-we-do/gcep-phase-4-water-report.pdf",
    note: "v0.1 record cmp-golf-facility-year. Median applied water per US facility in 2024, about 85 million liters per year. The notes also state about 9,700 liters per hour averaged over the year.",
  },
  {
    id: "wfn-coffee",
    label: "Water Footprint Network — Coffee",
    url: "https://www.waterfootprint.org/resources/Report53-WaterFootprintCoffees.pdf",
    note: "Virtual water in coffee supply chain",
  },
  {
    id: "wfn-animal",
    label: "Water Footprint Network — Animal products (2010)",
    url: "https://www.waterfootprint.org/resources/Report38-WaterFootprintAnimalProducts.pdf",
    note: "Mekonnen & Hoekstra — industrial beef ~15,400 L/kg; extensive pasture ~20,500 L/kg",
  },
  {
    id: "wfn-crops",
    label: "Water Footprint Network — Crops (2011)",
    url: "https://www.waterfootprint.org/resources/Report48-WaterFootprintCrops.pdf",
    note: "Virtual water for crops and tree nuts; almonds ~16,190 L/kg global avg",
  },
  {
    id: "water-calc-food",
    label: "Water Footprint Calculator — Food guide",
    url: "https://watercalculator.org/water-footprint-of-food-guide/",
    note: "Processed and prepared meal benchmarks",
  },
  {
    id: "microsoft-zero-water",
    label: "Microsoft — Zero-water cooling datacenters (2024)",
    url: "https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/",
    note: "Next-gen closed-loop cooling reducing consumption",
  },
  {
    id: "eia-thermo",
    label: "EIA — Thermoelectric power plant water use",
    url: "https://www.eia.gov/todayinenergy/detail.php?id=56820",
    note: "Coal vs. gas vs. wind/solar cooling water",
  },
  {
    id: "ker-horse",
    label: "Kentucky Equine Research — Horse water requirements",
    url: "https://ker.com/equinews/horse-water-requirements-five-important-facts/",
    note: "Horses drink 5–15 gal (20–55 L) per day in multiple visits",
  },
  {
    id: "statpearls-insensible",
    label: "StatPearls — Insensible fluid loss (2023)",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK544219/",
    note: "Respiratory & skin water loss; 600–800 ml/day insensible total",
  },
];

export function getSource(id: string): Source | undefined {
  return sources.find((s) => s.id === id);
}