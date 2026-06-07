"use client";

import { getShareCardTheme } from "@/lib/share-card-theme";
import { formatMl } from "@/lib/format";
import { forwardRef } from "react";

interface ShareExportCardProps {
  totalMl: number;
  activityName: string;
  quantity: number;
  unitLabel: string;
  comparison: string;
  siteUrl: string;
  isDark: boolean;
}

export const ShareExportCard = forwardRef<HTMLDivElement, ShareExportCardProps>(
  function ShareExportCard(
    {
      totalMl,
      activityName,
      quantity,
      unitLabel,
      comparison,
      siteUrl,
      isDark,
    },
    ref
  ) {
    const theme = getShareCardTheme(isDark);

    return (
      <div
        ref={ref}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 600,
          padding: 32,
          borderRadius: 16,
          backgroundColor: theme.background,
          color: theme.foreground,
          border: `1px solid ${theme.border}`,
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          lineHeight: 1.4,
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
        aria-hidden
      >
        <p style={{ fontSize: 14, color: theme.muted, margin: "0 0 8px" }}>
          Water Footprint Calculator
        </p>
        <p
          style={{
            fontSize: 24,
            fontWeight: 700,
            margin: "0 0 16px",
            color: theme.foreground,
          }}
        >
          How Much Water Did You Just Use?
        </p>
        <p
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: theme.primary,
            margin: "0 0 8px",
          }}
        >
          {formatMl(totalMl)} ml
        </p>
        <p style={{ fontSize: 18, color: theme.muted, margin: "0 0 16px" }}>
          {activityName} × {quantity} {unitLabel}
        </p>
        <p style={{ fontSize: 16, color: theme.foreground, margin: "0 0 20px" }}>
          Roughly the same as {comparison}
        </p>
        <p
          style={{
            fontSize: 14,
            color: theme.primary,
            margin: 0,
            wordBreak: "break-all",
          }}
        >
          {siteUrl || "waterfootprint.calculator"}
        </p>
      </div>
    );
  }
);