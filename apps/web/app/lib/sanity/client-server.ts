import { createClient } from "@sanity/client";
import { env } from "~/env/client";
import { serverEnv } from "~/env/server";

export const viewClient = createClient({
  projectId: env.VITE_SANITY_PROJECT_ID,
  dataset: env.VITE_SANITY_DATASET,
  apiVersion: env.VITE_SANITY_API_VERSION,
  useCdn: false,
  token: serverEnv.SANITY_API_READ_TOKEN,
});
