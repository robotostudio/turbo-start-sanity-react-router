import type {
  QueryBlogIndexPageDataResult,
  QueryBlogSlugPageDataResult,
} from "~/sanity/sanity.types";
import { BlogCard, BlogHeader, FeaturedBlogCard } from "../blog-card";
import { RichText } from "../elements/rich-text";
import { SanityImage } from "../elements/sanity-image";
import { TableOfContent } from "../elements/table-of-content";
import { PageBuilder } from "../pagebuilder";

export function BlogComponent({
  blog,
}: {
  blog: NonNullable<QueryBlogSlugPageDataResult>;
}) {
  const { title, description, image, richText } = blog;
  return (
    <div className="container mx-auto my-16 px-4 md:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <main>
          <header className="mb-8">
            <h1 className="mt-2 font-bold text-4xl">{title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          </header>
          {image && (
            <div className="mb-12">
              <SanityImage
                alt={title}
                className="h-auto w-full rounded-lg"
                height={900}
                image={image}
                loading="eager"
                width={1600}
              />
            </div>
          )}
          <RichText richText={richText} />
        </main>

        <div className="hidden lg:block">
          <div className="sticky top-4 rounded-lg">
            <TableOfContent richText={richText ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogIndexComponent({
  blogIndex,
}: {
  blogIndex: NonNullable<QueryBlogIndexPageDataResult>;
}) {
  const {
    description,
    title,
    pageBuilder,
    _id,
    _type,
    blogs,
    displayFeaturedBlogs,
    featuredBlogsCount,
  } = blogIndex;
  const validFeaturedBlogsCount = featuredBlogsCount
    ? Number.parseInt(featuredBlogsCount, 10)
    : 0;

  const shouldDisplayFeaturedBlogs =
    displayFeaturedBlogs && validFeaturedBlogsCount > 0;

  const featuredBlogs = shouldDisplayFeaturedBlogs
    ? blogs.slice(0, validFeaturedBlogsCount)
    : [];
  const remainingBlogs = shouldDisplayFeaturedBlogs
    ? blogs.slice(validFeaturedBlogsCount)
    : blogs;
  return (
    <main className="bg-background">
      <div className="container mx-auto my-16 px-4 md:px-6">
        <BlogHeader description={description} title={title} />

        {featuredBlogs.length > 0 && (
          <div className="mx-auto mt-8 mb-12 grid grid-cols-1 gap-8 sm:mt-12 md:mt-16 md:gap-12 lg:mb-20">
            {featuredBlogs.map((blog) => (
              <FeaturedBlogCard blog={blog} key={blog._id} />
            ))}
          </div>
        )}

        {remainingBlogs.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
            {remainingBlogs.map((blog) => (
              <BlogCard blog={blog} key={blog._id} />
            ))}
          </div>
        )}
      </div>

      {pageBuilder && pageBuilder.length > 0 && (
        <PageBuilder id={_id} pageBuilder={pageBuilder} type={_type} />
      )}
    </main>
  );
}
