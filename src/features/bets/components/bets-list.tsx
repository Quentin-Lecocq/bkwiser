import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { betsQueryOptions } from '../bets.queries';
import BetsListItem from './bets-list-item';

const BetsList = () => {
  const { data: bets } = useSuspenseQuery(betsQueryOptions);

  return (
    <div>
      <h2>Bets List</h2>
      <ul>
        {bets.map((bet) => (
          <BetsListItem key={bet.id} bet={bet} />
        ))}
      </ul>
      <Link to="/bets/new">
        <button style={{ marginTop: '1rem' }}>Create New Bet</button>
      </Link>
    </div>
  );
};

export default BetsList;
