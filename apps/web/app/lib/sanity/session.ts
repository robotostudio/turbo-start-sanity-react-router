import { createCookieSessionStorage } from "react-router";
import { serverEnv } from "~/env/server";

export const PREVIEW_SESSION_NAME = "__preview";

/**
 * Determines if the environment is production.
 */
const isProduction = serverEnv.NODE_ENV === "production";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: PREVIEW_SESSION_NAME,
      secrets: [serverEnv.SANITY_SESSION_SECRET],
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      httpOnly: true,
      path: "/",
    },
  });

export { commitSession, destroySession, getSession };
