import { useState } from 'react';
import monstersByDay from '../../data/monstersByDay';
import monsterGearData from '../../data/monsterGear';
const useMonsters = () => {
  const [monsters] = useState(monstersByDay);
  const [monsterGear] = useState(monsterGearData);

  return { monsters, monsterGear };
};

export default useMonsters;
