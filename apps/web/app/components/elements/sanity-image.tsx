"use client";
import { memo } from "react";
import {
  SanityImage as BaseSanityImage,
  type WrapperProps,
} from "sanity-image";
import {
  processImageData,
  SANITY_BASE_URL,
  type SanityImageProps,
} from "~/lib/sanity/image";

// Image wrapper component
const ImageWrapper = <T extends React.ElementType = "img">(
  props: WrapperProps<T>
) => <BaseSanityImage baseUrl={SANITY_BASE_URL} mode="cover" {...props} />;

// Main component
function SanityImageComponent({ image, ...props }: SanityImageProps) {
  const processedImageData = processImageData(image);

  // Early return for invalid image data
  if (!processedImageData) {
    console.debug("SanityImage: Failed to process image data", image);
    return null;
  }
  const optimizedProps = {
    loading: "lazy" as const,
    decoding: "async" as const,
    ...props,
  };  

  return <ImageWrapper {...optimizedProps} {...processedImageData} />;
}

export const SanityImage = memo(SanityImageComponent);
