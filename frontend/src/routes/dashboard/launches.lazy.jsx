import { createLazyFileRoute } from "@tanstack/react-router";
import { Launches } from "../../components/Launches";

export const Route = createLazyFileRoute("/dashboard/launches")({
  component: RouteComponent,
});

function RouteComponent() {
     return (
    <div className="h-full max-h-screen overflow-y-auto pb-28 bg-[var(--primary-blue)]">
        <Launches />
    </div>
  );
}
