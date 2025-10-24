import {
  dominantColorSeoImageRender,
  errorContent,
  seoImageRender,
} from "~/lib/og/og-block";
import {
  getBlogPageOGData,
  getGenericPageOGData,
  getHomePageOGData,
  getSlugPageOGData,
} from "~/lib/og/og-data";
import { generatePngFromNode } from "~/lib/og/og-server";
import type { Route } from "./+types/og";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

type ContentProps = Record<string, string>;

const getHomePageContent = async ({ id }: ContentProps) => {
  if (!id) {
    return;
  }
  const [result, err] = await getHomePageOGData(id);
  if (err || !result) {
    return;
  }
  if (result?.seoImage) {
    return seoImageRender({ seoImage: result.seoImage });
  }
  return dominantColorSeoImageRender(result);
};
const getSlugPageContent = async ({ id }: ContentProps) => {
  if (!id) {
    return;
  }
  const [result, err] = await getSlugPageOGData(id);
  if (err || !result) {
    return;
  }
  if (result?.seoImage) {
    return seoImageRender({ seoImage: result.seoImage });
  }
  return dominantColorSeoImageRender(result);
};

const getBlogPageContent = async ({ id }: ContentProps) => {
  if (!id) {
    return;
  }
  const [result, err] = await getBlogPageOGData(id);
  if (err || !result) {
    return;
  }
  if (result?.seoImage) {
    return seoImageRender({ seoImage: result.seoImage });
  }
  return dominantColorSeoImageRender(result);
};

const getGenericPageContent = async ({ id }: ContentProps) => {
  if (!id) {
    return;
  }
  const [result, err] = await getGenericPageOGData(id);
  if (err || !result) {
    return;
  }
  if (result?.seoImage) {
    return seoImageRender({ seoImage: result.seoImage });
  }
  return dominantColorSeoImageRender(result);
};

const block = {
  homePage: getHomePageContent,
  page: getSlugPageContent,
  blog: getBlogPageContent,
} as const;

const headers = (title: string) =>
  ({
    "Content-Type": "image/png",
    "Cache-Control":
      "public, immutable, no-transform, max-age=31536000, s-maxage=31536000, stale-while-revalidate=60",
    "Content-Disposition": `inline; filename="og-image-${title}.png"`,
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "no-referrer",
    "Accept-Ranges": "bytes",
  }) as const;

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as keyof typeof block;
  const para = Object.fromEntries(searchParams.entries());

  const h = headers(`${type}-${para?.id ?? "generic"}`);
  const image = block[type] ?? getGenericPageContent;

  // Optimized and cache headers for OG images

  try {
    const content = await image(para);
    const png = await generatePngFromNode(content);

    return new Response(Buffer.from(png), {
      status: 200,
      headers: h,
    });
  } catch (error) {
    // Don't use console in production, could replace with error logging if required.
    console.error(error);

    const png = await generatePngFromNode(
      errorContent(error instanceof Error ? error.message : "Unknown error")
    );

    return new Response(Buffer.from(png), {
      status: 500,
      headers: h,
    });
  }
};
