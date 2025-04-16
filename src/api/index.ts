import express from 'express';
import cors from 'cors';
import db from './lowdb';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/bankroll', async (_, res) => {
  await db.read();
  res.json({ bankroll: db.data?.bankroll });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
