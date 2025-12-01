import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    SANITY_API_READ_TOKEN: z.string().min(1),
    SANITY_API_WRITE_TOKEN: z.string().min(1),
    SANITY_SESSION_SECRET: z.string().min(1),
  },

  emptyStringAsUndefined: true,
  runtimeEnv: typeof process !== "undefined" ? process.env : {},
});
