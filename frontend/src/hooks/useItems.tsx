import { useQuery } from '@tanstack/react-query';
import {
  getSomeItems,
  getTypes,
  searchWithType,
} from '../services/itemService';

const useItems = (type: string) => {
  const someItems = useQuery({
    queryKey: ['items'],
    queryFn: getSomeItems,
  });

  const types = useQuery({
    queryKey: ['itemTypes'],
    queryFn: getTypes,
  });

  const withType = useQuery({
    queryKey: ['itemsByTypes', type],
    queryFn: () => searchWithType(type),
    enabled: !!type,
  });

  return { someItems, types, withType };
};

export default useItems;
