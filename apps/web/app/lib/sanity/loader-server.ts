// biome-ignore lint/performance/noNamespaceImport: Allow the namespace import
import * as queryStore from "@sanity/react-loader";
import { env } from "~/env/client";
import { serverEnv } from "~/env/server";
// import { studioUrl } from "~/env";
import { client } from "./client";

const clientWithToken = client.withConfig({
  // Token required for when perspective: 'previewDrafts'
  token: serverEnv.SANITY_API_READ_TOKEN,
  // Minimum required stega config
  stega: { studioUrl: env.VITE_SANITY_STUDIO_URL },
});

queryStore.setServerClient(clientWithToken);

export const { loadQuery } = queryStore;
