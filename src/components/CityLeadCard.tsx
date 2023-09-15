import Link from "next/link";
import Image from "next/image";
import { City } from "@/src/generated/sdk";
import { encodeEditInfo } from "@/src/lib/visualEditing";
import {
  getCmsUrlForContentId,
  getImageFromCityBlock,
} from "@/src/lib/helpers";

interface Content {
  blogItem: City;
}

export default function CityLeadCard({ blogItem }: Content) {
  const image = getImageFromCityBlock(blogItem, 640);
  const cmsUrl = process.env.CMS_URL || "";
  if (cmsUrl !== "") {
    const finalUrl = getCmsUrlForContentId(
      cmsUrl,
      blogItem?.ContentLink?.Id || 0
    );
    blogItem.Name = encodeEditInfo(
      blogItem?.Name || "",
      "optimizely.com",
      finalUrl
    );
  } else {
    console.log(
      "CMS_URL has not been configured, please configure it under environment variables or your .env file"
    );
  }
  return (
    <div className="flex h-full bg-white rounded overflow-hidden shadow-lg">
      <Link
        href={`/cities/${blogItem?.ContentLink?.GuidValue}`}
        className="flex flex-wrap no-underline hover:no-underline"
      >
        <div className="w-full md:w-2/3 rounded-t">
          <Image
            src={image}
            loading={"lazy"}
            width={640}
            height={480}
            alt={blogItem?.Name || "city"}
            className="h-full w-full shadow"
          />
        </div>
        <div className="w-full md:w-1/3 flex flex-col flex-grow flex-shrink">
          <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
            {blogItem?.Name && (
              <div className="w-full font-bold text-3xl text-gray-900 px-6 pt-8">
                {blogItem?.Name}
              </div>
            )}
            {blogItem?.IntroText && (
              <p className="text-gray-700 font-serif text-lg px-6 mb-5">
                {blogItem?.IntroText}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
