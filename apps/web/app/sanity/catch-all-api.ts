import { loadQuery } from "./loader.server";
import { queryDocumentTypeBySlug } from "./queries";
import type { QueryDocumentTypeBySlugResult } from "./sanity.types";

export async function getDocumentTypeBySlug(slug: string) {
  const type = await loadQuery<QueryDocumentTypeBySlugResult>(
    queryDocumentTypeBySlug,
    { slug }
  );
  return type?.data;
}
