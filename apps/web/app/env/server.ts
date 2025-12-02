import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { formatValidationError } from "~/env/format-validation-error";

export const serverEnv = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    SANITY_API_READ_TOKEN: z.string().min(1),
    SANITY_API_WRITE_TOKEN: z.string().min(1),
    SANITY_SESSION_SECRET: z.string().min(1).default("e5670a7f1b59e932"),
  },

  emptyStringAsUndefined: true,
  runtimeEnv: typeof process !== "undefined" ? process.env : {},
  onValidationError(issues) {
    const errorMessage = formatValidationError(issues);
    // biome-ignore lint/suspicious/noConsole: error message
    console.error(errorMessage);
    throw new Error(errorMessage);
  },
});
