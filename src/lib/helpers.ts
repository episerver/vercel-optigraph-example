import { LocationItemPage } from "@/src/generated/sdk";

export function getImageFromLocationItemPage(blogItem: LocationItemPage) {
  let image =
    blogItem?.PageImage?.Url == null
      ? blogItem.Image?.Url
      : blogItem.PageImage.Url;
  return image == null
    ? `https://source.unsplash.com/random?city,landscape,${
        blogItem?.Name?.replace(" ", "") || ""
      }`
    : image;
}

export function getCmsUrlForContentId(cmsUrl: string, contentId: number) {
  return `${cmsUrl}/EPiServer/CMS/?language=en#context=epi.cms.contentdata:///${contentId}&viewsetting=viewlanguage:///en`;
}
