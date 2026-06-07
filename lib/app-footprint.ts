/** Measured from project source: app/, components/, lib/ */
export const APP_BUILD_STATS = {
  measuredAt: "2026-06-06",
  sourceFiles: 23,
  sourceLines: 2283,
  sourceChars: 77913,
} as const;

/**
 * Token & water estimate for building this app with AI assistance.
 * Methodology documented in getAppBuildFootprint().
 */
export function getAppBuildFootprint(includeIndirect = true) {
  const codeTokens = Math.round(
    APP_BUILD_STATS.sourceChars / CODE_CHARS_PER_TOKEN
  );
  const conversationTokens = Math.round(codeTokens * AI_DEV_MULTIPLIER);
  const totalWh = conversationTokens * WH_PER_TOKEN;

  const directMl = totalWh * DIRECT_ML_PER_WH;
  const indirectMl = includeIndirect ? totalWh * INDIRECT_ML_PER_WH : 0;

  return {
    ...APP_BUILD_STATS,
    codeTokens,
    conversationTokens,
    aiDevMultiplier: AI_DEV_MULTIPLIER,
    whPerToken: WH_PER_TOKEN,
    tokensPerQuery: TOKENS_PER_QUERY,
    totalWh: Math.round(totalWh * 10) / 10,
    totalMl: Math.round((directMl + indirectMl) * 10) / 10,
    directMl: Math.round(directMl * 10) / 10,
    indirectMl: Math.round(indirectMl * 10) / 10,
    equivalentQueries: Math.round(conversationTokens / TOKENS_PER_QUERY),
    rangeMl: [
      Math.round(conversationTokens * WH_PER_TOKEN_LOW * ML_PER_WH_LOW),
      Math.round(conversationTokens * WH_PER_TOKEN_HIGH * ML_PER_WH_HIGH),
    ] as [number, number],
  };
}

/** Code mixes symbols & whitespace; ~3.5 chars/token is typical for TypeScript */
const CODE_CHARS_PER_TOKEN = 3.5;

/** Planning, prompts, retries, reviews ≈ 10× final code volume in AI chat */
const AI_DEV_MULTIPLIER = 10;

/** ~440 tokens per medium coding exchange → 1.75 Wh (GPT-4o class, The Conversation) */
const TOKENS_PER_QUERY = 440;
const WH_PER_TOKEN = 1.75 / TOKENS_PER_QUERY;
const DIRECT_ML_PER_WH = 0.8;
const INDIRECT_ML_PER_WH = 1.2;

const WH_PER_TOKEN_LOW = 1.3 / 600;
const WH_PER_TOKEN_HIGH = 2.0 / 300;
const ML_PER_WH_LOW = 1.3;
const ML_PER_WH_HIGH = 2.0;