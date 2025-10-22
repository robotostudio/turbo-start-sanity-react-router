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

export const loader = async ({ request, params }: Route.LoaderArgs) => {
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

  switch (type?.data) {
    case "page": {
      const page = await loadQuery<QuerySlugPageDataResult>(
        querySlugPageData,
        { slug },
        options
      );
      if (!page?.data) {
        throw new Response("Not found", { status: 404 });
      }
      return {
        type: type.data,
        page: page.data,
      };
    }
    case "blog": {
      const blog = await loadQuery<QueryBlogSlugPageDataResult>(
        queryBlogSlugPageData,
        { slug },
        options
      );
      if (!blog?.data) {
        throw new Response("Not found", { status: 404 });
      }
      return {
        type: type.data,
        blog: blog.data,
      };
    }
    case "blogIndex": {
      const blogIndex = await loadQuery<QueryBlogIndexPageDataResult>(
        queryBlogIndexPageData,
        { slug },
        options
      );
      if (!blogIndex?.data) {
        throw new Response("Not found", { status: 404 });
      }
      return {
        type: type.data,
        blogIndex: blogIndex.data,
      };
    }
    default:
      throw new Response("Not found", { status: 404 });
  }
};

export default function CatchAll({ loaderData }: Route.ComponentProps) {
  switch (loaderData.type) {
    case "page":
      if (loaderData.page) {
        return (
          <PageBuilder
            id={loaderData.page._id}
            pageBuilder={loaderData.page.pageBuilder ?? []}
            type={loaderData.page._type}
          />
        );
      }
      break;
    case "blog":
      if (loaderData.blog) {
        return <BlogComponent blog={loaderData.blog} />;
      }
      break;
    case "blogIndex":
      if (loaderData.blogIndex) {
        return <BlogIndexComponent blogIndex={loaderData.blogIndex} />;
      }
      break;
    default:
      break;
  }
  throw new Response("Not found", { status: 404 });
}
