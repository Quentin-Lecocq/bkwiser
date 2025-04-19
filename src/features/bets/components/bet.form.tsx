import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { FC, FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDefaultBetOutcome, outcomeOptions } from '../bets.constants';
import { useCreateBetMutation, useUpdateBetMutation } from '../bets.mutations';
import { transformBetToFormValues } from '../bets.services';
import { Bet, BetType, Outcome } from '../bets.types';

interface BetFormProps {
  mode?: 'create' | 'edit';
  bet?: Bet;
}

const BetForm: FC<BetFormProps> = ({ mode, bet }) => {
  const [betType, setBetType] = useState<BetType>('single');
  const navigate = useNavigate();
  const { mutate: createBet } = useCreateBetMutation();
  const { mutate: updateBet } = useUpdateBetMutation();

  const form = useForm({
    defaultValues: bet
      ? transformBetToFormValues(bet)
      : {
          stake: 0,
          type: 'single' as BetType,
          date: new Date().toISOString().split('T')[0],
          outcome: getDefaultBetOutcome(),
          bookmaker: '',
          legs: [
            {
              id: uuidv4(),
              label: '',
              odds: 1,
              outcome: getDefaultBetOutcome(),
            },
          ],
        },
    onSubmit: async ({ value }) => {
      const totalOdds = value.legs.reduce((acc, leg) => acc * leg.odds, 1);

      const payload = {
        id: mode === 'edit' && bet?.id ? bet.id : uuidv4(),
        ...value,
        odds: Number(totalOdds.toFixed(2)),
      };

      if (mode === 'edit' && bet?.id) {
        await updateBet({
          id: bet.id,
          originalBet: bet,
          updatedValues: payload,
        });
        form.reset();
        navigate({ to: '/bets' });
      } else {
        await createBet({
          bet: payload,
        });
        form.reset();
      }
    },
  });

  useEffect(() => {
    if (mode === 'edit') {
      return;
    }

    if (betType === 'single' && form.state.values.legs.length > 1) {
      form.setFieldValue('legs', [form.state.values.legs[0]]);
    }
  }, [betType]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.handleSubmit();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <form.Field name="type">
          {(field) => (
            <div>
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={field.state.value}
                onChange={(e) => {
                  const value = e.target.value as BetType;
                  field.handleChange(value);
                  setBetType(value);
                }}
              >
                <option value="single">Single</option>
                <option value="combo">Combo</option>
              </select>
            </div>
          )}
        </form.Field>
        <form.Field name="stake">
          {(field) => (
            <div>
              <label>Stake</label>
              <input
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="date">
          {(field) => (
            <div>
              <label>Date</label>
              <input
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="bookmaker">
          {(field) => (
            <div>
              <label>Bookmaker</label>
              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
        <form.Field name="legs" mode="array">
          {(field) => (
            <>
              {field.state.value.map((leg, index) => (
                <div
                  key={leg.id}
                  style={{
                    border: '1px solid #ccc',
                    padding: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div>
                    <label>Label</label>
                    <input
                      type="text"
                      value={leg.label}
                      onChange={(e) => {
                        const next = [...field.state.value];
                        next[index].label = e.target.value;
                        field.handleChange(next);
                      }}
                    />
                  </div>

                  <div>
                    <label>Odds</label>
                    <input
                      type="number"
                      value={leg.odds}
                      onChange={(e) => {
                        const next = [...field.state.value];
                        next[index].odds = Number(e.target.value);
                        field.handleChange(next);
                      }}
                    />
                  </div>
                  <div>
                    <label>Outcome</label>
                    <select
                      value={leg.outcome}
                      onChange={(e) => {
                        const next = [...field.state.value];
                        next[index].outcome = e.target.value as Outcome;
                        field.handleChange(next);
                      }}
                    >
                      {outcomeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt[0].toUpperCase() + opt.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const next = field.state.value.filter(
                        (_, i) => i !== index,
                      );
                      field.handleChange(next);
                    }}
                  >
                    ❌ Supprimer
                  </button>
                </div>
              ))}

              {betType === 'combo' && (
                <button
                  type="button"
                  onClick={() =>
                    field.handleChange([
                      ...field.state.value,
                      {
                        id: uuidv4(),
                        label: '',
                        odds: 1,
                        outcome: getDefaultBetOutcome(),
                      },
                    ])
                  }
                >
                  + Ajouter une sélection
                </button>
              )}
            </>
          )}
        </form.Field>

        <button type="reset" onClick={() => form.reset()}>
          Reset
        </button>
        {mode === 'edit' ? (
          <button type="submit">Edit Bet</button>
        ) : (
          <button type="submit">
            {betType === 'single' ? 'Create Single Bet' : 'Create Combo Bet'}
          </button>
        )}
      </form>
    </>
  );
};

export default BetForm;
