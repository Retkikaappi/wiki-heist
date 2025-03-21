import express, { NextFunction, Request, Response } from 'express';
import monsterRouter from './routes/monster.ts';
import eventRouter from './routes/event.ts';
import loginRouter from './routes/login.ts';
import itemRouter from './routes/item.ts';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.use((req: Request, resp: Response, next: NextFunction) => {
  console.log(`path: ${req.url}, body`, req.body);
  next();
});

app.get('/api/test', (_req, resp) => {
  resp.send('working');
});

app.use(express.static('dist'));

app.use('/api/monsters', monsterRouter);
app.use('/api/events', eventRouter);
app.use('/api/login', loginRouter);
app.use('/api/items', itemRouter);

app.use('*', (_req, resp) => {
  resp.redirect('/');
});

app.listen(PORT, () => {
  console.log('server running on', PORT);
});
