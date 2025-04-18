import { Bet } from '../bets.types';

interface BetListItemProps {
  bet: Bet;
}

const BetsListItem = ({ bet }: BetListItemProps) => {
  const { date, stake, odds, type, outcome, legs } = bet;

  return (
    <li style={{ marginBottom: '1rem' }}>
      <strong>{new Date(date).toLocaleDateString()}</strong> — {type} — Stake:{' '}
      {stake}€ — Global Odds: {odds} — Outcome: {outcome}
      <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
        {legs.map(({ id, label, odds, outcome }) => (
          <li key={id}>
            ▶️ {label} — Odds: {odds} — Result: {outcome}
          </li>
        ))}
      </ul>
    </li>
  );
};
export default BetsListItem;
