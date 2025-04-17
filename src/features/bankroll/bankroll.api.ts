/**
 * Fetches the current bankroll amount.
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
 * Adds a deposit to the bankroll.
 * @param {number} amount - The amount to add to the bankroll.
 * @returns {Promise<void>}
 */
export async function addDeposit(amount: number): Promise<void> {
  const res = await fetch('http://localhost:3001/bankroll/deposit', {
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

/**
 * Adds a withdrawal to the bankroll.
 * @param {number} amount - The amount to withdraw from the bankroll.
 * @returns {Promise<void>}
 */
export async function addWithdraw(amount: number): Promise<void> {
  const res = await fetch('http://localhost:3001/bankroll/withdraw', {
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

/**
 * Resets the bankroll to its initial state.
 * @returns {Promise<void>}
 */
export async function resetBankroll() {
  const res = await fetch('http://localhost:3001/bankroll', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
}
