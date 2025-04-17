/**
 *
 * @returns {Promise<number>} The current bankroll amount.
 */
export async function fetchBankroll(): Promise<number> {
  const res = await fetch('http://localhost:3001/bankroll');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data.bankroll;
}

/**
 * @param {number} amount - The amount to add to the bankroll.
 * @returns {Promise<void>}
 */
export async function addDeposit(amount: number): Promise<void> {
  const res = await fetch('http://localhost:3001/bankroll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
}
