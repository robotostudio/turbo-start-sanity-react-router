import { VisualEditing } from "@sanity/visual-editing/react-router";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router";

import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { loadQueryOptions } from "~/sanity/loadQueryOptions.server";
import { getNavigationData } from "~/sanity/navigation";
import type { Route } from "./+types/layout";

const SanityLiveMode = lazy(() =>
  import("~/components/sanity-live-mode").then((module) => ({
    default: module.SanityLiveMode,
  }))
);
const ExitPreview = lazy(() =>
  import("~/components/exit-preview").then((module) => ({
    default: module.ExitPreview,
  }))
);

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { preview } = await loadQueryOptions(request.headers);

  const navigationData = await getNavigationData();
  // Content from Sanity used in the global layout

  return {
    navigationData,
    sanity: { preview },
  };
};

export default function Website({ loaderData }: Route.ComponentProps) {
  const { sanity, navigationData } = loaderData;
  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-4 p-4 lg:gap-12 lg:p-12">
        <Navbar
          navbarData={navigationData.navbarData}
          settingsData={navigationData.settingsData}
        />
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
