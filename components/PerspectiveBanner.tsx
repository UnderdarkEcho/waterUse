import { Cite } from "./Citation";

export function PerspectiveBanner() {
  return (
    <section className="max-w-5xl mx-auto px-4 pb-2">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-sm sm:text-base leading-relaxed text-foreground">
          <strong className="font-semibold">The bottom line:</strong> Yes, AI
          uses water — but a single query is a few milliliters, water is never
          destroyed (it re-enters the hydrologic cycle), and the productivity,
          science, and problem-solving gains are enormous.{" "}
          <Cite href="https://oecd.ai/en/wonk/how-much-water-does-ai-consume">
            OECD.AI
          </Cite>
          ,{" "}
          <Cite href="https://hai.stanford.edu/ai-index/2025-ai-index-report">
            Stanford AI Index
          </Cite>
        </p>
      </div>
    </section>
  );
}