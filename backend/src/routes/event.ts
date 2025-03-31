import express, { Request } from 'express';
import eventServices from '../services/eventServices.ts';
import { EventDetailsType } from '../db/schema.ts';

const router = express.Router();

router.get('/', async (_req, resp) => {
  const data = await eventServices.allEvents();
  resp.json(data);
});

router.get('/images', async (req, resp) => {
  const data = await eventServices.eventImages();

  resp.json(data);
});

router.put(
  '/:id',
  async (req: Request<{ id: string }, unknown, EventDetailsType>, resp) => {
    const { id } = req.params;
    const event = req.body;
    const data = await eventServices.updateEvent(id, event);
    resp.json(data);
  }
);

export default router;
