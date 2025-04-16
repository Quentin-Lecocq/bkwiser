export async function fetchBankroll() {
  const res = await fetch('http://localhost:3001/bankroll');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data.bankroll;
}
