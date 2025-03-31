import { eq } from 'drizzle-orm';
import db from '../db/index.ts';
import { eventDetailsTable, EventDetailsType } from '../db/schema.ts';

const allEvents = async () => {
  try {
    const data = await db.query.eventDetailsTable.findMany();
    const mappedData = data.map((e) => ({
      ...e,
      functions: e.functions.split('--'),
    }));
    return mappedData;
  } catch (error) {
    console.log('Allevents', error);
    return;
  }
};

const eventImages = async () => {
  try {
    const data = await db.query.eventsTable.findMany();
    return data;
  } catch (error) {
    console.log('Eventimages', error);
    return;
  }
};

const updateEvent = async (
  id: string,
  { name, img, description, functions }: EventDetailsType
) => {
  try {
    const data = await db
      .update(eventDetailsTable)
      .set({ name, img, description, functions })
      .where(eq(eventDetailsTable.id, Number(id)));
    return data;
  } catch (error) {
    console.log('update error', error);
  }
};

export default { allEvents, eventImages, updateEvent };
