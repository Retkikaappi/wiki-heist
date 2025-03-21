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
