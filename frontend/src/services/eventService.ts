import { EventByDay, EventData } from '../types';

const baseUrl = '/api/events';

export const getEvents = async (): Promise<EventData[]> => {
  const resp = await fetch(baseUrl);

  return resp.json();
};

export const getEventImages = async (): Promise<EventByDay[]> => {
  const resp = await fetch(`${baseUrl}/images`);
  return resp.json();
};
