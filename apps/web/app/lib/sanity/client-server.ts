import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "~/env";

export const viewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});
