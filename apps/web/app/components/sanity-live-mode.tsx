import { useLiveMode } from "@sanity/react-loader";
import { studioUrl } from "~/env";

import { client } from "~/lib/sanity/client";

const liveClient = client.withConfig({
  stega: {
    enabled: true,
    studioUrl,
  },
});

export function SanityLiveMode() {
  useLiveMode({ client: liveClient });

  return null;
}
