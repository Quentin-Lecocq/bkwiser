import express from 'express';
import cors from 'cors';
import { syncDb } from '../db';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/bankroll', async (_, res) => {
  const data = await syncDb();
  res.json(data);
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
