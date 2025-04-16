import BalanceDisplay from './balance-display';

export default function BankrollPage() {
  return (
    <main
      style={{
        padding: '1rem',
      }}
    >
      <h1>Bankroll</h1>
      <BalanceDisplay />
    </main>
  );
}
