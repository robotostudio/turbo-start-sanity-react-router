import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;

/**
 * Returns the correct studio host based on environment variables.
 * - If HOST_NAME is set and not "main", returns `${HOST_NAME}-${PRODUCTION_HOSTNAME}`
 * - If HOST_NAME is "main" or not set, returns PRODUCTION_HOSTNAME
 */
const productionHostName = "react-router";


function getStudioHost(): string | undefined {
  const host = process.env.HOST_NAME;

  if (host && host !== "main") {
    return `${host}-${productionHostName}`;
  }

  return productionHostName;
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: getStudioHost(),
  deployment: {
    appId: "etxnq9p8wodkx2eqr2x06026",
    autoUpdates: false,
  },
});
