declare global {
  // biome-ignore lint/nursery/useConsistentTypeDefinitions: Global window interface
  interface Window {
    ENV: {
      VITE_SANITY_PROJECT_ID: string;
      VITE_SANITY_DATASET: string;
      VITE_SANITY_API_VERSION: string;
      VITE_SANITY_STUDIO_URL: string;
      VITE_SITE_URL: string;
      VITE_SITE_TITLE: string;
    };
  }
}

let projectId: string;
let dataset: string;
let apiVersion: string;
let studioUrl: string;
let siteUrl: string;
let siteTitle: string;
const defaultApiVersion = "2024-02-13";

if (typeof document === "undefined") {
  if (typeof process !== "undefined") {
    projectId = process.env.VITE_SANITY_PROJECT_ID ?? "";
    dataset = process.env.VITE_SANITY_DATASET ?? "";
    apiVersion = process.env.VITE_SANITY_API_VERSION ?? defaultApiVersion;
    studioUrl = process.env.VITE_SANITY_STUDIO_URL ?? "";
    siteUrl = process.env.VITE_SITE_URL ?? "";
    siteTitle = process.env.VITE_SITE_TITLE ?? "";
  } else {
    projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
    dataset = import.meta.env.VITE_SANITY_DATASET;
    apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? defaultApiVersion;
    studioUrl = import.meta.env.VITE_SANITY_STUDIO_URL ?? "";
    siteUrl = import.meta.env.VITE_SITE_URL ?? "";
    siteTitle = import.meta.env.VITE_SITE_TITLE ?? "";
  }
} else {
  projectId = window.ENV.VITE_SANITY_PROJECT_ID;
  dataset = window.ENV.VITE_SANITY_DATASET;
  apiVersion = window.ENV.VITE_SANITY_API_VERSION ?? defaultApiVersion;
  studioUrl = window.ENV.VITE_SANITY_STUDIO_URL ?? "";
  siteUrl = window.ENV.VITE_SITE_URL ?? "";
  siteTitle = window.ENV.VITE_SITE_TITLE ?? "";
}

export { apiVersion, dataset, projectId, studioUrl, siteUrl, siteTitle };