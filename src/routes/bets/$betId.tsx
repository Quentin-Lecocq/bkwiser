import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bets/$betId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bets/$betId"!</div>
}
