import db from '../db/index.ts';

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

export default { allEvents, eventImages };
