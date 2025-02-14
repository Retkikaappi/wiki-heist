import express from 'express';
import eventServices from '../services/eventServices.ts';

const router = express.Router();

await eventServices.loadEventData();

router.get('/', (_req, resp) => {
  const data = eventServices.allEvents();
  resp.json(data);
});

export default router;
