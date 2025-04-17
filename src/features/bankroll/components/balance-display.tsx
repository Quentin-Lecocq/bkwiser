import { useSuspenseQuery } from '@tanstack/react-query';
import { bankrollQueryOptions } from '../bankroll.queries';
import { FC } from 'react';

const BalanceDisplay: FC = () => {
  const { data: bankroll } = useSuspenseQuery(bankrollQueryOptions);

  return (
    <>
      <p>{bankroll} euros</p>
    </>
  );
};

export default BalanceDisplay;
