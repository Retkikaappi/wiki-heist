import { Outlet, useParams } from 'react-router-dom';
import MonsterCards from './MonsterCards';

const MonsterList = () => {
  const { dayIndex } = useParams();

  return (
    <>
      {dayIndex ? <MonsterCards dayIndex={dayIndex} /> : <MonsterCards />}
      <Outlet />
    </>
  );
};

export default MonsterList;
