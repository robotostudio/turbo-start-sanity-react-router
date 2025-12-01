import { stegaClean } from "@sanity/client/stega";
import { env } from "~/env/client";
// import { siteTitle, siteUrl } from "~/env";
import type { Maybe, SanityImageProps } from "~/types";
import { buildImageUrl } from "../sanity/image";
import type {
  QueryBlogIndexPageDataResult,
  QueryBlogSlugPageDataResult,
  QueryHomePageDataResult,
  QuerySlugPageDataResult,
} from "../sanity/sanity.types";

/**
 * Types
 */
type SeoData = {
  title?: Maybe<string>;
  description?: Maybe<string>;
  slug?: string;
  contentId?: string;
  contentType?: string;
  keywords?: string[];
  seoNoIndex?: boolean;
  pageType?: string;
  seoImage?: Maybe<SanityImageProps>;
};

type SeoDataResult =
  | NonNullable<QueryHomePageDataResult>
  | NonNullable<QueryBlogSlugPageDataResult>
  | NonNullable<QuerySlugPageDataResult>
  | NonNullable<QueryBlogIndexPageDataResult>;

export function transformSeoData(data: SeoDataResult): SeoData {
  return stegaClean({
    title: data.seoTitle ?? data.title,
    description: data.seoDescription ?? data.description,
    slug: data.slug,
    contentId: data._id,
    contentType: data._type,
    seoImage: data.seoImage,
    seoNoIndex: Boolean(data.seoNoIndex),
    pageType: data._type === "blog" ? "blog" : "website",
  });
}

/**
 * Utilities
 */
const getCanonicalUrl = (pathname: string): string =>
  `${env.VITE_SITE_URL}${pathname}`;

/**
 * Components
 */
export function MetaTags({ data: _data }: { data: SeoDataResult }) {
  const data = transformSeoData(_data);
  const metaTitle = data.title ?? env.VITE_SITE_TITLE;
  const metaDescription = data.description ?? "";
  const ogTitle = data.title ?? env.VITE_SITE_TITLE;
  const ogDescription = data.description ?? "";
  const canonicalUrl = getCanonicalUrl(data.slug ?? "/");
  const ogImageUrl = data.seoImage
    ? buildImageUrl(data.seoImage)
    : `${env.VITE_SITE_URL}/api/og?type=${data.contentType}&id=${data.contentId}`;

  return (
    <>
      <title>{metaTitle}</title>
      <meta content={metaDescription} name="description" />
      <link href={canonicalUrl} rel="canonical" />
      {data.seoNoIndex && <meta content="noindex, nofollow" name="robots" />}
      {/* Open Graph */}
      <meta content="website" property="og:type" />
      <meta content={canonicalUrl} property="og:url" />
      <meta content={ogTitle} property="og:title" />
      <meta content={ogDescription} property="og:description" />
      {ogImageUrl && <meta content={ogImageUrl} property="og:image" />}
      {ogImageUrl && <meta content="1200" property="og:image:width" />}
      {ogImageUrl && <meta content="630" property="og:image:height" />}
      <meta content={env.VITE_SITE_TITLE} property="og:site_name" />
      {/* Twitter */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={canonicalUrl} name="twitter:url" />
      <meta content={ogTitle} name="twitter:title" />
      <meta content={ogDescription} name="twitter:description" />
      {ogImageUrl && <meta content={ogImageUrl} name="twitter:image" />}
    </>
  );
}

function prepareBlogMetadata(data: NonNullable<QueryBlogSlugPageDataResult>) {
  const metaTitle = data.seoTitle ?? data.title ?? env.VITE_SITE_TITLE;
  const metaDescription = data.seoDescription ?? data.description ?? "";
  const ogTitle =
    data.ogTitle ?? data.seoTitle ?? data.title ?? env.VITE_SITE_TITLE;
  const ogDescription =
    data.ogDescription ?? data.seoDescription ?? data.description ?? "";
  const canonicalUrl = getCanonicalUrl(data.slug ?? "/");
  const authorName =
    Array.isArray(data.authors) && data.authors[0]?.name
      ? data.authors[0].name
      : "";
  const publishedTime = data.publishedAt ?? data._createdAt;
  const modifiedTime = data._updatedAt;
  const ogImageUrl = data.seoImage
    ? buildImageUrl(data.seoImage)
    : `${env.VITE_SITE_URL}/api/og?type=blog&id=${data._id}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: metaDescription,
    image: ogImageUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: authorName ? { "@type": "Person", name: authorName } : undefined,
    publisher: {
      "@type": "Organization",
      name: env.VITE_SITE_TITLE,
      // logo: siteLogo ? { "@type": "ImageObject", url: siteLogo } : undefined,
    },
  };

  return {
    metaTitle,
    metaDescription,
    ogTitle,
    ogDescription,
    canonicalUrl,
    authorName,
    publishedTime,
    modifiedTime,
    ogImageUrl,
    jsonLd,
  };
}

export function BlogMetaTags({
  data,
}: {
  data: NonNullable<QueryBlogSlugPageDataResult>;
}) {
  const meta = prepareBlogMetadata(stegaClean(data));

  return (
    <>
      <title>{meta.metaTitle}</title>
      <meta content={meta.metaDescription} name="description" />
      <link href={meta.canonicalUrl} rel="canonical" />
      {data.seoNoIndex && <meta content="noindex, nofollow" name="robots" />}
      {/* Author */}
      {meta.authorName && <meta content={meta.authorName} name="author" />}
      {/* Article meta */}
      {meta.publishedTime && (
        <meta content={meta.publishedTime} property="article:published_time" />
      )}
      {meta.modifiedTime && (
        <meta content={meta.modifiedTime} property="article:modified_time" />
      )}
      {meta.authorName && (
        <meta content={meta.authorName} property="article:author" />
      )}
      {/* Open Graph */}
      <meta content="article" property="og:type" />
      <meta content={meta.canonicalUrl} property="og:url" />
      <meta content={meta.ogTitle} property="og:title" />
      <meta content={meta.ogDescription} property="og:description" />
      {meta.ogImageUrl && (
        <meta content={meta.ogImageUrl} property="og:image" />
      )}
      {meta.ogImageUrl && <meta content="1200" property="og:image:width" />}
      {meta.ogImageUrl && <meta content="630" property="og:image:height" />}
      <meta content={env.VITE_SITE_TITLE} property="og:site_name" />
      {meta.publishedTime && (
        <meta
          content={meta.publishedTime}
          property="og:article:published_time"
        />
      )}
      {meta.modifiedTime && (
        <meta content={meta.modifiedTime} property="og:article:modified_time" />
      )}
      {meta.authorName && (
        <meta content={meta.authorName} property="og:article:author" />
      )}
      {/* Twitter */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={meta.canonicalUrl} name="twitter:url" />
      <meta content={meta.ogTitle} name="twitter:title" />
      <meta content={meta.ogDescription} name="twitter:description" />
      {meta.ogImageUrl && (
        <meta content={meta.ogImageUrl} name="twitter:image" />
      )}
      {meta.authorName && (
        <meta content={meta.authorName} name="twitter:creator" />
      )}
      {/* Structured Data */}
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(meta.jsonLd),
        }}
        type="application/ld+json"
      />
    </>
  );
}

/**
 * Get site URL from request
 */
export function getSiteUrl(request: Request): string {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

/**
 * Get pathname from request
 */
export function getPathname(request: Request): string {
  const url = new URL(request.url);
  return url.pathname;
}
