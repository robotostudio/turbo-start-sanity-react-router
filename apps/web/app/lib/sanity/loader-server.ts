// biome-ignore lint/performance/noNamespaceImport: Allow the namespace import
import * as queryStore from "@sanity/react-loader";
import { studioUrl } from "~/env";
import { client } from "./client";

const clientWithToken = client.withConfig({
  // Token required for when perspective: 'previewDrafts'
  token: process.env.SANITY_API_READ_TOKEN,
  // Minimum required stega config
  stega: { studioUrl },
});

queryStore.setServerClient(clientWithToken);

export const { loadQuery } = queryStore;
