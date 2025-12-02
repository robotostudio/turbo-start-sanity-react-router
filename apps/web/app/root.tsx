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
import { ThemeProvider } from "./components/theme-provider";
import { env } from "./env/client";

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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <script
          //biome-ignore lint/security/noDangerouslySetInnerHtml: theme initialization script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storageKey = 'vite-ui-theme';
                const defaultTheme = 'system';
                const storedTheme = localStorage.getItem(storageKey);
                const theme = storedTheme || defaultTheme;
                
                const root = document.documentElement;
                root.classList.remove('light', 'dark');
                
                if (theme === 'system') {
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  root.classList.add(systemTheme);
                } else {
                  root.classList.add(theme);
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
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
