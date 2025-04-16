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
