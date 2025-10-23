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