import { getNavigationData } from "~/lib/sanity/data/navigation";

export const loader = async () => {
  const navigationData = await getNavigationData();
  return new Response(JSON.stringify(navigationData), { status: 200 });
};
