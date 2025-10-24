/** biome-ignore-all lint/performance/noImgElement: We're using a custom font */
import { Resvg } from "@resvg/resvg-js";
import { handleErrors } from "@workspace/utils";
import type { ReactNode } from "react";
import type { SatoriOptions } from "satori";
import satori from "satori";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "./og-constants";

const TTF_URL_REGEX = /url\(([^)]+)\)/;


async function getTtfFont(
  family: string,
  axes: string[],
  value: number[]
): Promise<ArrayBuffer> {
  const familyParam = `${axes.join(",")}@${value.join(",")}`;

  // Get css style sheet with user agent Mozilla/5.0 Firefox/1.0 to ensure non-variable TTF is returned
  const cssCall = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:${familyParam}&display=swap`
  );

  const css = await cssCall.text();
  const ttfUrl = css.match(TTF_URL_REGEX)?.[1];
  if (!ttfUrl) {
    throw new Error("Failed to extract font URL from CSS");
  }
  return await fetch(ttfUrl).then((res) => res.arrayBuffer());
}



async function loadInterFonts(): Promise<SatoriOptions["fonts"]> {
  const [regularResult, boldResult, semiBoldResult] = await Promise.allSettled([
    getTtfFont("Inter", ["wght"], [400]),
    getTtfFont("Inter", ["wght"], [700]),
    getTtfFont("Inter", ["wght"], [600]),
  ]);

  const fonts: SatoriOptions["fonts"] = [];

  if (regularResult.status === "fulfilled") {
    fonts.push({
      name: "Inter",
      data: regularResult.value,
      style: "normal",
      weight: 400,
    });
  }

  if (boldResult.status === "fulfilled") {
    fonts.push({
      name: "Inter",
      data: boldResult.value,
      style: "normal",
      weight: 700,
    });
  }

  if (semiBoldResult.status === "fulfilled") {
    fonts.push({
      name: "Inter",
      data: semiBoldResult.value,
      style: "normal",
      weight: 600,
    });
  }
  return fonts;
}

async function getSatoriOptions(
  width: number,
  height: number
): Promise<SatoriOptions> {
  const fonts = await loadInterFonts();

  return {
    width,
    height,
    fonts,
  };
}

type ImageDimensions = {
  width: number;
  height: number;
};

function convertSvgToPng(svg: string): Uint8Array {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

function createFallbackErrorImage(
  error: string,
  { width, height }: ImageDimensions = {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  }
): Uint8Array {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="50%"
        y="60%"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="24"
        fill="#999999"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${error}
      </text>
    </svg>
  `.trim();

  return convertSvgToPng(svg);
}

export async function generatePngFromNode(
  node: ReactNode,
  {
    width = OG_IMAGE_WIDTH,
    height = OG_IMAGE_HEIGHT,
  }: Partial<ImageDimensions> = {}
): Promise<Uint8Array> {
  try {
    // Clean log entry for the function call
    console.info("[OG] generatePngFromNode called", {
      width,
      height,
      nodeDefined: !!node,
    });

    if (!node) {
      console.error("[OG] No React node provided to generatePngFromNode");
      throw new Error("React node is required to generate PNG");
    }

    if (width <= 0 || height <= 0) {
      console.error("[OG] Invalid image dimensions", { width, height });
      throw new Error("Width and height must be positive numbers");
    }

    const [options, optionsError] = await handleErrors(
      getSatoriOptions(width, height)
    );

    if (optionsError || !options) {
      console.error("[OG] Failed to generate Satori options", optionsError);
      throw new Error(`Failed to generate Satori options: ${optionsError}`);
    }

    const [svg, svgError] = await handleErrors(satori(node, options));
    if (svgError || typeof svg !== "string") {
      console.error("[OG] satori SVG generation failed", svgError);
      throw new Error(`SVG generation failed: ${svgError}`);
    }

    console.info("[OG] SVG generated successfully, converting to PNG.");
    return convertSvgToPng(svg);
  } catch (error) {
    console.error("[OG] Failed to generate OG image", error);
    return createFallbackErrorImage(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
}
