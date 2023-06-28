// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {draftMode} from "next/headers";
import {redirect} from "next/navigation";

export async function GET(request: Request) {
  draftMode().enable();
  redirect("/");
}
