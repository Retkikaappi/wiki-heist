import { ilike, notLike, asc, eq } from 'drizzle-orm';
import db from '../db/index.ts';
import { ItemsTableType, itemTable } from '../db/schema.ts';

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

const types = async () => {
  const data = await db
    .selectDistinct({ types: itemTable.types })
    .from(itemTable)
    .where(notLike(itemTable.types, '%,%'))
    .orderBy(asc(itemTable.types));

  return data.map((e) => e.types);
};

const withType = async (type: string) => {
  const data = await db
    .select()
    .from(itemTable)
    .where(ilike(itemTable.types, `%${type}%`));

  return data;
};

const withName = async (name: string) => {
  const data = await db
    .select()
    .from(itemTable)
    .where(ilike(itemTable.name, `%${name}%`));
  return data;
};

const updateItem = async (
  id: string,
  { name, img, effect, cooldown, ammo, types, size, hero }: ItemsTableType
) => {
  const data = await db
    .update(itemTable)
    .set({ name, img, effect, cooldown, ammo, types, size, hero })
    .where(eq(itemTable.id, Number(id)))
    .returning({ updatedItem: itemTable.id });
  return data;
};
export default { allItems, someItems, types, withType, withName, updateItem };
