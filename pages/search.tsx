import {useRouter} from "next/router";
import Header from "@/components/react/Header";
import {useEffect, useState} from "react";
import {useSearchBlogsQuery} from "@/generated";
import {func} from "prop-types";
import BlogPostSummary from "@/components/cms/blocks/BlogPostSummary";

export default function Search(){
    const router = useRouter();
    const query = router.query.query !== undefined ? router.query.query : '';
    console.log(query);
    const data = useSearchBlogsQuery({query: query}).data;
    return (
        <>
            <Header height={60} />
            <div className="flex flex-col w-full items-center">
                <div className="text-4xl">Searching for <span className="text-2xl">{query}</span></div>
            </div>

            <div className="flex">
                {data?.LocationItemPage?.items?.map((content) => {
                    return (<BlogPostSummary key={content.Name} blogItem={content} />);
                })}
            </div>
        </>
    );
}
