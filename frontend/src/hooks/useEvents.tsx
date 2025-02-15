import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../services/eventService';
import { useState } from 'react';
import events from '../../data/EventsByDay';

const useEvents = () => {
  const [eventDays] = useState(events);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  return { eventDays, isError, data, isLoading };
};

export default useEvents;
