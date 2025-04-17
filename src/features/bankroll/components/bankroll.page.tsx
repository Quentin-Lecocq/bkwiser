import BalanceDisplay from './balance-display';
import { DepositForm } from './deposit-form';
import ResetBankroll from './reset-bankroll';

export default function BankrollPage() {
  return (
    <main
      style={{
        padding: '1rem',
      }}
    >
      <h1>Bankroll</h1>
      <BalanceDisplay />
      <DepositForm />
      <ResetBankroll />
    </main>
  );
}
