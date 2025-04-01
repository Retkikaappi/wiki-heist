import express, { Request } from 'express';
import monsterService from '../services/monsterServices.ts';
import { MonstersTableType } from '../db/schema.ts';
const router = express.Router();

router.get('/', async (_req, resp) => {
  const data = await monsterService.allMonsters();
  resp.json(data);
});

router.get('/images', async (_req, resp) => {
  const data = await monsterService.allImages();
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

router.put(
  '/:id',
  async (req: Request<{ id: string }, unknown, MonstersTableType>, resp) => {
    const { id } = req.params;
    const monster = req.body;
    const data = await monsterService.updateMonster(id, monster);
    resp.json(data);
  }
);

export default router;
