import { MonsterData, MonsterInfo } from '../types';

const baseUrl = '/api/monsters';
export const getSingleMonster = async (name: string): Promise<MonsterInfo> => {
  const resp = await fetch(`${baseUrl}/${name}`);
  return resp.json();
};

export const getAllMonsters = async (): Promise<MonsterData[]> => {
  const resp = await fetch(baseUrl);
  return resp.json();
};

export const getMonsterImages = async (): Promise<
  {
    name: string;
    img: string;
  }[]
> => {
  const resp = await fetch(`${baseUrl}/images`);

  return resp.json();
};
