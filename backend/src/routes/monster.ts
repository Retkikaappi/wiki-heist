import express from 'express';
import monsterService from '../services/monsterServices.ts';
const router = express.Router();

await monsterService.loadMonsterData();

router.get('/', (_req, resp) => {
  const data = monsterService.allMonsters();
  resp.json(data);
});

router.get('/images', (_req, resp) => {
  const data = monsterService.allImages();
  resp.json(data);
});

router.get('/:monsterName', (req, resp) => {
  const { monsterName } = req.params;
  console.log(monsterName);
  if (!monsterName) {
    resp.status(400).json({ error: 'malformed params' });
  }
  const data = monsterService.singleMonster(monsterName);
  resp.json(data);
});

export default router;
