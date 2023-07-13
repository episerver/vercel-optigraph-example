import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  if (
    searchParams?.get("cg_webhook_secret") !== process.env.CG_WEBHOOK_SECRET
  ) {
    return new Response(`Invalid credentials`, {
      status: 401,
    });
  }
  const requestJson = await request.json();
  const guid = (requestJson?.data?.journalId || "").split("_")[0];
  if (guid !== "") {
    console.log(`flushing cache for: ${guid}`);
    revalidatePath(`/posts/${guid}`);
  }
  // note since the homepage displays a gist of post detail pages, we need to invalidate it always
  revalidatePath("/");
  return new Response(`OK`, {
    status: 200,
  });
}
