export function isRelativeUrl(url: string) {
  return url.startsWith("/") || url.startsWith("#") || url.startsWith("?");
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return isRelativeUrl(url);
  }
}

