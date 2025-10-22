// Based on how Remix recommends handling environment variables
// https://remix.run/docs/en/main/guides/envvars

// None of these are secrets, but all of them are required
// Throughout the app server and client side
declare global {
  // biome-ignore lint/nursery/useConsistentTypeDefinitions: Global window interface
  interface Window {
    ENV: {
      VITE_SANITY_PROJECT_ID: string;
      VITE_SANITY_DATASET: string;
      VITE_SANITY_API_VERSION: string;
      VITE_SANITY_STUDIO_URL: string;
    };
  }
}

let projectId: string;
let dataset: string;
let apiVersion: string;
let studioUrl: string;
const defaultApiVersion = "2024-02-13";

if (typeof document === "undefined") {
  if (typeof process !== "undefined") {
    projectId = process.env.VITE_SANITY_PROJECT_ID ?? "";
    dataset = process.env.VITE_SANITY_DATASET ?? "";
    apiVersion = process.env.VITE_SANITY_API_VERSION ?? defaultApiVersion;
    studioUrl = process.env.VITE_SANITY_STUDIO_URL ?? "";
  } else {
    projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
    dataset = import.meta.env.VITE_SANITY_DATASET;
    apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? defaultApiVersion;
    studioUrl = import.meta.env.VITE_SANITY_STUDIO_URL ?? "";
  }
} else {
  projectId = window.ENV.VITE_SANITY_PROJECT_ID;
  dataset = window.ENV.VITE_SANITY_DATASET;
  apiVersion = window.ENV.VITE_SANITY_API_VERSION ?? defaultApiVersion;
  studioUrl = window.ENV.VITE_SANITY_STUDIO_URL ?? "";
}

export { apiVersion, dataset, projectId, studioUrl };

export const projectDetails = () => ({
  projectId,
  dataset,
  apiVersion,
});

// If any of these values are missing, throw errors as the app requires them
if (!projectId) {
  throw new Error(
    "Missing VITE_SANITY_PROJECT_ID in .env, run npx sanity@latest init --env"
  );
}
if (!dataset) {
  throw new Error(
    "Missing VITE_SANITY_DATASET in .env, run npx sanity@latest init --env"
  );
}
if (!apiVersion) {
  throw new Error(
    "Missing VITE_SANITY_API_VERSION in .env, run npx sanity@latest init --env"
  );
}
