import { Bet } from './bets.types';

export async function createBet(
  betData: Omit<Bet, 'id' | 'netResult' | 'createdAt' | 'updatedAt'>,
) {
  const response = await fetch('http://localhost:3001/bets/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(betData),
  });

  if (!response.ok) {
    throw new Error('Failed to create bet');
  }

  return response.json();
}
