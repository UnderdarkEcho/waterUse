import { captureShareCard, downloadShareImage } from "./export-image";

export function openTwitterShare(text: string, url: string) {
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

export async function shareToTwitter({
  text,
  url,
  includeImage,
  shareCardRef,
  isDark,
}: {
  text: string;
  url: string;
  includeImage: boolean;
  shareCardRef: React.RefObject<HTMLDivElement | null>;
  isDark: boolean;
}): Promise<string> {
  if (includeImage && shareCardRef.current) {
    const blob = await captureShareCard(shareCardRef.current, isDark);
    const file = new File([blob], "water-footprint.png", { type: "image/png" });
    const shareData: ShareData = { text, url, files: [file] };

    if (navigator.canShare?.(shareData)) {
      await navigator.share(shareData);
      return "Shared with image!";
    }

    downloadShareImage(blob);
    openTwitterShare(text, url);
    return "Image downloaded — attach it to your post on X";
  }

  openTwitterShare(text, url);
  return "Opened X compose window";
}