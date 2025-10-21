import { useQuery } from "@sanity/react-loader";
import { loadQuery } from "~/sanity/loader.server";
import { loadQueryOptions } from "~/sanity/loadQueryOptions.server";
import { queryHomePageData } from "~/sanity/queries";
import type { QueryHomePageDataResult } from "~/sanity/sanity.types";
import type { Route } from "./+types";

// export const meta = ({ matches }: Route.MetaArgs) => {
//   const layoutData = matches.find(
//     (match) => match.id === "routes/website/layout"
//   )?.data;
//   const home = layoutData ? layoutData.initial.data : null;
//   const title = [home?.title, home?.siteTitle].filter(Boolean).join(" | ");

//   return [{ title }];
// };

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { options } = await loadQueryOptions(request.headers);
  const params = {};
  const initial = await loadQuery<QueryHomePageDataResult>(
    queryHomePageData,
    params,
    options
  );

  if (!initial.data) {
    throw new Response("Not found", { status: 404 });
  }

  return { initial, params, query: queryHomePageData };
};

export default function Index({ loaderData }: Route.ComponentProps) {
  const { initial, params, query } = loaderData;
  const { data } = useQuery(query, params, { initial });
  console.log("🚀 ~ Index ~ data:", data);

  return data ? <div>{data.title}</div> : null;
}
