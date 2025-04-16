import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bets/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bets/new"!</div>
}
