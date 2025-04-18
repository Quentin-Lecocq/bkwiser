import { useForm } from '@tanstack/react-form';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  getDefaultBetOutcome,
  getDefaultBetType,
  outcomeOptions,
} from '../bets.constants';
import { useCreateBetMutation } from '../bets.mutations';
import { Outcome } from '../bets.types';

const SingleBetForm: FC = () => {
  const { mutate: createBet } = useCreateBetMutation();

  const form = useForm({
    defaultValues: {
      stake: 0,
      type: getDefaultBetType(),
      date: new Date().toISOString().split('T')[0],
      outcome: getDefaultBetOutcome(),
      bookmaker: '',
      label: '',
      odds: 0,
    },
    onSubmit: async ({ value }) => {
      const { label, odds, outcome } = value;

      const payload = {
        id: uuidv4(),
        ...value,
        legs: [
          {
            id: uuidv4(),
            label,
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
        name="label"
        children={(field) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="label">Label</label>
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
              onChange={(e) => field.handleChange(e.target.value as Outcome)}
            >
              {outcomeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt[0].toUpperCase() + opt.slice(1)}
                </option>
              ))}
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
