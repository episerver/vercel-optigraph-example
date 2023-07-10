import Link from "next/link";
import Image from "next/image";
import {LocationItemPage} from "@/src/generated/sdk";
import {encodeEditInfo} from "@/src/lib/visualEditing";
import {isPreviewBranch} from "@/src/lib/client";
interface Content {
    blogItem: LocationItemPage,
}
export default function BlogPostSummaryLead({blogItem} : Content){
    let image  = blogItem?.PageImage?.Url == null ? blogItem.Image?.Url : blogItem.PageImage.Url;
    image = image == null ? `https://source.unsplash.com/random?city,landscape,${blogItem?.Name?.replace(' ','') || ""}` : image;
    const cmsUrl = process.env.CMS_URL || "";
    if(cmsUrl !== "" && isPreviewBranch()){
        const finalUrl=  `${cmsUrl}/EPiServer/CMS/?language=en#context=epi.cms.contentdata:///${blogItem?.ContentLink?.Id}&viewsetting=viewlanguage:///en`
        blogItem.Name = encodeEditInfo(blogItem?.Name || '', "optimizely.com" ,finalUrl);
    }
    return(
            <div className="flex h-full bg-white rounded overflow-hidden shadow-lg">
                <Link href={`/posts/${blogItem?.ContentLink?.GuidValue}`} className="flex flex-wrap no-underline hover:no-underline">
                    <div className="w-full md:w-2/3 rounded-t">
                        <Image src={image} loading={"lazy"} width={640} height={480} alt={blogItem?.Name || "city"}
                             className="h-full w-full shadow" />
                    </div>

                    <div className="w-full md:w-1/3 flex flex-col flex-grow flex-shrink">
                        <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                            <div className="w-full font-bold text-3xl text-gray-900 px-6 pt-8">{blogItem?.Name}
                            </div>
                            <p className="text-gray-700 font-serif text-lg px-6 mb-5">
                                {blogItem?.MainIntro}
                            </p>
                        </div>

                        {/*<div*/}
                        {/*    className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">*/}
                        {/*    <div className="flex items-center justify-between">*/}
                        {/*        <img className="w-8 h-8 rounded-full mr-4 avatar" data-tippy-content="Author Name"*/}
                        {/*             src="http://i.pravatar.cc/300" alt="Avatar of Author" tabIndex="0" />*/}
                        {/*            <p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                </Link>
            </div>
    );
}
