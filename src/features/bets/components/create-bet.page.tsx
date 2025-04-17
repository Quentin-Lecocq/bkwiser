import { useState } from 'react';
import { BetType } from '../bets.types';
import ComboBetForm from './combo-bet-form';
import SingleBetForm from './single-bet-form';

const CreateBetPage = () => {
  const [betType, setBetType] = useState<BetType>('single');

  function handleFormTypeChange(type: BetType) {
    setBetType(type);
  }

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
      <form>
        <label>
          <input
            type="radio"
            name="betType"
            value="single"
            checked={betType === 'single'}
            onChange={() => handleFormTypeChange('single')}
          />
          Single Bet
        </label>
        <label>
          <input
            type="radio"
            name="betType"
            value="multiple"
            checked={betType === 'combo'}
            onChange={() => handleFormTypeChange('combo')}
          />
          Multiple Bet
        </label>
      </form>
      {betType === 'single' && <SingleBetForm />}
      {betType === 'combo' && <ComboBetForm />}
    </main>
  );
};

export default CreateBetPage;
