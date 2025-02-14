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
    <>
      <div className='flex justify-center pb-4'>
        <div className='flex flex-wrap columns-3 flex-1 flex-row gap-2 justify-center'>
          {monsterList.bronze.map(
            (e) =>
              monsterImages && (
                <NavLink
                  to={`/day/${dayIndex}/${e}`}
                  key={e}
                  className={({ isActive }: { isActive: boolean }) =>
                    `w-25 h-25 rounded-md hover:brightness-120 transition ${
                      isActive &&
                      'ring-3 bg-linear-to-b from-bronze ring-amber-700'
                    }`
                  }
                >
                  {findImage(e) ? (
                    <img className='w-25 h-25 rounded-md' src={findImage(e)} />
                  ) : (
                    <button className='w-25 h-25 bg-amber-800 cursor-pointer'>
                      {e.substring(0, 6)}
                    </button>
                  )}
                </NavLink>
              )
          )}
        </div>
        <div className='flex flex-wrap columns-3 flex-1 flex-row gap-2 justify-center'>
          {monsterList.silver.map((e) => (
            <NavLink
              to={`/day/${dayIndex}/${e}`}
              key={e}
              className={({ isActive }: { isActive: boolean }) =>
                `w-25 h-25 hover:brightness-120 transition rounded-md ${
                  isActive && 'ring-3 bg-linear-to-b from-silver ring-zinc-300'
                }`
              }
            >
              {findImage(e) ? (
                <img className='w-25 h-25 rounded-md' src={findImage(e)} />
              ) : (
                <button className='w-25 h-25 rounded-full bg-zinc-500 cursor-pointer'>
                  {e.substring(0, 6)}
                </button>
              )}
            </NavLink>
          ))}
        </div>
        <div className='flex flex-wrap columns-3 flex-1 flex-row gap-2 justify-center'>
          {monsterList.gold.map((e) => (
            <NavLink
              key={e}
              to={`/day/${dayIndex}/${e}`}
              className={({ isActive }: { isActive: boolean }) =>
                `w-25 h-25 hover:brightness-130 transition rounded-md ${
                  isActive && 'ring-3 bg-linear-to-b from-gold ring-gold'
                }`
              }
            >
              {findImage(e) ? (
                <img className='w-25 h-25 rounded-md' src={findImage(e)} />
              ) : (
                <button className='w-25 h-25 bg-yellow-500 cursor-pointer'>
                  {e.substring(0, 6)}
                </button>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default MonsterList;
