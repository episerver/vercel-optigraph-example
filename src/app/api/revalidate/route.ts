import {revalidatePath, revalidateTag} from 'next/cache';

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const cfWorker = request.headers.get("cf-worker");
    console.log(await request.json());
    console.log();
    if(cfWorker !== null && cfWorker !== '' && cfWorker === 'cg.optimizely.com'){
        // verify that the cache invalidation is coming from cg.optimizely.com
        revalidateTag("cities");
        revalidateTag("city");
        revalidatePath("/");
    }
    return new Response(
        null,
        {
            status: 200,
        },
    );
}
