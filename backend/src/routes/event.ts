import express from 'express';
import eventServices from '../services/eventServices.ts';

const router = express.Router();

router.get('/', async (_req, resp) => {
  const data = await eventServices.allEvents();
  resp.json(data);
});

router.get('/images', async (req, resp) => {
  const data = await eventServices.eventImages();

  resp.json(data);
});

export default router;
