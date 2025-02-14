import express from 'express';
import monsterRouter from './routes/monster.ts';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.get('/api/test', (_req, resp) => {
  resp.send('working');
});

app.use(express.static('dist'));

app.use('/api/monsters', monsterRouter);

app.use('*', (_req, resp) => {
  resp.redirect('/');
});

app.listen(PORT, () => {
  console.log('server running on', PORT);
});
