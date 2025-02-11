import { NavLink, Outlet } from 'react-router-dom';
import useMonsters from '../hooks/useMonsters';
import { Day } from '../types';

const DayBtn = ({ item }: { item: Day }) => (
  <NavLink
    className={'bg-neutral-500 m-6 p-6 h-18 w-18 rounded-full'}
    to={`/day/${item.day}`}
  >
    {item.day}
  </NavLink>
);

const DayList = () => {
  const { monsters } = useMonsters();

  return (
    <div className='flex flex-col justify-center m-20 p-10 bg-linear-to-br from-lighttile to-darktile'>
      <div>
        {monsters.map((item) => (
          <DayBtn key={item.day} item={item} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default DayList;
