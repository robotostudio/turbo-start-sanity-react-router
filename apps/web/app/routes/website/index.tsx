import { useQuery } from "@sanity/react-loader";
import { PageBuilder } from "~/components/pagebuilder";
import { loadQueryOptions } from "~/lib/sanity/load-query-options";
import { loadQuery } from "~/lib/sanity/loader-server";
import { queryHomePageData } from "~/lib/sanity/queries";
import type { QueryHomePageDataResult } from "~/lib/sanity/sanity.types";
import { MetaTags } from "~/lib/seo/meta-tags";
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

  if (!data) {
    return null;
  }
  const { pageBuilder, _id, _type } = data ?? {};
  if (!(pageBuilder && _id && _type)) {
    return null;
  }

  return (
    <>
      <MetaTags data={data} />
      <PageBuilder id={_id} pageBuilder={pageBuilder} type={_type} />
    </>
  );
}
