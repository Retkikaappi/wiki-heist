import express from 'express';
import eventServices from '../services/eventServices.ts';
import db from '../db/index.ts';

const router = express.Router();

await eventServices.loadEventData();

router.get('/', (_req, resp) => {
  const data = eventServices.allEvents();
  resp.json(data);
});

router.get('/test', async (req, resp) => {
  const data = await db.query.eventsTable.findMany();

  resp.json(data);
});

router.get('/test2', async (req, resp) => {
  const data = await db.query.eventDetailsTable.findMany();
  const mappedData = data.map((e) => ({
    ...e,
    functions: e.functions.split('--'),
  }));
  resp.json(mappedData);
});

export default router;
