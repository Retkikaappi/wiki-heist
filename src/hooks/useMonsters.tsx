import { useState } from 'react';
import monstersByDay from '../../data/monstersByDay';
import monsterGearData from '../../data/monsterGear';
import { useQuery } from '@tanstack/react-query';
import { getMonsterImages } from '../services/monsterService';
const useMonsters = () => {
  const [monsters] = useState(monstersByDay);
  const [monsterGear] = useState(monsterGearData);
  const { data } = useQuery({
    queryKey: ['images'],
    queryFn: getMonsterImages,
  });

  return { monsters, monsterGear, monsterImages: data };
};

export default useMonsters;
