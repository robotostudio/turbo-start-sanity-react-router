import { VisualEditing } from "@sanity/visual-editing/react-router";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { getFooterData, getNavigationData } from "~/lib/sanity/data/navigation";
import { loadQueryOptions } from "~/lib/sanity/load-query-options";
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
  const footerData = await getFooterData();

  return {
    navigationData,
    footerData,
    sanity: { preview },
  };
};

export default function Website({ loaderData }: Route.ComponentProps) {
  const { sanity, navigationData, footerData } = loaderData;
  return (
    <>
      <Navbar
        navbarData={navigationData.navbarData}
        settingsData={navigationData.settingsData}
      />
      <Outlet />
      {footerData && navigationData.settingsData && (
        <Footer data={footerData} settingsData={navigationData.settingsData} />
      )}
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
