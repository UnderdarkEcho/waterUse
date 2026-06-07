"use client";

import { ActivitySelect } from "./ActivitySelect";
import { WaterDrop } from "./WaterDrop";
import { ActivityDefinitionCard } from "./ActivityDefinitionCard";
import { activities, getActivity, presets } from "@/lib/activities";
import { getActivityDefinition } from "@/lib/definitions";
import { calculateWater } from "@/lib/calculate";
import { getComparison } from "@/lib/comparisons";
import {
  formatActivityUsage,
  formatGallons,
  formatLiters,
  formatMl,
} from "@/lib/format";
import { captureShareCard, downloadShareImage } from "@/lib/export-image";
import { getImpactLevel } from "@/lib/impact";
import { useTheme } from "./ThemeProvider";
import { Copy, Download, Droplets } from "lucide-react";
import { useMemo, useState } from "react";

interface CalculatorProps {
  activityId: string;
  quantity: number;
  includeIndirect: boolean;
  shareCardRef: React.RefObject<HTMLDivElement | null>;
  onActivityChange: (id: string) => void;
  onQuantityChange: (qty: number) => void;
}

export function Calculator({
  activityId,
  quantity,
  includeIndirect,
  shareCardRef,
  onActivityChange,
  onQuantityChange,
}: CalculatorProps) {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [pulse, setPulse] = useState(false);

  const activity = getActivity(activityId) ?? activities[0];
  const definition = getActivityDefinition(activityId);

  const result = useMemo(
    () =>
      calculateWater(activity, quantity, { includeIndirect }),
    [activity, quantity, includeIndirect]
  );

  const comparison = getComparison(result.totalMl);
  const impact = getImpactLevel(result.totalMl);
  const unitLabel = quantity === 1 ? activity.unit : activity.unitPlural;

  function handleCalculate() {
    setPulse(true);
    setTimeout(() => setPulse(false), 800);
  }

  async function handleCopy() {
    const usage = formatActivityUsage(
      activity.name,
      quantity,
      activity.unit,
      activity.unitPlural
    );
    const text = `I used ${formatMl(result.totalMl)} ml of water (${formatLiters(result.totalMl)} liters) from ${usage} — that's roughly the same as ${comparison.replace(/^[^\s]+\s/, "")}. Calculate yours at Water Footprint Calculator.`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleExport() {
    const node = shareCardRef.current;
    if (!node) return;
    setExporting(true);
    try {
      const blob = await captureShareCard(node, isDark);
      downloadShareImage(blob);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-4">
      <div className="rounded-2xl border border-border bg-white dark:bg-slate-800 shadow-sm p-6 sm:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <ActivitySelect value={activityId} onChange={onActivityChange} />

            {definition && (
              <ActivityDefinitionCard definition={definition} compact />
            )}

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-neutral mb-2"
              >
                Quantity / Duration
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="quantity"
                  type="number"
                  min={0}
                  step={activity.unit === "hour" ? 0.5 : 1}
                  value={quantity}
                  onChange={(e) =>
                    onQuantityChange(Math.max(0, parseFloat(e.target.value) || 0))
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-lg font-medium outline-none focus:border-primary transition-colors min-h-[52px]"
                />
                <span className="text-neutral font-medium min-w-[60px]">
                  {unitLabel}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-lg transition-colors min-h-[52px]"
            >
              <Droplets className="w-5 h-5" />
              Calculate
            </button>

            <div className="flex flex-wrap gap-2 pt-1">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    onActivityChange(preset.activityId);
                    onQuantityChange(preset.quantity);
                  }}
                  className="text-xs sm:text-sm px-3 py-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-neutral text-sm uppercase tracking-wider">
              You used
            </p>
            <p
              className={`text-5xl sm:text-6xl font-bold text-primary transition-transform ${pulse ? "scale-105" : ""}`}
            >
              {formatMl(result.totalMl)}{" "}
              <span className="text-2xl sm:text-3xl">ml</span>
            </p>
            <p className="text-neutral text-sm">
              ({formatLiters(result.totalMl)} liters / {formatGallons(result.totalMl)}{" "}
              gallons)
            </p>

            <WaterDrop ml={result.totalMl} animate={pulse && impact === "low"} />

            <p className="text-sm sm:text-base text-neutral max-w-xs">
              That&apos;s roughly the same as{" "}
              <span className="font-medium text-foreground">{comparison}</span>
            </p>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-primary/5 text-sm font-medium transition-colors min-h-[44px]"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy result"}
              </button>
              <button
                type="button"
                onClick={handleExport}
                disabled={exporting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-primary/5 text-sm font-medium transition-colors min-h-[44px] disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {exporting ? "Exporting..." : "Export image"}
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}