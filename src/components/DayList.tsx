import { NavLink, Outlet } from 'react-router-dom';
import useMonsters from '../hooks/useMonsters';
import { Day } from '../types';

const DayBtn = ({ item }: { item: Day }) => (
  <NavLink
    className={({ isActive }: { isActive: boolean }) =>
      `m-6 p-6 h-18 w-18 rounded-full text-center overflow-hidden ${
        isActive ? 'bg-amber-600 border-3' : 'bg-neutral-500'
      }`
    }
    to={`/day/${item.day}`}
  >
    {item.day}
  </NavLink>
);

const DayList = () => {
  const { monsters } = useMonsters();

  return (
    <div className='flex flex-col justify-end bg-linear-to-br from-lighttile to-darktile'>
      <div className='flex justify-center'>
        {monsters.map((item) => (
          <DayBtn key={item.day} item={item} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default DayList;
