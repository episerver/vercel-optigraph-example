import { vercelStegaCombine } from "@vercel/stega";
import { isPreviewBranch } from "@/src/lib/client";

export function encodeEditInfo(
  text: string,
  origin: string,
  href: string
): string {
  if (isPreviewBranch()) {
    return vercelStegaCombine(text, {
      origin,
      href,
    });
  }
  return text;
}
