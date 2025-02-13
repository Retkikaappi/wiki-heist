import { NavLink, Outlet, useParams } from 'react-router-dom';
import useMonsters from '../hooks/useMonsters';

const MonsterList = () => {
  const { dayIndex } = useParams();
  const { monsters, monsterImages } = useMonsters();
  const monsterList = monsters.find((e) => e.day === Number(dayIndex));

  if (!monsterList) {
    return <div className='p-4'>No monsters found</div>;
  }

  const findImage = (name: string) => {
    const monster = monsterImages?.find((e) => name === e.name);

    return monster ? monster.image : undefined;
  };

  return (
    <div>
      <div className='flex justify-center'>
        <div className='flex flex-wrap columns-4 flex-1 flex-row justify-center'>
          {monsterList.bronze.map(
            (e) =>
              monsterImages && (
                <NavLink
                  to={`/day/${dayIndex}/${e}`}
                  className={({ isActive }: { isActive: boolean }) =>
                    `rounded-full w-22 h-22 overflow-hidden ${
                      isActive && 'border-4'
                    }`
                  }
                >
                  {findImage(e) ? (
                    <img
                      className='rounded-full w-22 h-22 bg-amber-800'
                      src={findImage(e)}
                    />
                  ) : (
                    <button className='h-22 w-22 rounded-full bg-amber-800 cursor-pointer'>
                      {e.substring(0, 6)}
                    </button>
                  )}
                </NavLink>
              )
          )}
        </div>
        <div className='flex flex-wrap columns-4 flex-1 flex-row justify-center'>
          {monsterList.silver.map((e) => (
            <NavLink
              to={`/day/${dayIndex}/${e}`}
              className={({ isActive }: { isActive: boolean }) =>
                `rounded-full w-22 h-22 overflow-hidden ${
                  isActive && 'border-4'
                }`
              }
            >
              {findImage(e) ? (
                <img
                  className='rounded-full w-22 h-22 bg-zinc-500'
                  src={findImage(e)}
                />
              ) : (
                <button className='h-22 w-22 rounded-full bg-zinc-500 cursor-pointer'>
                  {e.substring(0, 6)}
                </button>
              )}
            </NavLink>
          ))}
        </div>
        <div className='flex flex-wrap columns-4 flex-1 flex-row justify-center'>
          {monsterList.gold.map((e) => (
            <NavLink
              to={`/day/${dayIndex}/${e}`}
              className={({ isActive }: { isActive: boolean }) =>
                `rounded-full w-22 h-22 overflow-hidden ${
                  isActive && 'border-4'
                }`
              }
            >
              {findImage(e) ? (
                <img
                  className='rounded-full w-22 h-22 bg-yellow-500 '
                  src={findImage(e)}
                />
              ) : (
                <button className='h-22 w-22 rounded-full bg-yellow-500 cursor-pointer'>
                  {e.substring(0, 6)}
                </button>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default MonsterList;
