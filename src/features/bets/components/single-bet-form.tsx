import { useForm } from '@tanstack/react-form';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCreateSingleBetMutation } from '../bets.mutations';

const SingleBetForm: FC = () => {
  const { mutate: createBet } = useCreateSingleBetMutation();

  const form = useForm({
    defaultValues: {
      stake: 0,
      type: 'single' as const,
      date: new Date().toISOString().split('T')[0],
      outcome: 'pending',
      bookmaker: '',
      description: '',
      odds: 0,
    },
    onSubmit: async ({ value }) => {
      const { description, odds, outcome } = value;

      const payload = {
        id: uuidv4(),
        ...value,
        legs: [
          {
            id: uuidv4(),
            description,
            odds,
            outcome,
          },
        ],
      };

      createBet({ bet: payload });
      form.reset();
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.handleSubmit();
  }

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: '0 auto',
      }}
      onSubmit={handleSubmit}
    >
      <form.Field
        name="stake"
        children={(field) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="stake">Stake</label>
            <input
              type="number"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
          </div>
        )}
      />
      <form.Field
        name="date"
        children={(field) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      />
      <form.Field
        name="odds"
        children={(field) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="odds">Odds</label>
            <input
              type="number"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
          </div>
        )}
      />
      <form.Field
        name="description"
        children={(field) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      />

      <form.Field
        name="outcome"
        children={(field) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="outcome">Outcome</label>
            <select
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            >
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        )}
      />
      <form.Field
        name="bookmaker"
        children={(field) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="bookmaker">Bookmaker</label>
            <input
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      />
      <button type="reset" onClick={() => form.reset()}>
        Reset
      </button>
      <button type="submit">Create Bet</button>
    </form>
  );
};

export default SingleBetForm;
