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

export const updateEvent = async (object: EventData) => {
  const resp = await fetch(`/api/events/${object.id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(object),
  });
  return resp.json();
};
