import { useForm } from '@tanstack/react-form';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FC, FormEvent } from 'react';
import { z } from 'zod';
import { useWithdrawMutation } from '../bankroll.mutations';
import { bankrollQueryOptions } from '../bankroll.queries';
import { isWithdrawalValid } from '../bankroll.services';

const WithdrawalForm: FC = () => {
  const { data: bankroll } = useSuspenseQuery(bankrollQueryOptions);
  const { mutate: addWithdraw } = useWithdrawMutation();

  const form = useForm({
    defaultValues: {
      amount: 0,
    },
    validators: {
      onChange: z.object({
        amount: z.number().min(1, 'Deposit amount must be greater than 0'),
      }),
      onBlur: z.object({
        amount: z.number().min(1, 'Deposit amount must be greater than 0'),
      }),
      onSubmitAsync: async ({ value }) => {
        if (!isWithdrawalValid(bankroll, value.amount)) {
          return {
            fields: {
              amount: `You can't withdraw more than ${bankroll}€`,
            },
          };
        }

        return null;
      },
    },
    onSubmit: async (values) => {
      const { amount } = values.value;
      addWithdraw({ amount });
      form.reset();
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.handleSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <form.Field
        name="amount"
        children={(field) => (
          <>
            <input
              type="number"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
            {field.state.meta.errors.length > 0 ? (
              <em role="alert">{field.state.meta.errors.join(', ')}</em>
            ) : null}
          </>
        )}
      />
      <button type="submit">Withdraw</button>
    </form>
  );
};

export default WithdrawalForm;
