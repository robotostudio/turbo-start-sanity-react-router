// DON'T USE ABSOLUTE PATHS & CUSTOM ENV'S
import { createClient } from "@sanity/client";
import { queryAllPagesDataForPrerender } from "./app/lib/sanity/queries";

export async function prerenderPages() {
  const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
    apiVersion: process.env.VITE_SANITY_API_VERSION,
    useCdn: process.env.NODE_ENV === "production",
  });
  const allPagesData = await client.fetch(queryAllPagesDataForPrerender);
  return allPagesData.map((page) => page.slug).filter(Boolean) as string[];
}
