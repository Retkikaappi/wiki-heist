import { eq } from 'drizzle-orm';
import db from '../db/index.ts';
import { monstersTable, MonstersTableType } from '../db/schema.ts';

type SkillData = {
  sprite: string;
  name: string;
  effects: string;
  startingTier: string;
  types: string;
};

type itemsData = {
  sprite: string;
  name: string;
  effects: string;
  cooldown: string;
  ammo: string;
  types: string;
  size: string;
};

export type MonsterInfo = {
  name: string;
  link: string;
  image: string;
  skills: SkillData[];
  items: itemsData[];
};

const allImages = async () => {
  const data = await db.query.monstersTable.findMany({
    columns: {
      name: true,
      img: true,
    },
  });

  return data;
};

const allMonsters = async () => {
  const data = await db.query.monstersTable.findMany();
  return data;
};

const singleMonster = async (name: string) => {
  const monster = await db.query.monsterDetailsTable.findFirst({
    where: (monsterDetailsTable, { eq }) => eq(monsterDetailsTable.name, name),
    with: { monsterSkills: true, monsterItems: true },
  });

  return monster;
};

const updateMonster = async (
  id: string,
  { link, name, img, rank, appearsOn }: MonstersTableType
) => {
  const data = await db
    .update(monstersTable)
    .set({ link, name, img, rank, appearsOn })
    .where(eq(monstersTable.id, Number(id)))
    .returning({ updatedMonster: monstersTable.id });
  return data;
};

export default {
  allMonsters,
  singleMonster,
  allImages,
  updateMonster,
};
