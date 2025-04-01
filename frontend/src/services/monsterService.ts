import { MonsterData, MonsterImage, MonsterInfo } from '../types';

const baseUrl = '/api/monsters';
export const getSingleMonster = async (name: string): Promise<MonsterInfo> => {
  const resp = await fetch(`${baseUrl}/${name}`);
  return resp.json();
};

export const getAllMonsters = async (): Promise<MonsterData[]> => {
  const resp = await fetch(baseUrl);
  return resp.json();
};

export const getMonsterImages = async (): Promise<MonsterImage[]> => {
  const resp = await fetch(`${baseUrl}/images`);

  return resp.json();
};

export const updateMonster = async (object: MonsterData) => {
  const resp = await fetch(`${baseUrl}/${object.id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(object),
  });
  return resp.json();
};
