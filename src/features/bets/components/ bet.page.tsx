import { useSuspenseQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getBetByIdQueryOptions } from '../bets.queries';

interface BetPageProps {
  id: string;
}

const BetPage: FC<BetPageProps> = ({ id }) => {
  const { data: bet } = useSuspenseQuery(getBetByIdQueryOptions(id));

  return (
    <div>
      <h3>Edit Bet</h3>
    </div>
  );
};

export default BetPage;
