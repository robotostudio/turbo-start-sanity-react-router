import {
  data,
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import { themePreferenceCookie } from "~/cookies";
import { getBodyClassNames } from "~/lib/getBodyClassNames";
import { projectDetails } from "~/sanity/projectDetails";
import { themePreference } from "~/types/themePreference";
import "@workspace/ui/globals.css";

import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://cdn.sanity.io" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
    crossOrigin: "anonymous",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&family=Inter:wght@500;700;800&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap",
    rel: "stylesheet",
  },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  // Dark/light mode
  const cookieHeader = request.headers.get("Cookie");
  const cookieValue = (await themePreferenceCookie.parse(cookieHeader)) || {};
  const theme = themePreference.parse(cookieValue.themePreference) || "light";
  const bodyClassNames = getBodyClassNames(theme);
  const { projectId, dataset, apiVersion } = projectDetails();

  return data({
    theme,
    bodyClassNames,
    ENV: {
      VITE_SANITY_PROJECT_ID: projectId,
      VITE_SANITY_DATASET: dataset,
      VITE_SANITY_API_VERSION: apiVersion,
    },
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { bodyClassNames, ENV } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="https://fav.farm/🤘" rel="icon" />
        <Meta />
        <Links />
      </head>
      <body className={bodyClassNames}>
        {children}
        <ScrollRestoration />
        <Scripts />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Allow the script to be set
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return <Outlet context={loaderData} />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // Remove console.log for accessibility/code style
  let title = "Something went wrong";
  let message = "An unexpected error has occurred. Please try again later.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 — Page Not Found";
      message =
        "Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.";
    } else {
      title = `Error ${error.status}`;
      message = error.statusText || message;
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    title = "Application Error";
    message = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center p-8">
      <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 px-8 py-10 shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <svg
            aria-label="Error"
            className="mb-2 text-red-500"
            fill="none"
            height={48}
            role="img"
            viewBox="0 0 24 24"
            width={48}
          >
            <title>Error</title>
            <circle cx="12" cy="12" fill="#fee2e2" r="10" />
            <path
              d="M9.17 9.17a.75.75 0 0 1 1.06 0L12 10.94l1.77-1.77a.75.75 0 1 1 1.06 1.06L13.06 12l1.77 1.77a.75.75 0 0 1-1.06 1.06L12 13.06l-1.77 1.77a.75.75 0 1 1-1.06-1.06L10.94 12l-1.77-1.77a.75.75 0 0 1 0-1.06z"
              fill="#dc2626"
            />
          </svg>
          <h1 className="text-center font-extrabold text-3xl text-red-700">
            {title}
          </h1>
          <p className="text-center text-lg text-red-600">{message}</p>
          <Link
            className="mt-6 rounded bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            to="/"
          >
            Go back home
          </Link>
          {stack && (
            <details className="mt-6 w-full rounded bg-white/80 px-4 py-3 text-left text-xs shadow-sm">
              <summary className="cursor-pointer py-1 font-semibold text-gray-500 hover:underline">
                Technical details
              </summary>
              <pre className="mt-2 whitespace-pre-wrap break-all text-red-900">
                {stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    </main>
  );
}
