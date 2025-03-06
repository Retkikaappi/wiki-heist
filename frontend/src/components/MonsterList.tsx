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

    return monster ? monster.img : undefined;
  };

  return (
    <>
      <div className='self-center flex w-3/4 justify-center pb-4 gap-2'>
        <div className='flex flex-wrap columns-3 flex-1 flex-row gap-1 justify-center'>
          {monsterList.bronze.map((e) => (
            <NavLink
              to={`/day/${dayIndex}/${e}`}
              key={e}
              className={({ isActive }: { isActive: boolean }) =>
                `w-30 h-30 hover:brightness-120 transition rounded-md bg-linear-to-b from-bazaarDarkest to-bazaarDark ${
                  isActive && 'ring-3 from-bronze ring-amber-700'
                }`
              }
            >
              {findImage(e) ? (
                <img
                  className='w-full h-full object-cover rounded-md'
                  src={findImage(e)}
                />
              ) : (
                <button className='w-30 h-30 rounded-md bg-amber-800 cursor-pointer text-black'>
                  {e}
                </button>
              )}
            </NavLink>
          ))}
        </div>
        <div className='flex flex-wrap columns-3 flex-1 flex-row gap-1 justify-center'>
          {monsterList.silver.map((e) => (
            <NavLink
              to={`/day/${dayIndex}/${e}`}
              key={e}
              className={({ isActive }: { isActive: boolean }) =>
                `w-30 h-30 hover:brightness-120 transition rounded-md shadow-md shadow-bazaarDarkest bg-linear-to-b from-bazaarDarkest to-bazaarDark ${
                  isActive && 'ring-3 from-silver ring-zinc-300'
                }`
              }
            >
              {findImage(e) ? (
                <img
                  className='w-full h-full object-cover rounded-md'
                  src={findImage(e)}
                />
              ) : (
                <button className='w-30 h-30 rounded-md bg-zinc-500 cursor-pointer text-black'>
                  {e}
                </button>
              )}
            </NavLink>
          ))}
        </div>
        <div className='flex flex-wrap columns-3 flex-1 flex-row gap-1 justify-center'>
          {monsterList.gold.map((e) => (
            <NavLink
              key={e}
              to={`/day/${dayIndex}/${e}`}
              className={({ isActive }: { isActive: boolean }) =>
                `w-30 h-30 hover:brightness-130 transition rounded-md shadow-md shadow-bazaarDarkest bg-linear-to-b from-bazaarDarkest to-bazaarDark ${
                  isActive && 'ring-3 from-gold ring-gold'
                }`
              }
            >
              {findImage(e) ? (
                <img
                  className='w-full h-full object-cover rounded-md'
                  src={findImage(e)}
                />
              ) : (
                <button className='w-30 h-30 rounded-md bg-yellow-500 cursor-pointer text-black'>
                  {e}
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
