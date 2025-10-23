import { PageBuilder } from "~/components/pagebuilder";
import {
  BlogComponent,
  BlogIndexComponent,
} from "~/components/pages/blog-component";
import { loadQuery } from "~/sanity/loader.server";
import { loadQueryOptions } from "~/sanity/loadQueryOptions.server";
import {
  queryBlogIndexPageData,
  queryBlogSlugPageData,
  queryDocumentTypeBySlug,
  querySlugPageData,
} from "~/sanity/queries";
import type {
  QueryBlogIndexPageDataResult,
  QueryBlogSlugPageDataResult,
  QueryDocumentTypeBySlugResult,
  QuerySlugPageDataResult,
} from "~/sanity/sanity.types";
import type { Route } from "./+types/catch-all";

type DocumentType = NonNullable<QueryDocumentTypeBySlugResult>;

type PageLoaderData = {
  type: "page";
  page: NonNullable<QuerySlugPageDataResult>;
};

type BlogLoaderData = {
  type: "blog";
  blog: NonNullable<QueryBlogSlugPageDataResult>;
};

type BlogIndexLoaderData = {
  type: "blogIndex";
  blogIndex: NonNullable<QueryBlogIndexPageDataResult>;
};

type LoaderData = PageLoaderData | BlogLoaderData | BlogIndexLoaderData;

async function loadPageData(
  slug: string,
  options: Awaited<ReturnType<typeof loadQueryOptions>>["options"]
): Promise<PageLoaderData> {
  const page = await loadQuery<QuerySlugPageDataResult>(
    querySlugPageData,
    { slug },
    options
  );

  if (!page?.data) {
    throw new Response("Not found", { status: 404 });
  }

  return {
    type: "page",
    page: page.data,
  };
}

async function loadBlogData(
  slug: string,
  options: Awaited<ReturnType<typeof loadQueryOptions>>["options"]
): Promise<BlogLoaderData> {
  const blog = await loadQuery<QueryBlogSlugPageDataResult>(
    queryBlogSlugPageData,
    { slug },
    options
  );

  if (!blog?.data) {
    throw new Response("Not found", { status: 404 });
  }

  return {
    type: "blog",
    blog: blog.data,
  };
}

async function loadBlogIndexData(
  slug: string,
  options: Awaited<ReturnType<typeof loadQueryOptions>>["options"]
): Promise<BlogIndexLoaderData> {
  const blogIndex = await loadQuery<QueryBlogIndexPageDataResult>(
    queryBlogIndexPageData,
    { slug },
    options
  );

  if (!blogIndex?.data) {
    throw new Response("Not found", { status: 404 });
  }

  return {
    type: "blogIndex",
    blogIndex: blogIndex.data,
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



export default function CatchAll({ loaderData }: Route.ComponentProps) {
  switch (loaderData.type) {
    case "page":
      return (
        <PageBuilder
          id={loaderData.page._id}
          pageBuilder={loaderData.page.pageBuilder ?? []}
          type={loaderData.page._type}
        />
      );
    case "blog":
      return <BlogComponent blog={loaderData.blog} />;
    case "blogIndex":
      return <BlogIndexComponent blogIndex={loaderData.blogIndex} />;
    default:
      throw new Response("Not found", { status: 404 });
  }
}
