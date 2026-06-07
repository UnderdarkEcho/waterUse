"use client";

import { Cite } from "./Citation";
import { getAppBuildFootprint } from "@/lib/app-footprint";
import { formatLiters, formatMl } from "@/lib/format";
import { getSource } from "@/lib/sources";
import { Code2 } from "lucide-react";
import { useState } from "react";

export function AppBuildFootprint() {
  const [showDetails, setShowDetails] = useState(false);
  const footprint = getAppBuildFootprint(true);

  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <div className="rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start gap-3">
          <Code2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <p className="text-sm sm:text-base leading-relaxed text-foreground">
              <strong className="font-semibold">This application</strong> used
              an estimated{" "}
              <strong className="text-primary">
                {formatMl(footprint.totalMl)} ml
              </strong>{" "}
              ({formatLiters(footprint.totalMl)} L) of water from idea to
              ship — AI-assisted design, implementation, and iteration included.
            </p>
            <p className="text-xs text-neutral">
              ~{footprint.conversationTokens.toLocaleString()} estimated AI
              tokens · ~{footprint.equivalentQueries.toLocaleString()} medium-query
              equivalents · {footprint.sourceLines.toLocaleString()} lines shipped
            </p>
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-primary hover:underline font-medium"
            >
              {showDetails ? "Hide" : "Show"} how we calculated this
            </button>
            {showDetails && (
              <div className="text-xs text-neutral space-y-2 pt-2 border-t border-border leading-relaxed">
                <p>
                  <strong className="text-foreground">Measured (this repo):</strong>{" "}
                  {footprint.sourceFiles} source files,{" "}
                  {footprint.sourceLines.toLocaleString()} lines,{" "}
                  {footprint.sourceChars.toLocaleString()} characters in{" "}
                  <code className="bg-border/50 px-1 rounded">app/</code>,{" "}
                  <code className="bg-border/50 px-1 rounded">components/</code>,{" "}
                  <code className="bg-border/50 px-1 rounded">lib/</code> (as of{" "}
                  {footprint.measuredAt}).
                </p>
                <p>
                  <strong className="text-foreground">Token estimate:</strong>{" "}
                  {footprint.sourceChars.toLocaleString()} chars ÷ 3.5 ≈{" "}
                  {footprint.codeTokens.toLocaleString()} code tokens ×{" "}
                  {footprint.aiDevMultiplier} (planning, prompts, retries, reviews) ≈{" "}
                  <strong className="text-foreground">
                    {footprint.conversationTokens.toLocaleString()} total AI tokens
                  </strong>
                  .
                </p>
                <p>
                  <strong className="text-foreground">Energy:</strong>{" "}
                  {footprint.conversationTokens.toLocaleString()} tokens ×{" "}
                  {footprint.whPerToken.toFixed(4)} Wh/token (1.75 Wh per ~440-token
                  coding exchange,{" "}
                  <Cite href={getSource("conversation-2025")!.url}>
                    The Conversation
                  </Cite>
                  ) ≈ {footprint.totalWh.toLocaleString()} Wh.
                </p>
                <p>
                  <strong className="text-foreground">Water:</strong>{" "}
                  {footprint.totalWh.toLocaleString()} Wh × 2.0 ml/Wh ≈{" "}
                  {formatMl(footprint.totalMl)} ml. Range:{" "}
                  {formatMl(footprint.rangeMl[0])}–{formatMl(footprint.rangeMl[1])}{" "}
                  ml (efficient vs. typical data centers).
                </p>
                <p className="italic">
                  This is an estimate — we don&apos;t log API token meters. Update{" "}
                  <code className="bg-border/50 px-1 rounded">
                    lib/app-footprint.ts
                  </code>{" "}
                  when the codebase grows.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}