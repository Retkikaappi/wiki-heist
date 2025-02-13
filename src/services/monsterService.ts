import { MonsterInfo } from '../types';

const baseUrl = 'http://localhost:3000/api/monsters';
export const getSingleMonster = async (name: string): Promise<MonsterInfo> => {
  const resp = await fetch(`${baseUrl}/${name}`);
  return resp.json();
};

export const getMonsterImages = async (): Promise<
  {
    name: string;
    image: string;
  }[]
> => {
  const resp = await fetch(`${baseUrl}/images`);
  return resp.json();
};
