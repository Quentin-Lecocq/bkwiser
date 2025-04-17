import CreateBetForm from './create-bet-form';

const BetsPage = () => {
  return (
    <main
      style={{
        padding: '1rem',
      }}
    >
      <h1>Bets</h1>
      <CreateBetForm />
    </main>
  );
};

export default BetsPage;
