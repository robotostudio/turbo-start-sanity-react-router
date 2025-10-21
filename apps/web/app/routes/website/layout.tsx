import { VisualEditing } from "@sanity/visual-editing/react-router";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router";

import { Footer } from "~/components/Footer";
import { loadQueryOptions } from "~/sanity/loadQueryOptions.server";

import type { Route } from "./+types/layout";

const SanityLiveMode = lazy(() =>
  import("~/components/SanityLiveMode").then((module) => ({
    default: module.SanityLiveMode,
  }))
);
const ExitPreview = lazy(() =>
  import("~/components/ExitPreview").then((module) => ({
    default: module.ExitPreview,
  }))
);

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { preview } = await loadQueryOptions(request.headers);

  // Content from Sanity used in the global layout

  return {
    sanity: { preview },
  };
};

export default function Website({ loaderData }: Route.ComponentProps) {
  const { sanity } = loaderData;

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-4 p-4 lg:gap-12 lg:p-12">
        <Outlet />
      </div>
      <Footer />
      {sanity.preview ? (
        <Suspense>
          <SanityLiveMode />
          <ExitPreview />
          <VisualEditing />
        </Suspense>
      ) : null}
    </>
  );
}
