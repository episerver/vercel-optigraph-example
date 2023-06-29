import {GraphQLClient, RequestMiddleware} from 'graphql-request';
import {getSdk} from "@/src/generated/sdk";
import Base64 from "crypto-js/enc-base64";
import md5 from "crypto-js/md5";
import hmacSHA256 from "crypto-js/hmac-sha256";


const endpoint = `https://cg.optimizely.com/content/v2`
const endpointWithSingleKey = `${endpoint}?auth=${process.env.NEXT_PUBLIC_CG_SINGLE_KEY}`

// Standard Requests

const graphQlClient = new GraphQLClient(endpointWithSingleKey, {
    next: {revalidate: 3600}
});


// Preview Requests
function getAuthenticationHeader(url, method, body, appKey, secretKey) {
    const secret = Base64.parse(secretKey);
    const urlTemp = new URL(url);
    const target = urlTemp.pathname + urlTemp.search;
    const timestamp = new Date().getTime();
    const nonce = Math.random().toString(36).substring(7);
    const body_b64 = Base64.stringify(md5(body ||""));
    const message = appKey + method + target + timestamp + nonce + body_b64;
    const hmac = hmacSHA256(message, secret);
    const base64hmac = Base64.stringify(hmac);
    return `epi-hmac ${appKey}:${timestamp}:${nonce}:${base64hmac}`;
}

const requestMiddleware: RequestMiddleware = async (request) => {
    const token = getAuthenticationHeader(endpoint,
        request.method,
        request.body,
        process.env.CG_APP_KEY,
        process.env.CG_SECRET);
    return {
        ...request,
        headers: { ...request.headers, 'Authorization': token },
    }
}

const previewGraphQlClient = new GraphQLClient(endpoint, {
    next: {revalidate: 60},
    requestMiddleware: requestMiddleware
});

const client = getSdk(graphQlClient);
const previewClient = getSdk(previewGraphQlClient);

export function getClient(){
    //return process.env.VERCEL_ENV !== 'preview' ? client : previewClient;
    //return previewClient;
    return client;
}
