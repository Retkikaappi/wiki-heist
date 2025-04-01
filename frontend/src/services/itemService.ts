import { ItemsDataNew } from '../types';

const baseUrl = '/api/items';

export const getItems = async (): Promise<ItemsDataNew[]> => {
  const resp = await fetch(baseUrl);

  return resp.json();
};

export const getSomeItems = async (): Promise<ItemsDataNew[]> => {
  const resp = await fetch(`${baseUrl}/some`);
  return resp.json();
};

export const getTypes = async (): Promise<string[]> => {
  const resp = await fetch(`${baseUrl}/types`);
  return resp.json();
};

export const searchWithType = async (type: string): Promise<ItemsDataNew[]> => {
  const resp = await fetch(`${baseUrl}/types/${type}`);
  return resp.json();
};

export const searchWithName = async (name: string): Promise<ItemsDataNew[]> => {
  const resp = await fetch(`${baseUrl}/search/${name}`);
  return resp.json();
};

export const updateItem = async (object: ItemsDataNew) => {
  const resp = await fetch(`${baseUrl}/${object.id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(object),
  });
  return resp.json();
};
