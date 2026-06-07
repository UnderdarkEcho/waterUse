"use client";

import { AppBuildFootprint } from "./AppBuildFootprint";
import { Calculator } from "./Calculator";
import { ComparisonsGrid } from "./ComparisonsGrid";
import { EducationalAccordion } from "./EducationalAccordion";
import { PerspectiveBanner } from "./PerspectiveBanner";
import { HeroHeader } from "./HeroHeader";
import { ShareExportCard } from "./ShareExportCard";
import { SiteFooter } from "./SiteFooter";
import { useTheme } from "./ThemeProvider";
import { activities, getActivity } from "@/lib/activities";
import { calculateWater } from "@/lib/calculate";
import { getComparison } from "@/lib/comparisons";
import { buildShareTweetText } from "@/lib/share-text";
import { useEffect, useMemo, useRef, useState } from "react";

export function HomePage() {
  const { isDark } = useTheme();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [siteUrl, setSiteUrl] = useState("");

  const [activityId, setActivityId] = useState(activities[0].id);
  const [quantity, setQuantity] = useState(activities[0].defaultQuantity);
  const [includeIndirect, setIncludeIndirect] = useState(true);
  const [showAiComparison, setShowAiComparison] = useState(true);

  useEffect(() => {
    setSiteUrl(window.location.href.split("?")[0]);
  }, []);

  function handleActivityChange(id: string) {
    const activity = activities.find((a) => a.id === id);
    setActivityId(id);
    if (activity) setQuantity(activity.defaultQuantity);
  }

  const activity = getActivity(activityId) ?? activities[0];

  const result = useMemo(
    () => calculateWater(activity, quantity, { includeIndirect }),
    [activity, quantity, includeIndirect]
  );

  const comparison = useMemo(
    () => getComparison(result.totalMl),
    [result.totalMl]
  );

  const unitLabel = quantity === 1 ? activity.unit : activity.unitPlural;

  const shareTweetText = useMemo(
    () =>
      buildShareTweetText(
        result.totalMl,
        activity.name,
        quantity,
        activity.unit,
        activity.unitPlural
      ),
    [result.totalMl, activity, quantity]
  );

  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />
      <PerspectiveBanner />
      <Calculator
        activityId={activityId}
        quantity={quantity}
        includeIndirect={includeIndirect}
        shareCardRef={shareCardRef}
        onActivityChange={handleActivityChange}
        onQuantityChange={setQuantity}
      />
      <ComparisonsGrid
        selectedId={activityId}
        includeIndirect={includeIndirect}
      />
      <EducationalAccordion
        includeIndirect={includeIndirect}
        onIncludeIndirectChange={setIncludeIndirect}
        showAiComparison={showAiComparison}
        onShowAiComparisonChange={setShowAiComparison}
      />
      <AppBuildFootprint />
      <SiteFooter
        shareTweetText={shareTweetText}
        shareCardRef={shareCardRef}
      />

      <ShareExportCard
        ref={shareCardRef}
        totalMl={result.totalMl}
        activityName={activity.name}
        quantity={quantity}
        unitLabel={unitLabel}
        comparison={comparison}
        siteUrl={siteUrl}
        isDark={isDark}
      />
    </div>
  );
}