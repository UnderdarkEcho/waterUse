import { getShareCardTheme } from "./share-card-theme";
import { toPng } from "html-to-image";

export async function captureShareCard(
  node: HTMLElement,
  isDark: boolean
): Promise<Blob> {
  const theme = getShareCardTheme(isDark);

  await document.fonts.ready;
  const previousOpacity = node.style.opacity;
  const previousZIndex = node.style.zIndex;
  node.style.opacity = "1";
  node.style.zIndex = "9999";

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

  try {
    const dataUrl = await toPng(node, {
      pixelRatio: 2,
      backgroundColor: theme.background,
      cacheBust: true,
      skipFonts: true,
      width: 600,
      height: node.offsetHeight,
    });

    const response = await fetch(dataUrl);
    return await response.blob();
  } finally {
    node.style.opacity = previousOpacity;
    node.style.zIndex = previousZIndex;
  }
}

export function downloadShareImage(blob: Blob, filename = "water-footprint.png") {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}