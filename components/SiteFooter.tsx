"use client";

import { useTheme } from "./ThemeProvider";
import { XIcon } from "./BrandIcons";
import { shareToTwitter } from "@/lib/social-share";
import Link from "next/link";
import { useRef, useState } from "react";

interface SiteFooterProps {
  shareTweetText: string;
  shareCardRef: React.RefObject<HTMLDivElement | null>;
}

export function SiteFooter({ shareTweetText, shareCardRef }: SiteFooterProps) {
  const { isDark } = useTheme();
  const [linkCopied, setLinkCopied] = useState(false);
  const [includeImage, setIncludeImage] = useState(true);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showStatus(message: string) {
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    setShareStatus(message);
    statusTimerRef.current = setTimeout(() => setShareStatus(null), 5000);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  async function shareTwitter() {
    setSharing(true);
    try {
      const status = await shareToTwitter({
        text: shareTweetText,
        url: window.location.href,
        includeImage,
        shareCardRef,
        isDark,
      });
      showStatus(status);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.error("Share failed:", err);
      showStatus("Share failed — try exporting the image manually");
    } finally {
      setSharing(false);
    }
  }

  return (
    <footer className="max-w-5xl mx-auto px-4 py-10 text-center">
      <h3 className="font-semibold mb-4">Share your result</h3>

      <label className="inline-flex items-center gap-2 mb-4 cursor-pointer text-sm text-neutral">
        <input
          type="checkbox"
          checked={includeImage}
          onChange={(e) => setIncludeImage(e.target.checked)}
          className="w-4 h-4 rounded border-border accent-primary"
        />
        Include result image when sharing
      </label>

      <div className="flex flex-wrap justify-center gap-3 mb-3">
        <button
          type="button"
          onClick={shareTwitter}
          disabled={sharing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors min-h-[44px] disabled:opacity-50"
        >
          <XIcon className="w-4 h-4" />
          {sharing ? "Preparing..." : "Share on X"}
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border font-medium hover:bg-primary/5 transition-colors min-h-[44px]"
        >
          {linkCopied ? "Link copied!" : "Copy link"}
        </button>
      </div>

      {shareStatus && (
        <p className="text-sm text-primary mb-4 max-w-md mx-auto">{shareStatus}</p>
      )}

      <Link
        href="/data"
        className="text-primary hover:underline font-medium"
      >
        View full data table &amp; sources →
      </Link>

      <p className="text-sm text-neutral mt-6 max-w-xl mx-auto leading-relaxed">
        All figures are educational estimates from peer-reviewed and institutional
        sources (see methodology). Water is not destroyed — it cycles. Estimates
        vary by data center location, grid mix, and efficiency.
      </p>
    </footer>
  );
}