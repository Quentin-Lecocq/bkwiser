import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bankroll/adjust')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bankroll/adjust"!</div>
}
