import { useQuery } from '@tanstack/react-query';
import {
  getSomeItems,
  getTypes,
  searchWithName,
  searchWithType,
} from '../services/itemService';

const useItems = (type: string, name: string) => {
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

  const withName = useQuery({
    queryKey: ['itemsByName', name],
    queryFn: () => searchWithName(name),
    enabled: !!name,
  });

  return { someItems, types, withType, withName };
};

export default useItems;
