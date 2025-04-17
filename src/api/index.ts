import express, { Request, Response } from 'express';
import cors from 'cors';
import { dbInstance, syncDb } from '../db';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/bankroll', async (_, res) => {
  const data = await syncDb();
  res.json(data);
});

app.post('/bankroll', async (req: Request, res: Response) => {
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

app.delete('/bankroll', async (_, res) => {
  const data = await syncDb();
  data.bankroll = 0;
  data.deposits = [];
  await dbInstance.write();
  res.status(204).send();
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
