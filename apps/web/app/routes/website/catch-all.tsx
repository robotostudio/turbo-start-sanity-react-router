import { type QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { PageBuilder } from "~/components/pagebuilder";
import {
  BlogComponent,
  BlogIndexComponent,
} from "~/components/pages/blog-component";
import { loadQueryOptions } from "~/lib/sanity/load-query-options";
import { loadQuery } from "~/lib/sanity/loader-server";
import {
  queryBlogIndexPageData,
  queryBlogSlugPageData,
  queryDocumentTypeBySlug,
  querySlugPageData,
} from "~/lib/sanity/queries";
import type {
  QueryBlogIndexPageDataResult,
  QueryBlogSlugPageDataResult,
  QueryDocumentTypeBySlugResult,
  QuerySlugPageDataResult,
} from "~/lib/sanity/sanity.types";
import type { Route } from "./+types/catch-all";

type DocumentType = NonNullable<QueryDocumentTypeBySlugResult>;

type PageLoaderData = {
  type: "page";
  initial: QueryResponseInitial<QuerySlugPageDataResult>;
  query: string;
  params: { slug: string };
};

type BlogLoaderData = {
  type: "blog";
  initial: QueryResponseInitial<QueryBlogSlugPageDataResult>;
  query: string;
  params: { slug: string };
};

type BlogIndexLoaderData = {
  type: "blogIndex";
  initial: QueryResponseInitial<QueryBlogIndexPageDataResult>;
  query: string;
  params: { slug: string };
};

type LoaderData = PageLoaderData | BlogLoaderData | BlogIndexLoaderData;

async function loadPageData(
  slug: string,
  options: Awaited<ReturnType<typeof loadQueryOptions>>["options"]
): Promise<PageLoaderData> {
  const params = { slug };
  const initial = await loadQuery<QuerySlugPageDataResult>(
    querySlugPageData,
    params,
    options
  );

  if (!initial?.data) {
    throw new Response("Not found", { status: 404 });
  }

  return {
    type: "page",
    initial,
    query: querySlugPageData,
    params,
  };
}

async function loadBlogData(
  slug: string,
  options: Awaited<ReturnType<typeof loadQueryOptions>>["options"]
): Promise<BlogLoaderData> {
  const params = { slug };
  const initial = await loadQuery<QueryBlogSlugPageDataResult>(
    queryBlogSlugPageData,
    params,
    options
  );

  if (!initial?.data) {
    throw new Response("Not found", { status: 404 });
  }

  return {
    type: "blog",
    initial,
    query: queryBlogSlugPageData,
    params,
  };
}

async function loadBlogIndexData(
  slug: string,
  options: Awaited<ReturnType<typeof loadQueryOptions>>["options"]
): Promise<BlogIndexLoaderData> {
  const params = { slug };
  const initial = await loadQuery<QueryBlogIndexPageDataResult>(
    queryBlogIndexPageData,
    params,
    options
  );

  if (!initial?.data) {
    throw new Response("Not found", { status: 404 });
  }

  return {
    type: "blogIndex",
    initial,
    query: queryBlogIndexPageData,
    params,
  };
}

async function loadContentByType(
  documentType: DocumentType,
  slug: string,
  options: Awaited<ReturnType<typeof loadQueryOptions>>["options"]
): Promise<LoaderData> {
  switch (documentType) {
    case "page":
      return await loadPageData(slug, options);
    case "blog":
      return await loadBlogData(slug, options);
    case "blogIndex":
      return await loadBlogIndexData(slug, options);
    default:
      throw new Response("Not found", { status: 404 });
  }
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const { "*": splat } = params;
  const slug = `/${splat}`;
  const { options } = await loadQueryOptions(request.headers);

  const type = await loadQuery<QueryDocumentTypeBySlugResult>(
    queryDocumentTypeBySlug,
    { slug },
    options
  );

  if (!type?.data) {
    throw new Response("Not found", { status: 404 });
  }

  return await loadContentByType(type.data, slug, options);
}

function PageContent({ loaderData }: { loaderData: PageLoaderData }) {
  const { initial, params, query } = loaderData;
  const { data } = useQuery<QuerySlugPageDataResult>(query, params, {
    initial,
  });

  if (!data) {
    return null;
  }

  const { pageBuilder, _id, _type } = data;

  return <PageBuilder id={_id} pageBuilder={pageBuilder ?? []} type={_type} />;
}

function BlogContent({ loaderData }: { loaderData: BlogLoaderData }) {
  const { initial, params, query } = loaderData;
  const { data } = useQuery<QueryBlogSlugPageDataResult>(query, params, {
    initial,
  });

  if (!data) {
    return null;
  }

  return <BlogComponent blog={data} />;
}

function BlogIndexContent({ loaderData }: { loaderData: BlogIndexLoaderData }) {
  const { initial, params, query } = loaderData;
  const { data } = useQuery<QueryBlogIndexPageDataResult>(query, params, {
    initial,
  });

  if (!data) {
    return null;
  }

  return <BlogIndexComponent blogIndex={data} />;
}

export default function CatchAll({ loaderData }: Route.ComponentProps) {
  switch (loaderData.type) {
    case "page":
      return <PageContent loaderData={loaderData} />;
    case "blog":
      return <BlogContent loaderData={loaderData} />;
    case "blogIndex":
      return <BlogIndexContent loaderData={loaderData} />;
    default:
      throw new Response("Not found", { status: 404 });
  }
}
