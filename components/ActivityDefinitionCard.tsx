"use client";

import { Cite } from "./Citation";
import { type ActivityDefinition } from "@/lib/definitions";
import { getSource } from "@/lib/sources";
import { Info } from "lucide-react";
import { useState } from "react";

export function ActivityDefinitionCard({
  definition,
  compact = false,
}: {
  definition: ActivityDefinition;
  compact?: boolean;
}) {
  const [expanded, setExpanded] = useState(!compact);

  return (
    <div className="rounded-xl border border-border bg-background/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-2 px-4 py-3 text-left hover:bg-primary/5 transition-colors"
      >
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-sm font-medium text-foreground">
            {definition.title}
          </p>
          {!expanded && (
            <p className="text-xs text-neutral mt-0.5 truncate">
              {definition.typicalResult}
            </p>
          )}
        </div>
        <span className="text-xs text-neutral shrink-0">
          {expanded ? "Hide" : "Show"}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 text-sm text-neutral border-t border-border pt-3">
          <p className="leading-relaxed">{definition.summary}</p>

          <dl className="space-y-1.5">
            {definition.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-col gap-0.5 sm:grid sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-2"
              >
                <dt className="text-xs font-medium text-foreground shrink-0">
                  {spec.label}
                </dt>
                <dd className="text-xs break-words">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <p className="text-xs">
            <span className="font-medium text-foreground">Formula:</span>{" "}
            <code className="bg-border/50 px-1 py-0.5 rounded">
              {definition.formula}
            </code>
          </p>

          <p className="text-xs">
            <span className="font-medium text-foreground">Typical result:</span>{" "}
            {definition.typicalResult}
          </p>

          <p className="text-xs">
            <span className="font-medium text-foreground">Range:</span>{" "}
            {definition.range}
          </p>

          <ul className="text-xs list-disc pl-4 space-y-1">
            {definition.assumptions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <p className="text-xs pt-1">
            Sources:{" "}
            {definition.sourceIds.map((id, i) => {
              const src = getSource(id);
              if (!src) return null;
              return (
                <span key={id}>
                  {i > 0 && ", "}
                  <Cite href={src.url}>{src.label}</Cite>
                </span>
              );
            })}
          </p>
        </div>
      )}
    </div>
  );
}