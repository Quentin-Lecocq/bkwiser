import { useSuspenseQuery } from '@tanstack/react-query';
import { bankrollQueryOptions } from '../bankroll.queries';

export default function BalanceDisplay() {
  const { data: bankroll } = useSuspenseQuery(bankrollQueryOptions);

  return (
    <>
      <p>{bankroll} euros</p>
    </>
  );
}
