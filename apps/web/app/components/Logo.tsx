import { Link } from "react-router";
import { STUDIO_BASEPATH } from "~/sanity/constants";

import type { LogoProps } from "~/types/home";

export function Logo(props: LogoProps) {
  const { siteTitle } = props.home ?? {};

  if (!siteTitle && typeof document !== "undefined") {
    console.info(
      `Create and publish "home" document in Sanity Studio at ${window.origin}/${STUDIO_BASEPATH}/structure/home`
    );
  }

  return (
    <p className="font-bold text-black text-lg tracking-tighter lg:text-2xl dark:text-white">
      <Link to="/">{siteTitle ?? "Sanity React Router"}</Link>
    </p>
  );
}
