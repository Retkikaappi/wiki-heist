import { itemsDataNew } from '../types';

const baseUrl = '/api/items';

export const getItems = async (): Promise<itemsDataNew[]> => {
  const resp = await fetch(baseUrl);

  return resp.json();
};

export const getSomeItems = async (): Promise<itemsDataNew[]> => {
  const resp = await fetch(`${baseUrl}/some`);
  return resp.json();
};

export const getTypes = async (): Promise<string[]> => {
  const resp = await fetch(`${baseUrl}/types`);
  return resp.json();
};

export const searchWithType = async (type: string): Promise<itemsDataNew[]> => {
  const resp = await fetch(`${baseUrl}/types/${type}`);
  return resp.json();
};

export const searchWithName = async (name: string): Promise<itemsDataNew[]> => {
  const resp = await fetch(`${baseUrl}/search/${name}`);
  return resp.json();
};
