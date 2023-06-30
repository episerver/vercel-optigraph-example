import {getClient} from "@/src/client";
import Head from "next/head";
import Header from "@/src/components/Header";
import BlogPostSummaryLead from "@/src/components/BlogPostSummaryLead";
import BlogPostSummary from "@/src/components/BlogPostSummary";
import {Suspense} from "react";

export default async function Page({ params }: any)  {
    const data = await getData();
    const items = data?.LocationItemPage?.items || [];
    let firstItem = items == null ? null : items[0];
    return (
        <>
            <Head>
                <title>The City Guide</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header height={60}/>
            <div className="container px-4 md:px-0 max-w-6xl mx-auto -mt-32">
                <div className="mx-0 sm:mx-6">
                    <Suspense fallback={<p>Loading...</p>}>
                        {data?.LocationItemPage?.items &&
                            data.LocationItemPage?.items
                                .filter((item,index) => index == 0)
                                .map((content) => {
                                    return (
                                        <BlogPostSummaryLead key={content?.RelativePath} blogItem={content || {}} />
                                    );
                                })}
                    </Suspense>
                    <Suspense fallback={<p>Loading...</p>}>
                        <div className="flex flex-wrap justify-between pt-12 -mx-6">
                            {data?.LocationItemPage?.items &&
                                data.LocationItemPage?.items
                                    .filter((item,index) => index != 0)
                                    .map((content) => {
                                        // @ts-ignore
                                        return (
                                            // <BlogPostSummary key={content?.RelativePath} blogItem={content} width={`${chance().pickone(['1/3','2/3','2/3','1/3'])}`} />
                                            <BlogPostSummary key={content?.RelativePath} blogItem={content || {}} />
                                        );
                                    })}
                        </div>
                    </Suspense>
                </div>
            </div>
        </>
    );
}
export async function getData(){
  return await getClient().BlogList();
}
