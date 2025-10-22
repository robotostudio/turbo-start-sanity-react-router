import { loadQuery } from "./loader.server";
import { queryGlobalSeoSettings, queryNavbarData } from "./queries";
import type { QueryGlobalSeoSettingsResult, QueryNavbarDataResult } from "./sanity.types";


export const getNavigationData = async () => {
  const [navbarData, settingsData] = await Promise.all([
    loadQuery<QueryNavbarDataResult>(queryNavbarData ),
    loadQuery<QueryGlobalSeoSettingsResult>(queryGlobalSeoSettings ),
  ]);

  return { navbarData: navbarData?.data, settingsData: settingsData?.data };
};
