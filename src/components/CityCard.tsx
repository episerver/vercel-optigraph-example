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
  width?: String;
}

export default function CityCard({ blogItem, width = "1/3" }: Content) {
  const image = getImageFromCityBlock(blogItem, 336);
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
    <>
      <div
        className={`w-full md:w-${width} p-6 flex flex-col flex-grow flex-shrink`}
      >
        <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
          <Link
            href={`/cities/${blogItem?.ContentLink?.GuidValue}`}
            className="flex flex-wrap no-underline hover:no-underline"
          >
            {image !== "" && (
              <Image
                src={image}
                className="h-64 w-full rounded-t pb-6"
                width={336}
                height={256}
                loading={"lazy"}
                alt={blogItem?.Name || "city"}
              />
            )}
            {blogItem?.Name && (
              <div className="w-full font-bold text-2xl text-gray-900 px-6">
                {blogItem?.Name}
              </div>
            )}
            {blogItem?.IntroText && (
              <p className="text-gray-700 font-serif text-lg px-6 mb-5">
                {blogItem?.IntroText}
              </p>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
