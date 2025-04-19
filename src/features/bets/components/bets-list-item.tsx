import { Link } from '@tanstack/react-router';
import { useDeleteBetMutation } from '../bets.mutations';
import { Bet } from '../bets.types';

interface BetListItemProps {
  bet: Bet;
}

const BetsListItem = ({ bet }: BetListItemProps) => {
  const { mutate: deleteBet } = useDeleteBetMutation();
  const { id, date, stake, odds, type, outcome, legs, gain, profit } = bet;

  return (
    <li style={{ marginBottom: '1rem' }}>
      <strong>{new Date(date).toLocaleDateString()}</strong> — {type} — Stake:{' '}
      {stake}€ — Global Odds: {odds} — Outcome: {outcome} — Gain: {gain}€ -
      Profit: {profit}€
      <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
        {legs.map(({ id, label, odds, outcome }) => (
          <li key={id}>
            ▶️ {label} — Odds: {odds} — Result: {outcome}
          </li>
        ))}
      </ul>
      <button onClick={() => deleteBet({ id })}>delete</button>
      <Link
        to="/bets/$betId"
        params={{
          betId: id,
        }}
      >
        <button>edit</button>
      </Link>
    </li>
  );
};
export default BetsListItem;
