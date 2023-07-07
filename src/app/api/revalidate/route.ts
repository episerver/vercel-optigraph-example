import {revalidatePath, revalidateTag} from 'next/cache';

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    console.log(await request.json());
    revalidateTag("cities");
    return new Response(
        null,
        {
            status: 200,
        },
    );
}
