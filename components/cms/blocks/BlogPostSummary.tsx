import {LocationItemPage} from "@/generated";
import Link from "next/link";
interface Content {
    blogItem: LocationItemPage
    width?: String
}
export default function BlogPostSummary({blogItem, width = "1/3"} : Content){
    let image  = blogItem.PageImage.Url == null ? blogItem.Image?.Url : blogItem.PageImage?.Url;
    image = image == null ? `https://source.unsplash.com/random?city,landscape,${blogItem.Name}` : image;
    return(
        <>
            <div className={`w-full md:w-${width} p-6 flex flex-col flex-grow flex-shrink`}>
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                    <Link href={blogItem.RelativePath} className="flex flex-wrap no-underline hover:no-underline">
                        <img src={image}
                             className="h-64 w-full rounded-t pb-6" />
                            {/*<p className="w-full text-gray-600 text-xs md:text-sm px-6">GETTING STARTED</p>*/}
                            <div className="w-full font-bold text-xl text-gray-900 px-6">{blogItem.Name}
                            </div>
                            <p className="text-gray-800 font-serif text-base px-6 mb-5">
                                {blogItem.MainIntro}
                            </p>
                    </Link>
                </div>
                {/*<div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">*/}
                {/*    <div className="flex items-center justify-between">*/}
                {/*        <img className="w-8 h-8 rounded-full mr-4 avatar" data-tippy-content="Author Name"*/}
                {/*             src="http://i.pravatar.cc/300" alt="Avatar of Author" tabIndex="0" />*/}
                {/*            <p className="text-gray-600 text-xs md:text-sm">1 MIN READ</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </>
    );
}
