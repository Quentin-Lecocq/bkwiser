import { FC } from 'react';

const CreateBetForm: FC = () => {
  return (
    <form>
      <label>
        Amount:
        <input type="number" name="amount" />
      </label>
      <label>
        Odds:
        <input type="number" name="odds" />
      </label>
      <button type="submit">Create Bet</button>
    </form>
  );
};

export default CreateBetForm;
