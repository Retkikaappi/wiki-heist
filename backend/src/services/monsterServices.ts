import fs from 'fs';
let monsterData: MonsterInfo[] | null = null;

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
  image: string;
  skills: SkillData[];
  items: itemsData[];
};

const loadMonsterData = async () => {
  if (monsterData === null) {
    try {
      const data = fs.readFileSync('./data/allMonsterData.json', 'utf-8');
      monsterData = (await JSON.parse(data)) as MonsterInfo[];
      console.log(monsterData.length);
    } catch (e) {
      console.log('Error loading data ', e);
    }
  }
  return monsterData;
};

const allMonsters = () => {
  return monsterData;
};

const singleMonster = (name: string) => {
  const monster = monsterData?.find((e) => e.name === name);
  return monster;
};

export default {
  allMonsters,
  singleMonster,
  loadMonsterData,
};
