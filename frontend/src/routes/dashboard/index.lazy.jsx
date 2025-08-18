import { createLazyFileRoute } from "@tanstack/react-router";
import { Map } from "../../components/Map";

export const Route = createLazyFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full border-2 border-[var(--secondary-blue)] bg-[var(--primary-blue)]">
      <Map />
    </div>
  );
}
