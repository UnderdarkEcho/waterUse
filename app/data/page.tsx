import type { Metadata } from "next";
import {
  activities,
  AI_TEXT_ENERGY,
  AI_TEXT_ENERGY_DISPLAY,
  AI_TEXT_WATER,
  GOLF_FACILITY_ML_PER_YEAR,
  SHOWER_ML_PER_MIN,
} from "@/lib/activities";
import { getAppBuildFootprint } from "@/lib/app-footprint";
import { AVERAGE_AI_QUERY } from "@/lib/definitions";
import { calculateWater } from "@/lib/calculate";
import { FIVE_MIN_SHOWER_ML } from "@/lib/comparisons";
import { formatMl, formatRangeMl, formatResultMl } from "@/lib/format";
import { ActivityIcon } from "@/lib/icons";
import { sources } from "@/lib/sources";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Full Data Table & Sources — Water Footprint Calculator",
  description:
    "Complete activity estimates, calculation methodology, and research bibliography for the Water Footprint Calculator.",
};

export default function DataPage() {
  const appFootprint = getAppBuildFootprint(true);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link
          href="/"
          className="text-primary hover:underline text-sm font-medium mb-6 inline-block"
        >
          ← Back to calculator
        </Link>

        <h1 className="text-3xl font-bold mb-2">Full Data Table</h1>
        <p className="text-neutral mb-8 max-w-2xl">
          All activity estimates with research sources. Default quantities shown.
          AI text prompts show on-site cooling by default, with the
          electricity-inclusive range listed separately. Other rows include
          direct and indirect water where the source splits them.
        </p>

        <div className="mb-8 rounded-2xl border border-accent/30 bg-accent/5 p-6 space-y-3">
          <h2 className="font-semibold text-foreground text-lg">
            This application — idea to ship
          </h2>
          <p className="text-sm text-neutral leading-relaxed">
            Estimated{" "}
            <strong className="text-primary">
              {appFootprint.totalMl.toLocaleString()} ml
            </strong>{" "}
            ({appFootprint.totalWh.toLocaleString()} Wh) of AI water to build
            this site: {appFootprint.sourceLines.toLocaleString()} lines across{" "}
            {appFootprint.sourceFiles} files → ~
            {appFootprint.conversationTokens.toLocaleString()} estimated dev
            tokens (~{appFootprint.equivalentQueries.toLocaleString()} query
            equivalents). Range: {appFootprint.rangeMl[0].toLocaleString()}–
            {appFootprint.rangeMl[1].toLocaleString()} ml.
          </p>
          <p className="text-xs text-neutral">
            Methodology in{" "}
            <code className="bg-border/50 px-1 rounded">lib/app-footprint.ts</code>
            . Measured {appFootprint.measuredAt}.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-4">
          <h2 className="font-semibold text-foreground text-lg">
            {AVERAGE_AI_QUERY.title}
          </h2>
          <p className="text-sm text-neutral leading-relaxed">
            {AVERAGE_AI_QUERY.summary}
          </p>
          <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {AVERAGE_AI_QUERY.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="font-medium text-foreground text-xs">
                  {spec.label}
                </dt>
                <dd className="text-neutral text-xs mt-0.5">{spec.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-neutral">
            <strong className="text-foreground">Range:</strong>{" "}
            {AVERAGE_AI_QUERY.range}
          </p>
          <ul className="text-xs text-neutral list-disc pl-5 space-y-1">
            {AVERAGE_AI_QUERY.assumptions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-white dark:bg-slate-800">
                <th className="text-left px-4 py-3 font-semibold">Activity</th>
                <th className="text-left px-4 py-3 font-semibold">Default</th>
                <th className="text-right px-4 py-3 font-semibold">Total (ml)</th>
                <th className="text-right px-4 py-3 font-semibold hidden sm:table-cell">
                  Direct (ml)
                </th>
                <th className="text-right px-4 py-3 font-semibold hidden sm:table-cell">
                  Indirect (ml)
                </th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                  Range (ml)
                </th>
                <th className="text-left px-4 py-3 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => {
                const result = calculateWater(
                  activity,
                  activity.defaultQuantity,
                  { includeIndirect: true }
                );
                const range = activity.citedWater
                  ? activity.citedWater.scopes
                      .map(
                        (scope) =>
                          `${scope.label} ${formatRangeMl(
                            scope.lowMlPerUnit * activity.defaultQuantity,
                            scope.highMlPerUnit * activity.defaultQuantity
                          )}`
                      )
                      .join("; ")
                  : activity.rangeMl
                    ? formatRangeMl(activity.rangeMl[0], activity.rangeMl[1])
                    : "—";
                const cited = Boolean(result.citedRangeMl);

                return (
                  <tr
                    key={activity.id}
                    className="border-b border-border last:border-b-0 hover:bg-primary/5"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <ActivityIcon
                          name={activity.icon}
                          className="w-4 h-4 text-primary shrink-0"
                        />
                        <span className="font-medium">{activity.name}</span>
                      </div>
                      <p className="text-xs text-neutral mt-0.5 hidden lg:block">
                        {activity.description}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-neutral whitespace-nowrap">
                      {activity.defaultQuantity}{" "}
                      {activity.defaultQuantity === 1
                        ? activity.unit
                        : activity.unitPlural}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-primary">
                      {activity.citedWater && activity.citedWater.scopes.length > 1 ? (
                        <span className="inline-block text-right">
                          {activity.citedWater.scopes.map((scope) => (
                            <span key={scope.scope} className="block mt-1 first:mt-0">
                              <span className="block text-[11px] font-normal text-neutral">
                                {scope.label}
                              </span>
                              {formatRangeMl(
                                scope.lowMlPerUnit * activity.defaultQuantity,
                                scope.highMlPerUnit * activity.defaultQuantity
                              )}
                            </span>
                          ))}
                        </span>
                      ) : cited ? (
                        <span>
                          {formatResultMl(result)}
                          {result.scopeLabel && (
                            <span className="block text-[11px] font-normal text-neutral">
                              {result.scopeLabel}
                            </span>
                          )}
                        </span>
                      ) : (
                        formatMl(result.totalMl)
                      )}
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell whitespace-nowrap">
                      {cited ? "—" : formatMl(result.directMl)}
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell whitespace-nowrap">
                      {cited ? "—" : formatMl(result.indirectMl)}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-neutral">
                      {range}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={activity.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs leading-snug"
                      >
                        {activity.sourceLabel}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-2xl border border-border p-6 space-y-4 text-sm text-neutral leading-relaxed">
          <h2 className="font-semibold text-foreground text-base">
            Calculation methodology
          </h2>
          <p>
            <strong className="text-foreground">AI text prompts</strong> use
            cited ranges, not a single Wh × mL/Wh product. Energy is{" "}
            {AI_TEXT_ENERGY_DISPLAY} per prompt (central {AI_TEXT_ENERGY.centralWh}{" "}
            Wh, Epoch). Company-stated medians are {AI_TEXT_ENERGY.companyMedianLowWh}{" "}
            Wh (Google) and {AI_TEXT_ENERGY.companyMedianHighWh} Wh (Altman). The
            high end, {AI_TEXT_ENERGY.upperContextWh} Wh, is The Conversation’s
            GPT-4o figure (record ai-text-energy-conversation-gpt4o). On-site
            cooling is about{" "}
            {formatRangeMl(
              AI_TEXT_WATER.scopes[0].lowMlPerUnit,
              AI_TEXT_WATER.scopes[0].highMlPerUnit
            )}{" "}
            mL (Google / Altman, company-stated). Electricity-inclusive is about{" "}
            {formatRangeMl(
              AI_TEXT_WATER.scopes[1].lowMlPerUnit,
              AI_TEXT_WATER.scopes[1].highMlPerUnit
            )}{" "}
            mL (Li et al. 2023, GPT-3-class, older). Those scopes are not added.
            Sending a plain email still uses an older unverified energy estimate.
          </p>
          <p>
            <strong className="text-foreground">Streaming</strong> per-service
            rates (Netflix, YouTube, music, social video, web browsing) are
            left as previously published and marked unverified. Video calls use
            the Purdue/Obringer range of 2,000–12,000 mL per hour
            (electricity-inclusive).
          </p>
          <p>
            <strong className="text-foreground">Physical activities</strong> use
            EPA WaterSense benchmarks for direct household water. Shower rate
            is the WaterSense maximum, 2.0 gallons per minute (
            {SHOWER_ML_PER_MIN.toLocaleString()} mL/min). A 5-minute shower
            comparison is 5 × that rate ({FIVE_MIN_SHOWER_ML.toLocaleString()}{" "}
            mL), from the shower activity and EPA WaterSense. Golf is the GCSAA
            Phase 4 median for 2024,{" "}
            {(GOLF_FACILITY_ML_PER_YEAR / 1_000_000_000).toLocaleString()} billion
            mL per facility per year (
            {(GOLF_FACILITY_ML_PER_YEAR / 1_000_000_000).toLocaleString()} million
            liters). Averaged over the year, the data-file note states about
            9,700 liters per hour.
          </p>
          <p>
            <strong className="text-foreground">Food &amp; drink</strong> use
            virtual water from crop and animal production (Water Footprint
            Network, Water Footprint Calculator) — water embedded in growing
            ingredients, not the liquid in your cup or on your plate. Beef
            splits industrial (~15,400 L/kg, grain-finished feedlot) vs
            free-range (~20,500 L/kg, pasture-heavy) per Mekonnen &amp;
            Hoekstra.
          </p>
          <p>
            <strong className="text-foreground">Transport</strong> uses fuel
            lifecycle water (Water Footprint Calculator, ~0.75 gal/mi for
            driving) and aviation fuel virtual water (Water Footprint Network,
            ~2,340 mi ANC→WY).
          </p>
          <p>
            <strong className="text-foreground">Water cycle note:</strong>{" "}
            Consumptive use means water evaporates or is incorporated into
            products — it is not destroyed. It re-enters the global hydrologic
            cycle (Ren, OECD.AI; Li et al.; WRI).
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border p-6">
          <h2 className="font-semibold text-foreground text-base mb-4">
            Full bibliography
          </h2>
          <ol className="list-decimal pl-5 space-y-3 text-sm text-neutral">
            {sources.map((src) => (
              <li key={src.id}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  {src.label}
                </a>
                {src.note && <span> — {src.note}</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}