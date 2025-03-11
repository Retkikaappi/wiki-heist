import { NavLink, Outlet, useParams } from 'react-router-dom';
import useMonsters from '../hooks/useMonsters';

const MonsterList = () => {
  const { dayIndex } = useParams();
  const { monsters, monsterImages } = useMonsters();

  if (
    !monsters.data ||
    !monsterImages.data ||
    monsters.isError ||
    monsterImages.isError
  ) {
    return <div className='p-4'>No monsters found</div>;
  }

  if (monsters.isLoading || monsterImages.isLoading) {
    return (
      <div className='pt-4 pb-20 flex flex-col h-dvh items-center bg-linear-to-b from-bazaarDark to-bazaarDarkest'>
        <div className='border-6 border-b-blue-600 animate-spin w-20 h-20 rounded-full'></div>
      </div>
    );
  }

  const monsterList = monsters.data.filter(
    (e) => e.appearsOn === `Day ${dayIndex}`
  );

  const findImage = (name: string) => {
    const monster = monsterImages.data?.find((e) => name === e.name);

    return monster ? monster.img : undefined;
  };

  return (
    <>
      <div className='self-center flex w-3/4 justify-center pb-4 gap-2'>
        <div className='flex flex-wrap columns-3 flex-1 flex-row gap-1 justify-center'>
          {monsterList.map(
            ({ rank, name }) =>
              rank === 'Bronze' && (
                <NavLink
                  to={`/day/${dayIndex}/${name}`}
                  key={name}
                  className={({ isActive }: { isActive: boolean }) =>
                    `w-30 h-30 hover:brightness-120 transition rounded-md bg-linear-to-b from-bazaarDarkest to-bazaarDark ${
                      isActive && 'ring-3 from-bronze ring-amber-700'
                    }`
                  }
                >
                  {findImage(name) ? (
                    <img
                      className='w-full h-full object-cover rounded-md'
                      src={findImage(name)}
                    />
                  ) : (
                    <button className='w-30 h-30 rounded-md bg-amber-800 cursor-pointer text-black'>
                      {name}
                    </button>
                  )}
                </NavLink>
              )
          )}
        </div>
        <div className='flex flex-wrap columns-3 flex-1 flex-row gap-1 justify-center'>
          {monsterList.map(
            ({ rank, name }) =>
              rank === 'Silver' && (
                <NavLink
                  to={`/day/${dayIndex}/${name}`}
                  key={name}
                  className={({ isActive }: { isActive: boolean }) =>
                    `w-30 h-30 hover:brightness-120 transition rounded-md shadow-md shadow-bazaarDarkest bg-linear-to-b from-bazaarDarkest to-bazaarDark ${
                      isActive && 'ring-3 from-silver ring-zinc-300'
                    }`
                  }
                >
                  {findImage(name) ? (
                    <img
                      className='w-full h-full object-cover rounded-md'
                      src={findImage(name)}
                    />
                  ) : (
                    <button className='w-30 h-30 rounded-md bg-zinc-500 cursor-pointer text-black'>
                      {name}
                    </button>
                  )}
                </NavLink>
              )
          )}
        </div>
        <div className='flex flex-wrap columns-3 flex-1 flex-row gap-1 justify-center'>
          {monsterList.map(
            ({ rank, name }) =>
              (rank === 'Gold+' || rank === 'Gold') && (
                <NavLink
                  key={name}
                  to={`/day/${dayIndex}/${name}`}
                  className={({ isActive }: { isActive: boolean }) =>
                    `w-30 h-30 hover:brightness-130 transition rounded-md shadow-md shadow-bazaarDarkest bg-linear-to-b from-bazaarDarkest to-bazaarDark ${
                      isActive && 'ring-3 from-gold ring-gold'
                    }`
                  }
                >
                  {findImage(name) ? (
                    <img
                      className='w-full h-full object-cover rounded-md'
                      src={findImage(name)}
                    />
                  ) : (
                    <button className='w-30 h-30 rounded-md bg-yellow-500 cursor-pointer text-black'>
                      {name}
                    </button>
                  )}
                </NavLink>
              )
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default MonsterList;
