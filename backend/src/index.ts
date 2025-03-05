import express from 'express';
import monsterRouter from './routes/monster.ts';
import eventRouter from './routes/event.ts';
import cors from 'cors';
import { DB_URL } from './utils/config.ts';
import { drizzle } from 'drizzle-orm/node-postgres';
import { monstersTable } from './db/schema.ts';
import fs from 'fs';
import { MonsterDetails } from '../scrapers/scraper.ts';
const app = express();
app.use(express.json());
app.use(cors());
console.log('main', DB_URL);
const PORT = 3000;

const db = drizzle(DB_URL);

app.get('/api/test', (_req, resp) => {
  resp.send('working');
});

app.use(express.static('dist'));

app.use('/api/monsters', monsterRouter);
app.use('/api/events', eventRouter);

app.use('*', (_req, resp) => {
  resp.redirect('/');
});

async function testInsert() {
  const jsonData = JSON.parse(
    fs.readFileSync('./data/monsterDetails.json', 'utf-8')
  ) as MonsterDetails;
  try {
    await db.insert(monstersTable).values(jsonData);
    console.log('inserted');
  } catch (err) {
    console.log(err);
  }
}
await testInsert();

app.listen(PORT, () => {
  console.log('server running on', PORT);
});
