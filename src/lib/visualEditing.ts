import {vercelStegaCombine} from "@vercel/stega";

export function encodeEditInfo(text: string, origin: string, href: string): string {
    return vercelStegaCombine(text, {
        origin,
        href,
    });
}
