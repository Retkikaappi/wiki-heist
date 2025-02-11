import { useParams } from 'react-router-dom';
import useMonsters from '../hooks/useMonsters';

const SingleMonster = () => {
  const { monsterName } = useParams();
  const { monsterGear } = useMonsters();
  const monster = monsterGear.find((e) => e.name === monsterName);

  return <div className='mt-8 flex justify-center'>name: {monsterName}</div>;
};

export default SingleMonster;
