import { createLazyFileRoute } from '@tanstack/react-router'
import { Vehicles } from '../../components/Vehicles';

export const Route = createLazyFileRoute('/dashboard/vehicles')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-full max-h-screen overflow-y-auto pb-28 border-[var(--secondary-blue)] bg-[var(--primary-blue)]">
      <Vehicles />
    </div>
  );}
