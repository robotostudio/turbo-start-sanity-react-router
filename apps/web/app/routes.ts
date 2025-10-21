import {
  index,
  layout,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  // Separate front-end website layout
  layout("./routes/website/layout.tsx", [
    index("./routes/website/index.tsx"),
    // ...prefix("records", [
    //   route(":slug", "./routes/website/records/$slug.tsx"),
    // ]),
  ]),
  // From Studio layout, because of Visual Editing
  // route("studio/*", "routes/studio.tsx"),
  // // Resource routes
  ...prefix("resource", [
    route("og", "./routes/resource/og.ts"),
    route("preview", "./routes/resource/preview.ts"),
    route("toggle-theme", "./routes/resource/toggle-theme.ts"),
  ]),
  // however your routes are defined
] satisfies RouteConfig;
