import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Sidebar } from "../../components/Sidebar";

export const Route = createFileRoute("/dashboard")({
  component: () => {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 p-2">
          <Sidebar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    );
  },
});
