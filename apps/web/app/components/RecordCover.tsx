import type { SanityImageObjectStub } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";

import { dataset, projectId } from "~/sanity/projectDetails";

type RecordCoverProps = {
  image?: SanityImageObjectStub & { alt: string };
};

export function RecordCover(props: RecordCoverProps) {
  const { image } = props;

  return (
    <div className="aspect-square bg-gray-50">
      {image ? (
        <figure className="relative h-auto w-full object-cover shadow-black transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <picture>
            <source
              srcSet={urlBuilder({ projectId, dataset })
                .image(image)
                .height(800)
                .width(800)
                .auto("format")
                .url()}
              type="image/webp"
            />
            <source
              srcSet={urlBuilder({ projectId, dataset })
                .image(image)
                .height(800)
                .width(800)
                .url()}
              type="image/jpeg"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={image.alt ?? ""}
              className="h-auto w-full object-cover"
              height={800}
              loading="lazy"
              src={urlBuilder({ projectId, dataset })
                .image(image)
                .height(800)
                .width(800)
                .auto("format")
                .url()}
              width={800}
              // No role="presentation": we want accessible alt text (should be meaningful).
            />
          </picture>
        </figure>
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500">
          Missing Record art
        </div>
      )}
    </div>
  );
}
