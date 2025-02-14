import { EventData } from '../types';

const baseUrl = '/api/events';

export const getEvents = async (): Promise<EventData[]> => {
  const resp = await fetch(baseUrl);

  return resp.json();
};
