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
  betData: Omit<Bet, 'id' | 'netResult' | 'createdAt' | 'updatedAt' | 'gain'>,
) {
  const res = await fetch('http://localhost:3001/bets/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(betData),
  });

  if (!res.ok) {
    throw new Error('Failed to create bet');
  }

  return res.json();
}

/**
 * Delete a bet by its ID.
 * @param {string} id - The ID of the bet to delete.
 * @returns {Promise<{ message: string, deleted: boolean }>} - The response message and deletion status.
 * @throws {Error} - If the deletion request fails.
 */
export async function deleteBetDB(id: string) {
  const res = await fetch(`http://localhost:3001/bets/${id}/delete`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete bet');
  }

  return res.json();
}

/**
 * Update an existing bet by its ID.
 * @param {string} id - The ID of the bet to update.
 * @param {Partial<Bet>} updatedData - The fields to update on the bet.
 * @returns {Promise<Bet>} - The updated bet.
 * @throws {Error} - If the update request fails.
 */
export async function updateBetDB(id: string, updatedData: Partial<Bet>) {}

export async function getBetByIdDB(id: string): Promise<Bet> {
  const response = await fetch(`http://localhost:3001/bets/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch bet ${id}`);
  }

  const res = await response.json();
  return res.bet;
}
