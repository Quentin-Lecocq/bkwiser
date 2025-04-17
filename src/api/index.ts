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
  console.log('Received request to add deposit:', req.body);
  const { amount } = req.body;
  const data = await syncDb();
  console.log({ data });

  const now = new Date();

  const newDeposit = {
    id: crypto.randomUUID(),
    amount,
    date: now.toISOString(),
  };

  // doesnt work, deposits is undefined
  if (!data.deposits) {
    data.deposits = [];
  }
  data.deposits.push(newDeposit);
  console.log(data.deposits);
  data.bankroll += amount;

  await dbInstance.write();

  res.status(201).json({
    message: 'Deposit added successfully',
    deposit: newDeposit,
    bankroll: data.bankroll,
  });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
