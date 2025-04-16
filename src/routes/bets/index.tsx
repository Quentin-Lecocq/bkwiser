import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bets/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bets/"!</div>
}
