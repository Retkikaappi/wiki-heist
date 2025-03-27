import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllMonsters,
  getMonsterImages,
  getSingleMonster,
} from '../services/monsterService';
const useMonsters = () => {
  const queryClient = useQueryClient();
  const monsters = useQuery({
    queryKey: ['monsters'],
    queryFn: getAllMonsters,
  });
  const monsterImages = useQuery({
    queryKey: ['images'],
    queryFn: getMonsterImages,
  });

  const prefetchMonster = (monsterName: string) => {
    queryClient.prefetchQuery({
      queryKey: ['monster', monsterName],
      queryFn: () => getSingleMonster(monsterName),
    });
  };

  return { monsters, monsterImages, prefetchMonster };
};

export default useMonsters;
