import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useDepositMutation } from '../bankroll.mutations';
import { FormEvent } from 'react';

export function DepositForm() {
  const { mutate: addDeposit } = useDepositMutation();

  const form = useForm({
    defaultValues: {
      amount: 0,
    },
    validators: {
      onChange: z.object({
        amount: z.number().min(1, 'Deposit amount must be greater than 0'),
      }),
    },
    onSubmit: async (values) => {
      const { amount } = values.value;
      addDeposit({ amount });
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
          </>
        )}
      />
      <button type="submit">Deposit</button>
    </form>
  );
}
