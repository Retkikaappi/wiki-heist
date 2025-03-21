import express from 'express';
import itemServices from '../services/itemServices.ts';

const router = express.Router();

router.get('/', async (_req, resp) => {
  const data = await itemServices.allItems();
  resp.json(data);
});

router.get('/some', async (_req, resp) => {
  const data = await itemServices.someItems();
  resp.json(data);
});
export default router;
