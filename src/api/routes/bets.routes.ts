import { Request, Response, Router } from 'express';
import { dbInstance, syncDb } from '../../db';
import { Bet, betSchema, deleteBetSchema } from '../schemas/bets.schema';
import {
  applyBetImpactOnBankroll,
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

  const outcome = computeBetOutcome(result.data.legs);
  const { gain, profit } = computeGainAndProfit(
    result.data.odds,
    result.data.stake,
    outcome,
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
  const impact = applyBetImpactOnBankroll(newBet, 'add');
  data.bankroll += impact;
  await dbInstance.write();

  res.status(201).json({
    message: 'Bet added successfully',
    bet: newBet,
  });
});

router.delete('/:id/delete', async (req: Request, res: Response) => {
  const result = deleteBetSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({
      message: 'Invalid ID',
      error: result.error.errors,
    });
    return;
  }

  const { id } = result.data;

  const data = await syncDb();
  const initialLength = data.bets.length;

  data.bets = data.bets.filter((bet: Bet) => bet.id !== id);
  await dbInstance.write();

  res.status(200).json({
    message: 'Bet deleted successfully',
    deleted: initialLength !== data.bets.length,
  });
});

export default router;
