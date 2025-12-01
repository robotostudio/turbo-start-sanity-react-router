import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  client: {
    VITE_SANITY_API_VERSION: z.string().min(1),
    VITE_SANITY_DATASET: z.string().min(1),
    VITE_SANITY_PROJECT_ID: z.string().min(1),
    VITE_SANITY_STUDIO_URL: z.url().min(1),
    VITE_SITE_TITLE: z.string().min(1),
    VITE_SITE_URL: z.url().min(1),
  },

  shared: {
    MODE: z.enum(["development", "production"]).default("development"),
    PROD: z.boolean(),
    DEV: z.boolean(),
    BASE_URL: z.string(),
    SSR: z.boolean(),
  },

  runtimeEnv: import.meta.env,
  clientPrefix: "VITE_",
  emptyStringAsUndefined: true,
});
