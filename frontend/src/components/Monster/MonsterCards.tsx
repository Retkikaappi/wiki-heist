import { NavLink, useMatch, useOutletContext } from 'react-router-dom';
import { UseQueryResult } from '@tanstack/react-query';
import { MonsterData } from '../../types';

const MonsterCards = ({ dayIndex }: { dayIndex?: string }) => {
  const monsters = useOutletContext<UseQueryResult<MonsterData[], Error>>();
  const isMonsterView = useMatch('/day/:dayIndex/:monsterName');

  if (!monsters.data || monsters.isError) {
    return (
      <div className='pt-4 pb-20 flex flex-col items-center'>
        <p>No monsters found</p>
      </div>
    );
  }

  if (monsters.isLoading) {
    return (
      <div className='pt-4 pb-20 flex flex-col items-center'>
        <div className='border-6 border-b-blue-600 animate-spin w-20 h-20 rounded-full'></div>
      </div>
    );
  }

  const monsterList = dayIndex
    ? monsters.data.filter((e) => e.appearsOn === `Day ${dayIndex}`)
    : monsters.data;

  return (
    <>
      {isMonsterView ? null : (
        <div className='self-center flex gap-6 w-5/6 justify-center pb-8'>
          <div className='flex flex-wrap flex-1 flex-row gap-1 justify-center border-t-10 border-bronze py-2'>
            {monsterList.map(
              ({ rank, name, appearsOn, img }) =>
                rank === 'Bronze' && (
                  <NavLink
                    to={`/day/${appearsOn}/${name}`}
                    key={name}
                    className={`w-30 h-30 transition rounded-md bg-linear-to-b from-bazaarDarkest to-bazaarDark hover:from-bronze hover:ring-2 ring-amber-700`}
                  >
                    <img
                      className='w-full h-full object-cover rounded-md'
                      src={img}
                    />
                  </NavLink>
                )
            )}
          </div>
          <div className='flex flex-wrap flex-1 flex-row gap-1 justify-center py-2 border-t-10 border-silver'>
            {monsterList.map(
              ({ rank, name, appearsOn, img }) =>
                rank === 'Silver' && (
                  <NavLink
                    to={`/day/${appearsOn}/${name}`}
                    key={name}
                    className={`w-30 h-30 transition rounded-md shadow-md shadow-bazaarDarkest bg-linear-to-b from-bazaarDarkest to-bazaarDark hover:from-silver hover:ring-2 ring-zinc-300
                  `}
                  >
                    <img
                      className='w-full h-full object-cover rounded-md'
                      src={img}
                    />
                  </NavLink>
                )
            )}
          </div>
          <div className='flex flex-wrap flex-1 flex-row gap-1 justify-center py-2 border-t-10 border-gold'>
            {monsterList.map(
              ({ rank, name, appearsOn, img }) =>
                (rank === 'Gold+' || rank === 'Gold') && (
                  <NavLink
                    key={name}
                    to={`/day/${appearsOn}/${name}`}
                    className={`w-30 h-30 hover:brightness-130 transition rounded-md shadow-md shadow-bazaarDarkest bg-linear-to-b from-bazaarDarkest to-bazaarDark hover:from-gold hover:ring-2 ring-gold`}
                  >
                    <img
                      className='w-full h-full object-cover rounded-md'
                      src={img}
                    />
                  </NavLink>
                )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MonsterCards;
