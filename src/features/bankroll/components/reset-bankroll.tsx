import { useBankrollResetMutation } from '../bankroll.mutations';

export default function ResetBankroll() {
  const { mutate: resetBankroll } = useBankrollResetMutation();
  return (
    <>
      <button onClick={() => resetBankroll()}>Reset bankroll</button>
    </>
  );
}
