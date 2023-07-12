import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestJson = await request.json();
  if (
    searchParams?.get("cg_webhook_secret") !== process.env.CG_WEBHOOK_SECRET
  ) {
    return new Response(`Invalid credentials`, {
      status: 500,
    });
  }
  const guid = (requestJson?.data?.journalId || "").split("_")[0];
  if (guid !== "") {
    console.log(`flushing cache for: ${guid}`);
    revalidatePath(`/posts/${guid}`);
  }
  revalidatePath("/");
  return new Response(`OK`, {
    status: 200,
  });
}
