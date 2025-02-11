import { NavLink, Outlet, useParams } from 'react-router-dom';
import useMonsters from '../hooks/useMonsters';

const MonsterList = () => {
  const { dayIndex } = useParams();
  const { monsters } = useMonsters();
  const monsterList = monsters.find((e) => e.day === Number(dayIndex));

  if (!monsterList) {
    return <div>No monsters found</div>;
  }

  return (
    <div className='m-10 border border-black'>
      <div className='flex justify-center'>
        <div>
          {monsterList.bronze.map((e) => (
            <NavLink
              className='m-2 p-2 rounded-full bg-amber-800'
              to={`/day/${dayIndex}/${e}`}
            >
              {e.substring(0, 4)}
            </NavLink>
          ))}
        </div>
        <div>
          {monsterList.silver.map((e) => (
            <NavLink
              className='m-2 p-2 rounded-full bg-zinc-500'
              to={`/day/${dayIndex}/${e}`}
            >
              {e}
            </NavLink>
          ))}
        </div>
        <div>
          {monsterList.gold.map((e) => (
            <NavLink
              className='m-2 p-2 rounded-full bg-yellow-500'
              to={`/day/${dayIndex}/${e}`}
            >
              {e}
            </NavLink>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default MonsterList;
