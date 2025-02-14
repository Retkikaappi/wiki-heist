import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../services/eventService';

const useEvents = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  return { isError, data, isLoading };
};

export default useEvents;
