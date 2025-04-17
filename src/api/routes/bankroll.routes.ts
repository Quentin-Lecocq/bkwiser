import { Router, Request, Response } from 'express';
import { dbInstance, syncDb } from '../../db';
import crypto from 'crypto';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const data = await syncDb();
  res.json(data);
});

router.post('/', async (req: Request, res: Response) => {
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

router.delete('/', async (_req: Request, res: Response) => {
  const data = await syncDb();
  data.bankroll = 0;
  data.deposits = [];
  await dbInstance.write();
  res.status(204).send();
});

export default router;
