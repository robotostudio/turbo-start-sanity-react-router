import { loadQuery, useQuery } from "@sanity/react-loader";
import { PageBuilder } from "~/components/pagebuilder";
import { loadQueryOptions } from "~/lib/sanity/load-query-options";
import { queryHomePageData } from "~/lib/sanity/queries";
import type { QueryHomePageDataResult } from "~/lib/sanity/sanity.types";
import type { Route } from "./+types";

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
  const { pageBuilder, _id, _type } = data ?? {};
  if (!(pageBuilder && _id && _type)) {
    return null;
  }

  return <PageBuilder id={_id} pageBuilder={pageBuilder} type={_type} />;
}
