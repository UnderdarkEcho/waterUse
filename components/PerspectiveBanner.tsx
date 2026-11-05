import { AI_TEXT_WATER, aiEnergyNote } from "@/lib/activities";
import { formatRangeMl } from "@/lib/format";
import { getSource } from "@/lib/sources";
import { Cite } from "./Citation";

export function PerspectiveBanner() {
  const onSite = AI_TEXT_WATER.scopes[0];
  const electricity = AI_TEXT_WATER.scopes[1];

  return (
    <section className="max-w-5xl mx-auto px-4 pb-2">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-sm sm:text-base leading-relaxed text-foreground">
          One text prompt uses about{" "}
          {formatRangeMl(onSite.lowMlPerUnit, onSite.highMlPerUnit)} mL of
          on-site cooling water (
          <Cite href={getSource("google-gemini")!.url}>Google</Cite> and{" "}
          <Cite href={getSource("altman-openai")!.url}>Altman</Cite>,
          company-stated). A separate electricity-inclusive estimate is about{" "}
          {formatRangeMl(electricity.lowMlPerUnit, electricity.highMlPerUnit)}{" "}
          mL (
          <Cite href={getSource("li-2023")!.url}>Li et al. 2023</Cite>,
          GPT-3-class, older). Those scopes are not added together.{" "}
          {aiEnergyNote()} Water counted here is not destroyed. It re-enters
          the hydrologic cycle (
          <Cite href={getSource("ren-oecd")!.url}>OECD.AI</Cite>).
        </p>
      </div>
    </section>
  );
}