import { Request, Response, Router } from 'express';
import { dbInstance, syncDb } from '../../db';
import { betSchema } from '../schemas/bets.schema';
import {
  computeBetOutcome,
  computeGainAndProfit,
} from '../services/bets.service';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const data = await syncDb();
  res.json(data.bets || []);
});

router.post('/new', async (req: Request, res: Response) => {
  const result = betSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Invalid bet data',
      errors: result.error.errors,
    });
    return;
  }

  const { gain, profit } = computeGainAndProfit(
    result.data.odds,
    result.data.stake,
    computeBetOutcome(result.data.legs),
  );

  const newBet = {
    ...result.data,
    id: crypto.randomUUID(),
    outcome: computeBetOutcome(result.data.legs),
    gain,
    profit,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

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
