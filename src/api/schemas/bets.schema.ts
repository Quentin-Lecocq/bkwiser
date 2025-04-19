import { z } from 'zod';

export const legSchema = z.object({
  id: z.string().uuid(),
  label: z.string(),
  odds: z.number().positive(),
  outcome: z.enum(['won', 'lost', 'pending', 'void']),
});

export const betSchema = z.object({
  id: z.string().uuid(),
  stake: z.number().positive(),
  type: z.enum(['single', 'combo']),
  date: z.string(),
  outcome: z.enum(['won', 'lost', 'pending', 'void']),
  bookmaker: z.string().optional(),
  odds: z.number().positive(),
  profit: z.number(),
  legs: z.array(legSchema).min(1),
});

export const deleteBetSchema = z.object({
  id: z.string().uuid(),
});

export type Bet = z.infer<typeof betSchema>;
export type BetLeg = z.infer<typeof legSchema>;
export type Outcome = 'won' | 'lost' | 'pending' | 'void';
export type BetType = 'single' | 'combo';
