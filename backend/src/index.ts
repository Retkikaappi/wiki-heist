import express, { NextFunction, Request, Response } from 'express';
import monsterRouter from './routes/monster.ts';
import eventRouter from './routes/event.ts';
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

app.use('*', (_req, resp) => {
  resp.redirect('/');
});

// async function testInsert() {
//   const jsonData = JSON.parse(
//     fs.readFileSync('./data/monsterDetails.json', 'utf-8')
//   ) as MonsterDetails;
//   try {
//     await db.insert(schema.monstersTable).values(jsonData);
//     console.log('inserted');
//   } catch (err) {
//     console.log(err);
//   }
// }
// await testInsert();

app.listen(PORT, () => {
  console.log('server running on', PORT);
});
