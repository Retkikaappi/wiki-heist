import express, { Request } from 'express';
import itemServices from '../services/itemServices.ts';
import { ItemsTableType } from '../db/schema.ts';

const router = express.Router();

router.get('/', async (_req, resp) => {
  const data = await itemServices.allItems();
  resp.json(data);
});

router.get('/some', async (_req, resp) => {
  const data = await itemServices.someItems();
  resp.json(data);
});

router.get('/types', async (_req, resp) => {
  const data = await itemServices.types();
  resp.json(data);
});

router.get('/types/:type', async (req, resp) => {
  const { type } = req.params;
  const data = await itemServices.withType(type);
  resp.json(data);
});

router.get('/search/:name', async (req, resp) => {
  const { name } = req.params;
  const data = await itemServices.withName(name);
  resp.json(data);
});

router.put(
  '/:id',
  async (req: Request<{ id: string }, unknown, ItemsTableType>, resp) => {
    const { id } = req.params;
    const item = req.body;
    const data = await itemServices.updateItem(id, item);
    resp.json(data);
  }
);
export default router;
