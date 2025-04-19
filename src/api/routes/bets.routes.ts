import { Request, Response, Router } from 'express';
import { dbInstance, syncDb } from '../../db';
import {
  Bet,
  betSchema,
  deleteBetSchema,
  getBetSchemaParams,
} from '../schemas/bets.schema';
import {
  applyBetImpactOnBankroll,
  computeBetOutcome,
  computeGainAndProfit,
  updateBankrollOnBetEdit,
} from '../services/bets.service';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const data = await syncDb();
  res.json(data.bets || []);
});

router.get('/:id', async (req: Request, res: Response) => {
  const result = getBetSchemaParams.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({
      message: 'Invalid ID',
      error: result.error.errors,
    });
    return;
  }

  const { id } = result.data;

  const data = await syncDb();

  const bet = data.bets.find((bet: Bet) => bet.id === id);

  if (!bet) {
    res.status(404).json({
      message: 'Bet not found',
    });
    return;
  }

  res.status(200).json({
    message: 'Bet fetched successfully',
    data: bet,
  });
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
  const impact = applyBetImpactOnBankroll(newBet);
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
  const betToDelete = data.bets.find((bet: Bet) => bet.id === id);

  if (!betToDelete) {
    res.status(404).json({
      message: 'Bet not found',
    });
    return;
  }

  const impact = applyBetImpactOnBankroll(betToDelete);
  data.bankroll -= impact;

  const initialLength = data.bets.length;

  data.bets = data.bets.filter((bet: Bet) => bet.id !== id);
  await dbInstance.write();

  res.status(200).json({
    message: 'Bet deleted successfully',
    deleted: initialLength !== data.bets.length,
  });
});

router.patch('/:id', async (req: Request, res: Response) => {
  const result = betSchema.safeParse({ ...req.body, id: req.params.id });

  if (!result.success) {
    res.status(400).json({
      message: 'Invalid data',
      error: result.error.errors,
    });
    return;
  }

  const data = await syncDb();
  const index = data.bets.findIndex((b: Bet) => b.id === result.data.id);

  if (index === -1) {
    res.status(404).json({ message: 'Bet not found' });
    return;
  }

  const oldBet = data.bets[index];

  const outcome = computeBetOutcome(result.data.legs);
  const { gain, profit } = computeGainAndProfit(
    result.data.odds,
    result.data.stake,
    outcome,
  );

  const updatedBet: Bet = {
    ...oldBet,
    ...result.data,
    outcome,
    gain,
    profit,
    updatedAt: new Date(),
  };

  data.bankroll = updateBankrollOnBetEdit(data.bankroll, oldBet, updatedBet);

  data.bets[index] = updatedBet;
  await dbInstance.write();

  res.status(200).json({
    message: 'Bet updated successfully',
    bet: updatedBet,
  });
});

export default router;
