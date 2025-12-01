import { useLiveMode } from "@sanity/react-loader";
import { env } from "~/env/client";

import { client } from "~/lib/sanity/client";

const liveClient = client.withConfig({
  stega: {
    enabled: true,
    studioUrl: env.VITE_SANITY_STUDIO_URL,
  },
});

export function SanityLiveMode() {
  useLiveMode({ client: liveClient });

  return null;
}
