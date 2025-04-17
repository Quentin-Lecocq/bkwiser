import cors from 'cors';
import express from 'express';
import bankrollRoutes from './routes/bankroll.routes';
import betsRoutes from './routes/bets.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/bankroll', bankrollRoutes);
app.use('/bets', betsRoutes);

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
