import { PortableText } from "@portabletext/react";

import { SanityImage } from "~/components/SanityImage";

type ContentProps = {
  // biome-ignore lint/suspicious/noExplicitAny: Allow any type
  value: any[];
};

const components = {
  types: {
    image: SanityImage,
  },
};

export function SanityContent(props: ContentProps) {
  const { value } = props;

  return (
    <div className="prose dark:prose-invert lg:prose-2xl font-serif prose-a:text-cyan-600 dark:prose-a:text-cyan-200">
      <PortableText components={components} value={value} />
    </div>
  );
}
