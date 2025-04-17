import { FC } from 'react';
import BalanceDisplay from './balance-display';
import DepositForm from './deposit-form';
import ResetBankroll from './reset-bankroll';
import WithdrawalForm from './withdrawal-form';

const BankrollPage: FC = () => {
  return (
    <main
      style={{
        padding: '1rem',
      }}
    >
      <h1>Bankroll</h1>
      <BalanceDisplay />
      <DepositForm />
      <WithdrawalForm />
      <ResetBankroll />
    </main>
  );
};

export default BankrollPage;
