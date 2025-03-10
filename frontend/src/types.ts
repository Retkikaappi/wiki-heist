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

export type itemsData = {
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
  img: string;
  boardImage: string;
  monsterSkills: SkillData[];
  monsterItems: itemsData[];
};

export type EventByDay = {
  name: string;
  rarity: string;
  img: string;
  isHeroEvent: string;
};

export type EventData = {
  img: string;
  description: string;
  functions: string[];
  name: string;
};
