import { getClient, isPreviewBranch } from "@/src/lib/client";
import Head from "next/head";
import Header from "@/src/components/Header";
import { Suspense } from "react";
import { Skeleton } from "@/src/components/Skeleton";
import { City } from "@/src/generated/sdk";
import CityLeadCard from "@/src/components/CityLeadCard";
import CityCard from "@/src/components/CityCard";

export default async function Page({ params }: any) {
  const items = await getData();
  return (
    <>
      <Head>
        <title>The City Guide</title>
        <meta
          name="description"
          content="next.js based website that consumes that displays information about different cities"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense>
        <Header height={60} />
      </Suspense>
      <div className="container px-4 md:px-0 max-w-6xl mx-auto -mt-32">
        <div className="mx-0 sm:mx-6">
          <Suspense fallback={<Skeleton />}>
            {items &&
              items
                .filter((item, index) => index === 0)
                .map((content) => {
                  return (
                    <CityLeadCard
                      key={content?.ContentLink?.GuidValue}
                      blogItem={content || {}}
                    />
                  );
                })}
          </Suspense>
          <div className="flex flex-wrap justify-between pt-12 -mx-6">
            <Suspense
              fallback={
                <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
              }
            >
              {items &&
                items
                  .filter((item, index) => index !== 0)
                  .map((content) => {
                    // @ts-ignore
                    return (
                      <CityCard
                        key={content?.ContentLink?.GuidValue}
                        blogItem={content || {}}
                      />
                    );
                  })}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getData() {
  const data = await getClient(["cities"]).CityList();
  if (!isPreviewBranch()) return data.City?.items;
  let filteredItems: City[] = [];
  if (data?.City?.items != null) {
    data.City.items.map((content) => {
      if (content == null) return;
      let existingItem = filteredItems.filter(
        (item, index) =>
          item?.ContentLink?.GuidValue == content?.ContentLink?.GuidValue
      );
      if (existingItem.length == 0) filteredItems.push(content);
      else if (existingItem[0].Saved < content.Saved) existingItem[0] = content;
    });
  }
  return filteredItems;
}
