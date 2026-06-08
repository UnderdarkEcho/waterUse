"use client";

import { activities } from "@/lib/activities";
import { calculateWater } from "@/lib/calculate";
import { formatMl } from "@/lib/format";
import { getImpactBarWidth, getImpactColor, getImpactLevel } from "@/lib/impact";
import { ActivityIcon } from "@/lib/icons";
import { useMemo } from "react";

interface ComparisonsGridProps {
  selectedId: string;
  includeIndirect: boolean;
}

export function ComparisonsGrid({
  selectedId,
  includeIndirect,
}: ComparisonsGridProps) {
  const items = useMemo(() => {
    return activities.map((activity) => {
      const qty = activity.defaultQuantity;
      const result = calculateWater(activity, qty, { includeIndirect });
      return {
        activity,
        ml: result.totalMl,
        qty,
      };
    });
  }, [includeIndirect]);

  const maxMl = Math.max(...items.map((i) => i.ml));

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 w-full min-w-0">
      <h2 className="text-xl font-bold mb-4">Activity Comparisons</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible">
        {items.map(({ activity, ml, qty }) => {
          const level = getImpactLevel(ml);
          const isSelected = activity.id === selectedId;
          const unitLabel = qty === 1 ? activity.unit : activity.unitPlural;

          return (
            <div
              key={activity.id}
              className={`snap-start shrink-0 w-44 md:w-auto rounded-2xl border p-4 transition-all ${
                isSelected
                  ? "border-primary ring-2 ring-primary/30 bg-primary/5"
                  : "border-border bg-white dark:bg-slate-800"
              }`}
            >
              <ActivityIcon
                name={activity.icon}
                className={`w-6 h-6 mb-3 ${isSelected ? "text-primary" : "text-neutral"}`}
              />
              <p className="font-medium text-sm leading-tight mb-1">
                {activity.name}
              </p>
              <p className="text-xs text-neutral mb-2">
                {qty} {unitLabel}
              </p>
              <p className="text-lg font-bold text-primary mb-3">
                {formatMl(ml)} ml
              </p>
              <div className="h-2 rounded-full bg-border overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getImpactColor(level)}`}
                  style={{ width: `${getImpactBarWidth(ml, maxMl)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}