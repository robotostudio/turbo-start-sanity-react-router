import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { redirect } from "react-router";
import { serverEnv } from "~/env/server";
import { client } from "~/lib/sanity/client";
import { commitSession, getSession } from "~/lib/sanity/session";
import type { Route } from "./+types/enable";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const clientWithToken = client.withConfig({
    token: serverEnv.SANITY_API_READ_TOKEN,
  });

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    throw new Response("Invalid secret", { status: 401 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  await session.set("projectId", client.config().projectId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
