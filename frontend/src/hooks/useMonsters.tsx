import { useQuery } from '@tanstack/react-query';
import { getAllMonsters, getMonsterImages } from '../services/monsterService';
const useMonsters = () => {
  const monsters = useQuery({
    queryKey: ['monsters'],
    queryFn: getAllMonsters,
  });
  const monsterImages = useQuery({
    queryKey: ['images'],
    queryFn: getMonsterImages,
  });

  return { monsters, monsterImages };
};

export default useMonsters;
