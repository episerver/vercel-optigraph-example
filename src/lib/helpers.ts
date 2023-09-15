import { City } from "@/src/generated/sdk";
import queryString from "query-string";

export function getImageFromCityBlock(
  blogItem: City,
  width?: number,
  height?: number
) {
  let image = blogItem?.ImageUrl;
  if (image && (width !== undefined || height !== undefined)) {
    let url = queryString.parseUrl(image);
    if (width !== undefined) {
      url.query.width = width.toString();
    }
    if (height !== undefined) {
      url.query.height = height.toString();
    }
    image = queryString.stringifyUrl(url);
  }
  return image == null
    ? `https://source.unsplash.com/random?city,landscape,${
        blogItem?.Name?.replace(" ", "") || ""
      }`
    : image;
}

export function getCmsUrlForContentId(cmsUrl: string, contentId: number) {
  return `${cmsUrl}/EPiServer/CMS/?language=en#context=epi.cms.contentdata:///${contentId}&viewsetting=viewlanguage:///en`;
}
