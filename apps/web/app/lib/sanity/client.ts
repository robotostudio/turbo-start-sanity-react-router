import { createClient } from "@sanity/client";
import { env } from "~/env/client";

export const client = createClient({
  projectId: env.VITE_SANITY_PROJECT_ID,
  dataset: env.VITE_SANITY_DATASET,
  apiVersion: env.VITE_SANITY_API_VERSION,
  useCdn: true,
  perspective: "published",
});
