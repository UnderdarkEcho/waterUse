import type { Metadata } from "next";
import { activities } from "@/lib/activities";
import { getAppBuildFootprint } from "@/lib/app-footprint";
import { AVERAGE_AI_QUERY } from "@/lib/definitions";
import { calculateWater } from "@/lib/calculate";
import { formatMl } from "@/lib/format";
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
          Total water includes both direct (data center cooling) and indirect
          (power generation) components.
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
                const range = activity.rangeMl
                  ? `${formatMl(activity.rangeMl[0])}–${formatMl(activity.rangeMl[1])}`
                  : "—";

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
                    <td className="px-4 py-3 text-right font-medium text-primary whitespace-nowrap">
                      {formatMl(result.totalMl)}
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell whitespace-nowrap">
                      {formatMl(result.directMl)}
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell whitespace-nowrap">
                      {formatMl(result.indirectMl)}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-neutral whitespace-nowrap">
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
            <strong className="text-foreground">Energy-based activities</strong>{" "}
            (AI queries, emails) use: water (ml) = energy (Wh) × ml/Wh. Default
            factors: 0.8 ml/Wh direct + 1.2 ml/Wh indirect = 2.0 ml/Wh total,
            based on The Conversation and NREL thermoelectric water studies.
          </p>
          <p>
            <strong className="text-foreground">Streaming &amp; communication</strong>{" "}
            use per-hour estimates from Obringer et al. (2021), split ~40%
            direct / 60% indirect.
          </p>
          <p>
            <strong className="text-foreground">Physical activities</strong> use
            EPA WaterSense benchmarks for direct household water.
          </p>
          <p>
            <strong className="text-foreground">Food &amp; drink</strong> use
            virtual water from crop and animal production (Water Footprint
            Network, Water Footprint Calculator) — water embedded in growing
            ingredients, not the liquid in your cup or on your plate.
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