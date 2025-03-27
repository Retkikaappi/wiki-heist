import { UseQueryResult } from '@tanstack/react-query';

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

export type MonsterData = {
  id: number;
  name: string;
  link: string;
  img: string;
  rank: string;
  appearsOn: string;
};

export type MonsterContext = {
  monsters: UseQueryResult<MonsterData[], Error>;
  monsterImages: UseQueryResult<MonsterImage[], Error>;
  prefetchMonster: (monsterName: string) => void;
};

export type MonsterImage = {
  name: string;
  img: string;
};

export type EventData = {
  img: string;
  description: string;
  functions: string[];
  name: string;
};

export type DataDisplay = UseQueryResult<
  EventData[] | EventByDay[] | MonsterData[] | MonsterImage[]
>;

export type LoginResponse = {
  token: string;
};

export type UserContextInit = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

export type itemsDataNew = {
  id: number;
  name: string;
  img: string;
  effect: string;
  cooldown: string;
  ammo: string;
  types: string;
  size: string;
  hero: string;
};
