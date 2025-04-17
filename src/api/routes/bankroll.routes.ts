import crypto from 'crypto';
import { Request, Response, Router } from 'express';
import { dbInstance, syncDb } from '../../db';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const data = await syncDb();
  res.json(data);
});

router.post('/deposit', async (req: Request, res: Response) => {
  const { amount } = req.body;
  const data = await syncDb();

  const now = new Date();

  const newDeposit = {
    id: crypto.randomUUID(),
    amount,
    date: now.toISOString(),
  };

  if (!data.deposits) {
    data.deposits = [];
  }
  data.deposits.push(newDeposit);
  data.bankroll += amount;

  await dbInstance.write();

  res.status(201).json({
    message: 'Deposit added successfully',
    deposit: newDeposit,
    bankroll: data.bankroll,
  });
});

router.post('/withdraw', async (req: Request, res: Response) => {
  const { amount } = req.body;
  const data = await syncDb();
  const now = new Date();

  if (amount > data.bankroll) {
    res.status(400).json({
      message: 'Withdrawal amount exceeds available bankroll',
    });
    return;
  }

  const newWithdraw = {
    id: crypto.randomUUID(),
    amount,
    date: now.toISOString(),
  };
  if (!data.withdraws) {
    data.withdraws = [];
  }

  data.withdraws.push(newWithdraw);
  data.bankroll -= amount;
  await dbInstance.write();

  res.status(201).json({
    message: 'Withdrawal added successfully',
    withdraw: newWithdraw,
    bankroll: data.bankroll,
  });
});

router.delete('/', async (_req: Request, res: Response) => {
  const data = await syncDb();
  data.bankroll = 0;
  data.deposits = [];
  data.withdraws = [];
  await dbInstance.write();
  res.status(204).send();
});

export default router;
