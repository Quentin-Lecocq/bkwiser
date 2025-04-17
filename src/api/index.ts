import express from 'express';
import cors from 'cors';
import bankrollRoutes from './routes/bankroll.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/bankroll', bankrollRoutes);

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
