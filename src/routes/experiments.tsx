import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/experiments')({
  component: ExperimentsLayout,
})

function ExperimentsLayout() {
  // This is a layout route - just render the outlet for child routes (index and $slug)
  return <Outlet />
}

export default ExperimentsLayout
