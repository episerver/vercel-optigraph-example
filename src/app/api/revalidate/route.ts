import {revalidatePath, revalidateTag} from 'next/cache';

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const cfWorker = request.headers.get("cf-worker");
    const requestJson = await request.json();
    console.log(requestJson);
    if(cfWorker !== null && cfWorker !== '' && cfWorker === 'cg.optimizely.com'){
        // verify that the cache invalidation is coming from cg.optimizely.com
        // revalidateTag("cities");
        // revalidateTag("city");
        const guid = (requestJson?.data?.journalId || "").split("_")[0];
        if(guid !== ''){
            console.log(`flushing cache for: ${guid}`);
            revalidatePath(`/posts/${guid}`);
        }
        revalidatePath("/");
    }
    return new Response(
        null,
        {
            status: 200,
        },
    );
}
