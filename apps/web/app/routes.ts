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
    route("preview/enable", "./routes/api/preview/enable.ts"),
    route("preview/disable", "./routes/api/preview/disable.ts"),
    route("navigation", "./routes/api/navigation.ts"),
    route("og", "./routes/api/og.ts"),
  ]),
] satisfies RouteConfig;
