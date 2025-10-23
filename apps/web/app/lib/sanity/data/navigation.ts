import { loadQuery } from "../loader-server";
import {
  queryFooterData,
  queryGlobalSeoSettings,
  queryNavbarData,
} from "../queries";
import type {
  QueryFooterDataResult,
  QueryGlobalSeoSettingsResult,
  QueryNavbarDataResult,
} from "../sanity.types";

export const getNavigationData = async () => {
  const [navbarData, settingsData] = await Promise.all([
    loadQuery<QueryNavbarDataResult>(queryNavbarData),
    loadQuery<QueryGlobalSeoSettingsResult>(queryGlobalSeoSettings),
  ]);

  return { navbarData: navbarData?.data, settingsData: settingsData?.data };
};

export const getFooterData = async () => {
  const footerData = await loadQuery<QueryFooterDataResult>(queryFooterData);
  return footerData?.data;
};
