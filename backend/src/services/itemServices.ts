import db from '../db/index.ts';
import { itemTable } from '../db/schema.ts';

const allItems = async () => {
  try {
    const data = await db.query.itemTable.findMany();
    return data;
  } catch (error) {
    console.log('Allevents', error);
    return;
  }
};

const someItems = async () => {
  try {
    const data = await db.select().from(itemTable).limit(50);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export default { allItems, someItems };
