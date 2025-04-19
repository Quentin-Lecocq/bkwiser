import BetForm from './bet.form';

const CreateBetPage = () => {
  return (
    <main>
      <h3
        style={{
          textAlign: 'center',
          marginBottom: '1rem',
          fontSize: '1.5rem',
          color: '#333',
        }}
      >
        Create Bet
      </h3>
      <BetForm />
    </main>
  );
};

export default CreateBetPage;
