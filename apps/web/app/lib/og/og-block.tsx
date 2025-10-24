/** biome-ignore-all lint/performance/noImgElement: We're using a custom font */
import { getTitleCase } from "@workspace/utils";
import type { Maybe } from "~/types";

export const errorContent = (error: string) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white" }}>
        Something went Wrong with image generation: {error}
      </h1>
    </div>
  </div>
);

type DominantColorSeoImageRenderProps = {
  image?: Maybe<string>;
  title?: Maybe<string>;
  logo?: Maybe<string>;
  dominantColor?: Maybe<string>;
  date?: Maybe<string>;
  _type?: Maybe<string>;
  description?: Maybe<string>;
};

type SeoImageRenderProps = {
  seoImage: string;
};

export const seoImageRender = ({ seoImage }: SeoImageRenderProps) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      alt="SEO preview"
      height={630}
      src={seoImage}
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
      width={1200}
    />
  </div>
);

export const dominantColorSeoImageRender = ({
  image,
  title,
  logo,
  dominantColor,
  date,
  description,
  _type,
}: DominantColorSeoImageRenderProps) => (
  <div
    style={{
      fontFamily: "Inter",
      background: dominantColor ?? "#12061F",
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      position: "relative",
      width: "100%",
    }}
  >
    {/** biome-ignore lint/a11y/noSvgWithoutTitle: We're using a custom font */}
    <svg
      height="100%"
      style={{ position: "absolute", top: 0, left: 0 }}
      width="100%"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" x2="100%" y1="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "transparent" }} />
          <stop offset="100%" style={{ stopColor: "white" }} />
        </linearGradient>
      </defs>
      <rect fill="url(#gradient)" height="100%" opacity="0.2" width="100%" />
    </svg>

    <div
      style={{
        flex: 1,
        padding: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/** biome-ignore lint/nursery/useImageSize: We're using a custom logo */}
        {logo && <img alt="Logo" src={logo} width={100} />}
        <div
          style={{
            background: "rgba(255,255,255,0.20)",
            color: "white",
            display: "flex",
            padding: "8px 16px",
            borderRadius: 9999,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {new Date(date ?? new Date()).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      <h1
        style={{
          fontSize: 56,
          fontWeight: 600,
          lineHeight: 1.1,
          maxWidth: "90%",
          color: "white",
          margin: 0,
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          style={{
            fontSize: 20,
            color: "white",
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
      {_type && (
        <div
          style={{
            background: "white",
            color: dominantColor ?? "#12061F",
            display: "flex",
            padding: "8px 20px",
            borderRadius: 9999,
            fontSize: 16,
            fontWeight: 600,
            alignSelf: "flex-start",
          }}
        >
          {getTitleCase(_type)}
        </div>
      )}
    </div>

    <div
      style={{
        width: 630,
        height: 630,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 566,
          height: 566,
          background: "rgba(255,255,255,0.20)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 24,
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.05), 0 2px 4px -1px rgba(0,0,0,0.03), 0 4px 6px -1px rgba(0,0,0,0.05), 0 8px 10px -1px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {image ? (
            // NOTE: <img> is not allowed in Next.js. Replace with <Image> as appropriate.
            <img
              alt="Content preview"
              height={566}
              src={image}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: 24,
                boxShadow: "0 4px 24px 0 rgba(0,0,0,0.40)", // mimic tailwind's shadow-2xl
              }}
              width={566}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <img
                alt="Logo"
                height={100}
                src={logo ? logo : "https://picsum.photos/566/566"}
                width={400}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
