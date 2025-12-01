import type { loadQuery } from "@sanity/react-loader";
import { env } from "~/env/client";
import { serverEnv } from "~/env/server";
// import { studioUrl } from "~/env";
import { client } from "./client";
import { getSession } from "./session";

// I wish I could do this in middleware
// Or move this to server.ts
// But it's simplest, for now, to do it in *every* loader
export async function loadQueryOptions(
  headers: Headers
): Promise<{ preview: boolean; options: Parameters<typeof loadQuery>[2] }> {
  const previewSession = await getSession(headers.get("Cookie"));
  const preview = previewSession.get("projectId") === client.config().projectId;

  if (preview && !serverEnv.SANITY_API_READ_TOKEN) {
    throw new Error(
      `Cannot activate preview mode without a "SANITY_API_READ_TOKEN" token in your environment variables. \n\n
      Create one with "Viewer" permissions at\n\n
      https://sanity.io/manage/project/${client.config().projectId}/api#tokens`
    );
  }

  return {
    preview,
    options: {
      perspective: preview ? "previewDrafts" : "published",
      stega: preview
        ? { enabled: true, studioUrl: env.VITE_SANITY_STUDIO_URL }
        : undefined,
    },
  };
}
