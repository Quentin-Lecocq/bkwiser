import { useSuspenseQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getBetByIdQueryOptions } from '../bets.queries';
import { transformBetToFormValues } from '../bets.services';
import BetForm from './bet.form';

interface BetPageProps {
  id: string;
}

const BetPage: FC<BetPageProps> = ({ id }) => {
  const { data: bet } = useSuspenseQuery(getBetByIdQueryOptions(id));

  return (
    <div>
      <h3>Edit Bet</h3>
      <BetForm
        mode="edit"
        initialValues={transformBetToFormValues(bet)}
        betId={bet.id}
      />
    </div>
  );
};

export default BetPage;
