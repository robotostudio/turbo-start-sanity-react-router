import { buildSrc, type WrapperProps } from "sanity-image";
import { dataset, projectId } from "~/env";
import type { SanityImageProps as SanityImageData } from "~/types";

type ImageHotspot = {
  readonly x: number;
  readonly y: number;
};

type ImageCrop = {
  readonly top: number;
  readonly bottom: number;
  readonly left: number;
  readonly right: number;
};

type ProcessedImageData = {
  readonly id: string;
  readonly preview?: string;
  readonly hotspot?: ImageHotspot;
  readonly crop?: ImageCrop;
};

export type SanityImageProps = {
  readonly image: SanityImageData;
} & Omit<WrapperProps<"img">, "id">;

// Base URL construction
export const SANITY_BASE_URL =
  `https://cdn.sanity.io/images/${projectId}/${dataset}/` as const;

// Type guards
function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

function isValidHotspot(hotspot: unknown): hotspot is ImageHotspot {
  if (!hotspot || typeof hotspot !== "object") {
    return false;
  }
  const h = hotspot as Record<string, unknown>;
  return isValidNumber(h.x) && isValidNumber(h.y);
}

function isValidCrop(crop: unknown): crop is ImageCrop {
  if (!crop || typeof crop !== "object") {
    return false;
  }
  const c = crop as Record<string, unknown>;
  return (
    isValidNumber(c.top) &&
    isValidNumber(c.bottom) &&
    isValidNumber(c.left) &&
    isValidNumber(c.right)
  );
}

// Pure functions for data processing
function extractHotspot(image: SanityImageData): ImageHotspot | undefined {
  if (!isValidHotspot(image?.hotspot)) {
    return;
  }
  return {
    x: image.hotspot.x,
    y: image.hotspot.y,
  };
}

function extractCrop(image: SanityImageData): ImageCrop | undefined {
  if (!isValidCrop(image?.crop)) {
    return;
  }
  return {
    top: image.crop.top,
    bottom: image.crop.bottom,
    left: image.crop.left,
    right: image.crop.right,
  };
}

// function hasPreview(preview: unknown): preview is string {
//   return typeof preview === "string" && preview.length > 0;
// }

// Main image processing function
export function processImageData(
  image: SanityImageData
): ProcessedImageData | null {
  // Early return for invalid image data
  if (!image?.id || typeof image.id !== "string") {
    console.warn("SanityImage: Invalid image data provided", image);
    return null;
  }

  const hotspot = extractHotspot(image);
  const crop = extractCrop(image);

  //   const preview = hasPreview(image.preview) ? image.preview : undefined;

  return {
    id: image.id,
    // ...(preview && { preview }),
    ...(hotspot && { hotspot }),
    ...(crop && { crop }),
  };
}

export function buildImageUrl(
  image: SanityImageData,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
  }
): string | null {
  const processedImageData = processImageData(image);
  if (!processedImageData) {
    console.warn("SanityImage: Invalid image data provided", image);
    return null;
  }
  const { width, height, quality } = options || {};
  const src = buildSrc({
    baseUrl: SANITY_BASE_URL,
    ...processedImageData,
    ...(width && { width }),
    queryParams: {
      q: quality || 75,
    },
    ...(height && { height }),
  });
  if (!src?.src) {
    console.warn("SanityImage: Invalid image data provided", image);
    return null;
  }
  return src.src;
}
