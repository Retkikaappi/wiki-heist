import { eq } from 'drizzle-orm';
import db from '../db/index.ts';
import {
  monsterDetailsTable,
  monsterItems,
  monsterSkills,
} from '../db/schema.ts';

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
  const monster = await db
    .select()
    .from(monsterDetailsTable)
    .where(eq(monsterDetailsTable.name, name));

  if (monster.length === 0) {
    return null;
  }
  const monsterId = monster[0].id;
  const skills = await db
    .select()
    .from(monsterSkills)
    .where(eq(monsterSkills.monsterId, monsterId));
  const items = await db
    .select()
    .from(monsterItems)
    .where(eq(monsterItems.monsterId, monsterId));

  return {
    ...monster[0],
    skills,
    items,
  };
};

export default {
  allMonsters,
  singleMonster,
  allImages,
};
