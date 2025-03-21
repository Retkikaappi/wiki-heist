import { useQuery } from '@tanstack/react-query';
import { getSomeItems } from '../services/itemService';

const useItems = () => {
  const someItems = useQuery({
    queryKey: ['items'],
    queryFn: getSomeItems,
  });

  return { someItems };
};

export default useItems;
