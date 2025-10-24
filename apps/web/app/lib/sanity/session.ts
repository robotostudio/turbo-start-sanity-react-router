import { createCookieSessionStorage } from "react-router";

export const PREVIEW_SESSION_NAME = "__preview";

/**
 * Determines if the environment is production.
 */
const isProduction = process.env.NODE_ENV === "production";

if (!process.env.SANITY_SESSION_SECRET) {
  throw new Error("Missing SANITY_SESSION_SECRET in .env");
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: PREVIEW_SESSION_NAME,
      secrets: [process.env.SANITY_SESSION_SECRET],
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      httpOnly: true,
      path: "/",
    },
  });

export { commitSession, destroySession, getSession };
