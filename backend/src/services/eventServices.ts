import fs from 'fs';
type EventData = {
  image: string;
  description: string;
  functions: string[];
  name: string;
};

let eventData: EventData[] | null = null;

const loadEventData = async () => {
  if (eventData === null) {
    try {
      const data = fs.readFileSync('./data/eventData.json', 'utf-8');
      eventData = (await JSON.parse(data)) as EventData[];
    } catch (e) {
      console.log('Error loading data ', e);
    }
  }
  return eventData;
};

const allEvents = () => {
  return eventData;
};

export default { loadEventData, allEvents };
