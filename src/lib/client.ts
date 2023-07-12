import { GraphQLClient, RequestMiddleware } from "graphql-request";
import { getSdk } from "@/src/generated/sdk";
import { getAuthenticationHeader } from "@/src/lib/contentGraph";

const endpoint =
  process.env.CG_ENDPOINT ?? "https://cg.optimizely.com/content/v2";
const endpointWithSingleKey = `${endpoint}?auth=${process.env.CG_SINGLE_KEY}`;

// Standard Requests

const graphQlClient = new GraphQLClient(endpointWithSingleKey);

// Preview Requests
const requestMiddleware: RequestMiddleware = async (request) => {
  const token = getAuthenticationHeader(
    endpoint,
    request.method,
    request.body,
    process.env.CG_APP_KEY,
    process.env.CG_SECRET
  );
  return {
    ...request,
    headers: { ...request.headers, Authorization: token },
  };
};

const previewGraphQlClient = new GraphQLClient(endpoint, {
  requestMiddleware: requestMiddleware,
});

export function getClient(tags: string[] = []) {
  if (tags?.length > 0) {
    tags.map((tag) => {
      graphQlClient.requestConfig.next?.tags?.push(tag);
      previewGraphQlClient.requestConfig.next?.tags?.push(tag);
    });
  }
  const client = getSdk(graphQlClient);
  const previewClient = getSdk(previewGraphQlClient);
  return !isPreviewBranch() ? client : previewClient;
}

export function isPreviewBranch() {
  return process.env.VERCEL_ENV === "preview";
}
