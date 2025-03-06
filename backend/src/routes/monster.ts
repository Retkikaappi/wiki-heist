import express from 'express';
import monsterService from '../services/monsterServices.ts';
const router = express.Router();
import db from '../db/index.ts';

router.get('/', async (_req, resp) => {
  const data = await monsterService.allMonsters();
  resp.json(data);
});

router.get('/images', async (_req, resp) => {
  const data = await monsterService.allImages();
  resp.json(data);
});

router.get('/details', async (req, resp) => {
  const data = await db.query.monstersTable.findMany();

  resp.json(data);
});

router.get('/:monsterName', async (req, resp) => {
  const { monsterName } = req.params;

  if (!monsterName) {
    resp.status(400).json({ error: 'malformed params' });
    return;
  }
  const data = await monsterService.singleMonster(monsterName);
  if (data === null) {
    resp.status(400).json({ error: 'Could not find details' });
    return;
  }
  resp.json(data);
});

export default router;
