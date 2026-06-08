"use client";

import { Cite, SourceList } from "./Citation";
import { activities } from "@/lib/activities";
import { calculateWater } from "@/lib/calculate";
import { formatMl } from "@/lib/format";
import { roundPct } from "@/lib/impact";
import { AVERAGE_AI_QUERY } from "@/lib/definitions";
import { getSource } from "@/lib/sources";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

interface EducationalAccordionProps {
  includeIndirect: boolean;
  onIncludeIndirectChange: (value: boolean) => void;
  showAiComparison: boolean;
  onShowAiComparisonChange: (value: boolean) => void;
  showBeefComparison: boolean;
  onShowBeefComparisonChange: (value: boolean) => void;
}

export function EducationalAccordion({
  includeIndirect,
  onIncludeIndirectChange,
  showAiComparison,
  onShowAiComparisonChange,
  showBeefComparison,
  onShowBeefComparisonChange,
}: EducationalAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>("worth-it");

  const aiVsTraditional = useMemo(() => {
    const ai = activities.find((a) => a.id === "ai-query")!;
    const browse = activities.find((a) => a.id === "web-browsing")!;
    const lawn = activities.find((a) => a.id === "lawn-sprinkler")!;
    const aiResult = calculateWater(ai, 10, { includeIndirect });
    const browseResult = calculateWater(browse, 1, { includeIndirect });
    const lawnResult = calculateWater(lawn, 30, { includeIndirect });
    return {
      ai: aiResult.totalMl,
      browse: browseResult.totalMl,
      lawn: lawnResult.totalMl,
    };
  }, [includeIndirect]);

  const beefComparison = useMemo(() => {
    const industrial = activities.find((a) => a.id === "ribeye-industrial")!;
    const freeRange = activities.find((a) => a.id === "ribeye-free-range")!;
    const industrialMl = calculateWater(industrial, 1, { includeIndirect }).totalMl;
    const freeRangeMl = calculateWater(freeRange, 1, { includeIndirect }).totalMl;
    return { industrial: industrialMl, freeRange: freeRangeMl };
  }, [includeIndirect]);

  const sections = [
    {
      id: "worth-it",
      title: "Why AI is worth it",
      content: (
        <div className="space-y-3 text-neutral leading-relaxed">
          <p>
            AI is not just a chatbot — it is infrastructure for moving faster on
            hard problems. The{" "}
            <Cite href={getSource("stanford-ai-index")!.url}>
              2025 Stanford AI Index
            </Cite>{" "}
            documents accelerating R&D, wider adoption across industries, and
            measurable gains in scientific and economic output.
          </p>
          <p>
            <Cite href={getSource("oecd-productivity")!.url}>
              OECD research
            </Cite>{" "}
            and the{" "}
            <Cite href={getSource("wharton-productivity")!.url}>
              Wharton Budget Model
            </Cite>{" "}
            project significant long-run productivity growth from generative AI.
            The{" "}
            <Cite href={getSource("stl-fed")!.url}>
              Federal Reserve Bank of St. Louis
            </Cite>{" "}
            finds workers already completing tasks faster with AI assistance.
          </p>
          <p>
            In medicine,{" "}
            <Cite href={getSource("ncbi-ai-health")!.url}>
              NCBI reviews
            </Cite>{" "}
            highlight AI in drug discovery, diagnostics, and clinical support.
            The{" "}
            <Cite href={getSource("royal-society")!.url}>
              Royal Society
            </Cite>{" "}
            describes AI as accelerating the pace of science itself — compressing
            years of analysis into hours.
          </p>
          <p>
            <Cite href={getSource("ren-oecd")!.url}>
              OECD.AI
            </Cite>{" "}
            puts it plainly: AI is already the backbone of scientific
            breakthroughs, business growth, and approaches to global challenges
            including climate adaptation. A few milliliters of water per query is
            a tiny price for that leverage — especially as{" "}
            <Cite href={getSource("google-gemini")!.url}>
              Google&apos;s latest systems
            </Cite>{" "}
            show efficiency improving fast.
          </p>
        </div>
      ),
    },
    {
      id: "water-cycle",
      title: "Water isn't destroyed — it cycles",
      content: (
        <div className="space-y-3 text-neutral leading-relaxed">
          <p>
            Water used by data centers is not gone forever. As{" "}
            <Cite href={getSource("ren-oecd")!.url}>
              UC Riverside researcher Shaolei Ren (OECD.AI)
            </Cite>{" "}
            explains: evaporated water &ldquo;still stays within our planet just
            like any other matter.&rdquo; It returns to the atmosphere and
            rejoins the global hydrologic cycle as rain, snow, or runoff
            elsewhere.
          </p>
          <p>
            Researchers distinguish{" "}
            <Cite href={getSource("wri-consumption")!.url}>
              water withdrawal
            </Cite>{" "}
            (temporarily borrowed from rivers or aquifers) from{" "}
            <strong className="text-foreground">water consumption</strong>{" "}
            (withdrawal minus discharge — mainly evaporation).{" "}
            <Cite href={getSource("li-2023")!.url}>
              Li et al.
            </Cite>{" "}
            and{" "}
            <Cite href={getSource("eesi-dc")!.url}>
              EESI
            </Cite>{" "}
            note that roughly 80% of data-center cooling water evaporates while
            ~20% is discharged warm to wastewater systems — neither case
            destroys H₂O molecules.
          </p>
          <p>
            The real concern is <em>local timing and place</em>: evaporative
            cooling can stress drought-prone regions when freshwater is withdrawn
            faster than it replenishes locally. That is a distribution challenge,
            not annihilation. Solutions are scaling:{" "}
            <Cite href={getSource("microsoft-zero-water")!.url}>
              closed-loop and zero-water cooling
            </Cite>
            , recycled wastewater, and{" "}
            <Cite href={getSource("eia-thermo")!.url}>
              cleaner grids
            </Cite>{" "}
            (wind and solar use virtually no cooling water).
          </p>
        </div>
      ),
    },
    {
      id: "context",
      title: "Putting the numbers in context",
      content: (
        <div className="space-y-3 text-neutral leading-relaxed">
          <p>
            Transparency matters — but perspective matters too. Ten AI queries
            use about{" "}
            <strong className="text-foreground">
              {formatMl(aiVsTraditional.ai)} ml
            </strong>{" "}
            of water here. That is less than one hour of web browsing (
            {formatMl(aiVsTraditional.browse)} ml), and a fraction of watering
            your lawn for 30 minutes (
            {formatMl(aiVsTraditional.lawn)} ml).{" "}
            <Cite href={getSource("conversation-2025")!.url}>
              The Conversation
            </Cite>{" "}
            notes that Americans use roughly 34 billion liters per day on
            residential lawns — orders of magnitude more than daily AI totals.
          </p>
          <p>
            This calculator shows honest estimates so you can see the tradeoff
            clearly: digital life has a water footprint, AI adds to it, but
            everyday physical activities (showers, irrigation, driving) often
            dwarf a day of AI use. The goal is informed enthusiasm — use AI to
            move fast, understand the cost, and push for ever-more-efficient
            infrastructure.
          </p>
          <p className="text-sm">
            Sources:{" "}
            <Cite href={getSource("obringer-2021")!.url}>
              Obringer et al.
            </Cite>
            ,{" "}
            <Cite href={getSource("epa-outdoor")!.url}>
              EPA WaterSense
            </Cite>
            ,{" "}
            <Cite href={getSource("li-2023")!.url}>
              Li et al.
            </Cite>
          </p>
        </div>
      ),
    },
    {
      id: "ai-definition",
      title: AVERAGE_AI_QUERY.title,
      content: (
        <div className="space-y-3 text-neutral leading-relaxed text-sm">
          <p>{AVERAGE_AI_QUERY.summary}</p>
          <dl className="space-y-2">
            {AVERAGE_AI_QUERY.specs.map((spec) => (
              <div key={spec.label} className="grid sm:grid-cols-[10rem_1fr] gap-1">
                <dt className="font-medium text-foreground">{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          <p>
            <strong className="text-foreground">Range:</strong>{" "}
            {AVERAGE_AI_QUERY.range}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            {AVERAGE_AI_QUERY.assumptions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "methodology",
      title: "Sources & methodology",
      content: (
        <div className="space-y-4 text-neutral leading-relaxed">
          <p>
            Digital activities use:{" "}
            <code className="text-sm bg-border/50 px-1.5 py-0.5 rounded">
              water (ml) = energy (Wh) × ml/Wh
            </code>{" "}
            per{" "}
            <Cite href={getSource("conversation-2025")!.url}>
              The Conversation
            </Cite>{" "}
            (1.3–2.0 ml/Wh). Direct cooling and power-plant water are split per{" "}
            <Cite href={getSource("li-2023")!.url}>
              Li et al.
            </Cite>
          </p>
          <SourceList
            ids={[
              "li-2023",
              "ren-oecd",
              "conversation-2025",
              "obringer-2021",
              "eesi-dc",
              "wri-consumption",
              "google-gemini",
              "stanford-ai-index",
              "oecd-productivity",
              "wharton-productivity",
              "stl-fed",
              "ncbi-ai-health",
              "royal-society",
              "epa-watersense",
              "epa-outdoor",
              "water-calc-gas",
              "wfn-transport",
              "usga-golf",
              "wfn-coffee",
              "wfn-animal",
              "wfn-crops",
              "water-calc-food",
              "microsoft-zero-water",
              "eia-thermo",
            ]}
          />
        </div>
      ),
    },
    {
      id: "toggles",
      title: "Calculation options",
      content: (
        <div className="space-y-5">
          <label className="flex items-center justify-between gap-3 sm:gap-4 cursor-pointer min-w-0">
            <div className="min-w-0 flex-1">
              <p className="font-medium">Include indirect water</p>
              <p className="text-sm text-neutral">
                Add power-plant water used to generate electricity (
                <Cite href={getSource("li-2023")!.url}>scope-2</Cite>)
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={includeIndirect}
              onClick={() => onIncludeIndirectChange(!includeIndirect)}
              className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${
                includeIndirect ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  includeIndirect ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between gap-3 sm:gap-4 cursor-pointer min-w-0">
            <div className="min-w-0 flex-1">
              <p className="font-medium">AI vs traditional browsing</p>
              <p className="text-sm text-neutral">
                Compare 10 AI queries to 1 hour of web browsing
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={showAiComparison}
              onClick={() => onShowAiComparisonChange(!showAiComparison)}
              className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${
                showAiComparison ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  showAiComparison ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>

          {showAiComparison && (
            <div className="rounded-xl border border-border p-4 space-y-3">
              <p className="text-sm font-medium">Side-by-side comparison</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>10 AI queries</span>
                  <span className="font-medium text-primary">
                    {formatMl(aiVsTraditional.ai)} ml
                  </span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${roundPct(Math.min(100, (aiVsTraditional.ai / Math.max(aiVsTraditional.ai, aiVsTraditional.browse)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>1 hour web browsing</span>
                  <span className="font-medium text-accent">
                    {formatMl(aiVsTraditional.browse)} ml
                  </span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{
                      width: `${roundPct(Math.min(100, (aiVsTraditional.browse / Math.max(aiVsTraditional.ai, aiVsTraditional.browse)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <label className="flex items-center justify-between gap-3 sm:gap-4 cursor-pointer min-w-0">
            <div className="min-w-0 flex-1">
              <p className="font-medium">Industrial vs free-range beef</p>
              <p className="text-sm text-neutral">
                Compare 12 oz ribeye — feedlot vs pasture-finished (
                <Cite href={getSource("wfn-animal")!.url}>WFN</Cite>)
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={showBeefComparison}
              onClick={() => onShowBeefComparisonChange(!showBeefComparison)}
              className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${
                showBeefComparison ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  showBeefComparison ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>

          {showBeefComparison && (
            <div className="rounded-xl border border-border p-4 space-y-3">
              <p className="text-sm font-medium">12 oz ribeye comparison</p>
              <p className="text-xs text-neutral leading-relaxed">
                Both are huge. Free-range often looks higher because more
                pasture rainfall (green water) is counted over a longer raise —
                not because the cow drinks more at the trough.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm gap-2">
                  <span>Industrial (grain-finished)</span>
                  <span className="font-medium text-primary shrink-0">
                    {formatMl(beefComparison.industrial)} ml
                  </span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${roundPct(Math.min(100, (beefComparison.industrial / Math.max(beefComparison.industrial, beefComparison.freeRange)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm gap-2">
                  <span>Free-range (pasture-finished)</span>
                  <span className="font-medium text-accent shrink-0">
                    {formatMl(beefComparison.freeRange)} ml
                  </span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{
                      width: `${roundPct(Math.min(100, (beefComparison.freeRange / Math.max(beefComparison.industrial, beefComparison.freeRange)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-6 w-full">
      <div className="rounded-2xl border border-border bg-white dark:bg-slate-800 overflow-hidden min-w-0">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border-b border-border last:border-b-0"
          >
            <button
              type="button"
              onClick={() =>
                setOpenSection(openSection === section.id ? null : section.id)
              }
              className="w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-4 text-left hover:bg-primary/5 transition-colors min-w-0"
            >
              <span className="font-semibold text-left">{section.title}</span>
              <ChevronDown
                className={`w-5 h-5 text-neutral transition-transform ${
                  openSection === section.id ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSection === section.id && (
              <div className="px-4 sm:px-6 pb-5 min-w-0">{section.content}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}