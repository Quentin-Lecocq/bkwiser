import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { dbInstance, syncDb } from '../../db';

export const legSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  odds: z.number().positive(),
  outcome: z.enum(['win', 'lose', 'pending', 'void']),
});

export const betSchema = z.object({
  id: z.string().uuid(),
  stake: z.number().positive(),
  type: z.enum(['single', 'combo']),
  date: z.string(),
  outcome: z.enum(['won', 'lost', 'pending', 'void']),
  description: z.string(),
  bookmaker: z.string().optional(),
  odds: z.number().positive(),
  legs: z.array(legSchema).min(1),
});

const router = Router();

router.post('/new', async (req: Request, res: Response) => {
  const result = betSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Invalid bet data',
      errors: result.error.errors,
    });
    return;
  }
  const newBet = result.data;

  const data = await syncDb();

  if (!data.bets) {
    data.bets = [];
  }
  data.bets.push(newBet);
  await dbInstance.write();

  res.status(201).json({
    message: 'Bet added successfully',
    bet: newBet,
  });
});

export default router;
