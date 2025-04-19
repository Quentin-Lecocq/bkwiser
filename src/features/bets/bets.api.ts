import { Bet } from './bets.types';

/**
 * Fetch all bets from the server.
 * @returns {Promise<Bet[]>} - A promise that resolves to an array of bets.
 */
export async function getBetsDB(): Promise<Bet[]> {
  const res = await fetch('http://localhost:3001/bets');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data;
}

/**
 * Create a new bet.
 * @param {Omit<Bet, 'id' | 'netResult' | 'createdAt' | 'updatedAt'>} betData - The data for the new bet.
 * @returns {Promise<Bet>} - The created bet.
 */
export async function createBetDB(
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

export async function deleteBetDB(id: string) {
  const response = await fetch(`http://localhost:3001/bets/${id}/delete`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete bet');
  }

  return response.json();
}
