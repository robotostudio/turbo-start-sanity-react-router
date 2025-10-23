import {
  index,
  layout,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/website/layout.tsx", [
    index("./routes/website/index.tsx"),
    route("*", "./routes/website/catch-all.tsx"),
  ]),
  ...prefix("api", [route("navigation", "./routes/api/navigation.ts")]),
  // // Resource routes
  ...prefix("resource", [
    // route("og", "./routes/resource/og.ts"),
    route("preview", "./routes/resource/preview.ts"),
  ]),
] satisfies RouteConfig;
