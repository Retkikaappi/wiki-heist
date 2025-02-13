export type Day = {
  day: number;
  bronze: string[];
  silver: string[];
  gold: string[];
};

export type SkillData = {
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
