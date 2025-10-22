import { getNavigationData } from "~/sanity/navigation";

export const loader = async () => {
  const navigationData = await getNavigationData();
  return new Response(JSON.stringify(navigationData), { status: 200 });
};
