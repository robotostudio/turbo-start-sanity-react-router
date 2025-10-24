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
  ...prefix("api", [
    route("navigation", "./routes/api/navigation.ts"),
    route("preview", "./routes/resource/preview.ts"),
  ]),
  // // Resource routes
  // ...prefix("resource", [
  //   // route("og", "./routes/resource/og.ts"),
  // ]),
] satisfies RouteConfig;
