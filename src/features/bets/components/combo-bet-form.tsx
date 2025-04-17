import { useForm } from '@tanstack/react-form';
import { FC, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ComboBetForm: FC = () => {
  const form = useForm({
    defaultValues: {
      stake: 0,
      type: 'combo',
      date: new Date().toISOString().split('T')[0],
      outcome: 'pending',
      bookmaker: '',
      legs: [
        {
          id: uuidv4(),
          description: '',
          odds: 1,
          result: 'pending',
        },
      ],
    },
    onSubmit: async ({ value }) => {
      const totalOdds = value.legs.reduce((acc, leg) => acc * leg.odds, 1);

      const payload = {
        ...value,
        odds: Number(totalOdds.toFixed(2)),
      };

      console.log('Submitting combo bet:', payload);
      form.reset();
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.handleSubmit();
  }

  return (
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
                  <label>Description</label>
                  <input
                    type="text"
                    value={leg.description}
                    onChange={(e) => {
                      const next = [...field.state.value];
                      next[index].description = e.target.value;
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

                {/* Résultat */}
                <div>
                  <label>Résultat</label>
                  <select
                    value={leg.result}
                    onChange={(e) => {
                      const next = [...field.state.value];
                      next[index].result = e.target.value as any;
                      field.handleChange(next);
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                    <option value="void">Void</option>
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

            <button
              type="button"
              onClick={() =>
                field.handleChange([
                  ...field.state.value,
                  {
                    id: uuidv4(),
                    description: '',
                    odds: 1,
                    result: 'pending',
                  },
                ])
              }
            >
              + Ajouter une sélection
            </button>
          </>
        )}
      </form.Field>

      <button type="reset" onClick={() => form.reset()}>
        Reset
      </button>
      <button type="submit">Create Combo Bet</button>
    </form>
  );
};

export default ComboBetForm;
