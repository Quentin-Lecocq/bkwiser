import { FC } from 'react';
import { useBankrollResetMutation } from '../bankroll.mutations';

const ResetBankroll: FC = () => {
  const { mutate: resetBankroll } = useBankrollResetMutation();

  return (
    <>
      <button onClick={() => resetBankroll()}>Reset</button>
    </>
  );
};

export default ResetBankroll;
