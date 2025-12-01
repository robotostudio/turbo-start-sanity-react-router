import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "@workspace/ui/globals.css";
import { env } from "./env/client";
// import {
//   apiVersion,
//   dataset,
//   projectId,
//   siteTitle,
//   siteUrl,
//   studioUrl,
// } from "./env";

export const links: Route.LinksFunction = () => [
  // DNS prefetch for faster resource loading
  { rel: "dns-prefetch", href: "https://cdn.sanity.io" },
  {
    rel: "preconnect",
    href: "https://cdn.sanity.io",
    crossOrigin: "anonymous",
  },

  // Font optimization
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
];

// export const loader = async () =>
//   data({
//     ENV: {
//       VITE_SANITY_PROJECT_ID: env.VITE_SANITY_PROJECT_ID,
//       VITE_SANITY_DATASET: env.VITE_SANITY_DATASET,
//       VITE_SANITY_API_VERSION: env.VITE_SANITY_API_VERSION,
//       VITE_SANITY_STUDIO_URL: env.VITE_SANITY_STUDIO_URL,
//       VITE_SITE_URL: env.VITE_SITE_URL,
//       VITE_SITE_TITLE: env.VITE_SITE_TITLE,
//     },
//   });

export function Layout({ children }: { children: React.ReactNode }) {
  // const { ENV } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {/*<script
          //biome-ignore lint/security/noDangerouslySetInnerHtml: public env
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
          key="env"
        />*/}
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return <Outlet context={loaderData} />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  const NOT_FOUND = 404;

  if (isRouteErrorResponse(error)) {
    message = error.status === NOT_FOUND ? "404" : "Error";
    details =
      error.status === NOT_FOUND
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
