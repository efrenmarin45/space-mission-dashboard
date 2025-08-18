import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/news')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full border-2 border-[var(--secondary-blue)] bg-[var(--primary-blue)]">
      <div>Hello "/dashboard/news"!</div>
    </div>
  );}
