import { GraphQLClient } from 'graphql-request';
import {getSdk} from "@/src/generated/sdk";


const endpoint = `https://cg.optimizely.com/content/v2?auth=${process.env.NEXT_PUBLIC_CG_SINGLE_KEY}`
const graphQlClient = new GraphQLClient(endpoint, {
    headers: {
    },
});

const previewGraphQlClient = new GraphQLClient(endpoint, {
    headers: {
    },
});

export const client = getSdk(graphQlClient);
export const previewClient = getSdk(previewGraphQlClient);
