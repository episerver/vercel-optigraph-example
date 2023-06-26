// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {DateTime} from 'luxon'
import {client} from "@/src/client";

type ResponseData = {
    status: string
}

const webhookUrl: string = process.env.REDEPLOY_HOOK || '';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const endTime = DateTime.utc().set({seconds: 0, milliSeconds: 0});
    const startTime = endTime.minus({minute: 1});
    let callingWebhook = false;
    const response =
        await client
            .ModifiedContentForWebhookCall({
                startTime: startTime,
                endTime: endTime
            });
    if (response?.Content?.total || -1 > 0) {
        callingWebhook = true;
        if(webhookUrl !== ''){
            await fetch(webhookUrl);
        }
    }
    res.status(200)
        .json({status: `OK - startDate:${startTime.toString()} - endDate:${endTime.toString()} - callingWebhook: ${callingWebhook}`});
}
