import { useState } from 'react';
import monstersByDay from '../../data/monstersByDay';
import { useQuery } from '@tanstack/react-query';
import { getMonsterImages } from '../services/monsterService';
const useMonsters = () => {
  const [monsters] = useState(monstersByDay);
  const { data } = useQuery({
    queryKey: ['images'],
    queryFn: getMonsterImages,
  });

  return { monsters, monsterImages: data };
};

export default useMonsters;
