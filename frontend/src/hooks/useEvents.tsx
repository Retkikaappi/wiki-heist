import { useQuery } from '@tanstack/react-query';
import { getEventImages, getEvents } from '../services/eventService';

const useEvents = () => {
  const eventImages = useQuery({
    queryKey: ['eventImages'],
    queryFn: getEventImages,
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  return { eventImages, isError, data, isLoading };
};

export default useEvents;
