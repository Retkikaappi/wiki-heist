import { useQuery } from '@tanstack/react-query';
import { getEventImages, getEvents } from '../services/eventService';

const useEvents = () => {
  const eventImages = useQuery({
    queryKey: ['eventImages'],
    queryFn: getEventImages,
  });
  const events = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  return { eventImages, events };
};

export default useEvents;
