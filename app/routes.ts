import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("/login", "routes/login.tsx"), route("/place-trade", "routes/place-trade.tsx"), route("/manage-trade", "routes/manage-trade.tsx")] satisfies RouteConfig;
