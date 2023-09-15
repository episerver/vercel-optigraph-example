// @ts-nocheck
import Header from "@/src/components/Header";
import Head from "next/head";
import { getData } from "@/src/app/page";
import { encodeEditInfo } from "@/src/lib/visualEditing";
import { getClient, isPreviewBranch } from "@/src/lib/client";
import { LocationItemPage } from "@/src/generated/sdk";
import {
  getCmsUrlForContentId,
  getImageFromCityBlock,
} from "@/src/lib/helpers";
import { Suspense } from "react";

export default async function Post({ params: { slug } }) {
  const guid = slug[0] || "0";
  const data = await getClient(["city"]).City({ guid: guid });
  const item = data?.City?.items[0];
  const id = item?.ContentLink?.Id || 0;
  if (id === 0) {
    console.log(`something went wrong when fetching item with guid: ${guid}`);
  }
  const image = getImageFromCityBlock(item);
  const cmsUrl = process.env.CMS_URL || "";
  if (cmsUrl !== "") {
    const finalUrl = getCmsUrlForContentId(cmsUrl, id);
    item.Name = encodeEditInfo(item?.Name || "", cmsUrl, finalUrl);
  } else {
    console.log(
      "CMS_URL has not been configured, please configure it under environment variables or your .env file"
    );
  }
  return (
    <>
      {item && (
        <>
          <Head>
            <title>The City Guide</title>
            <meta name="description" content={`${item.Name} City Guide`} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Suspense>
            <Header height={15} />
          </Suspense>
          <div className="text-center pt-16 md:pt-32">
            {item.Name && (
              <h1 className="font-bold break-normal text-3xl md:text-5xl">
                {item.Name}
              </h1>
            )}
          </div>
          <div
            className="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded"
            style={{ backgroundImage: `url(${image})`, height: "30vh" }}
          ></div>
          <div className="container max-w-5xl mx-auto -mt-32">
            <div className="mx-0 sm:mx-6">
              <div
                className="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal"
                style={{ fontFamily: "Georgia,serif" }}
              >
                {item.IntroText && (
                  <p className="text-2xl md:text-3xl mb-5">{item.IntroText}</p>
                )}
                {item.MainBody && (
                  <div
                    className="py-6"
                    dangerouslySetInnerHTML={{ __html: item.MainBody }}
                  ></div>
                )}
              </div>
            </div>
          </div>
          )
        </>
      )}
    </>
  );
}

export async function generateStaticParams() {
  let items = await getData();
  if (isPreviewBranch()) {
    let filteredItems: LocationItemPage[] = [];
    if (items != null) {
      items.map((content) => {
        if (content == null) return;
        let existingItem = filteredItems.filter(
          (item, index) =>
            item?.ContentLink?.GuidValue == content?.ContentLink?.GuidValue
        );
        if (existingItem.length == 0) filteredItems.push(content);
        else if (existingItem[0].Saved < content.Saved)
          existingItem[0] = content;
      });
    }
    items = filteredItems;
  }
  let paths = [];
  items.map((post) =>
    paths.push({
      slug: [post?.ContentLink?.GuidValue],
    })
  );
  return paths;
}
