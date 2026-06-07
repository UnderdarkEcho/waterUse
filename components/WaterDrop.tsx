"use client";

import { getWaterDropFill } from "@/lib/impact";

export function WaterDrop({ ml, animate }: { ml: number; animate?: boolean }) {
  const fillInset = getWaterDropFill(ml);

  return (
    <div className="relative w-28 h-36 mx-auto">
      {animate && ml < 100 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-primary/30 animate-ripple" />
        </div>
      )}
      <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-sm">
        <defs>
          <clipPath id="dropShape">
            <path d="M50 8 C50 8 12 58 12 82 C12 102 28 118 50 118 C72 118 88 102 88 82 C88 58 50 8 50 8 Z" />
          </clipPath>
          <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        <path
          d="M50 8 C50 8 12 58 12 82 C12 102 28 118 50 118 C72 118 88 102 88 82 C88 58 50 8 50 8 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-border"
        />
        <g clipPath="url(#dropShape)">
          <rect
            x="0"
            y="0"
            width="100"
            height="130"
            fill="url(#waterGradient)"
            className={animate ? "water-fill" : ""}
            style={
              animate
                ? ({ "--fill-inset": `${fillInset}%` } as React.CSSProperties)
                : { clipPath: `inset(${fillInset}% 0 0 0)` }
            }
          />
        </g>
      </svg>
    </div>
  );
}