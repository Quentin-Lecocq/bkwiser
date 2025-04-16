import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bankroll/history')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bankroll/history"!</div>
}
