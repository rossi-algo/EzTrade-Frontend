import type { Route } from "./+types/home";
import { AppLayout } from "@/components/app-layout";
import { ProtectedRoute } from "@/components/protected-route";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <ProtectedRoute>
    <AppLayout>
      Hello world
    </AppLayout>
  </ProtectedRoute>
}
