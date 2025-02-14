import { NavLink, Outlet } from 'react-router-dom';
import useMonsters from '../hooks/useMonsters';
import { Day } from '../types';

const DayBtn = ({ item }: { item: Day }) => (
  <NavLink
    className={({ isActive }: { isActive: boolean }) =>
      `m-2 h-12 w-20 rounded-md text-center content-center  hover:from-blue-400 hover:via-blue-500 hover:to-blue-500 transition ${
        isActive
          ? 'bg-linear-to-br from-blue-500 via-blue-700 to-blue-600 ring-2 ring-btnBorder'
          : 'bg-linear-to-br from-blue-900 via-blue-900 to-blue-950'
      }`
    }
    to={`/day/${item.day}`}
  >
    <p className='text-lg'>{item.day}</p>
  </NavLink>
);

const DayList = () => {
  const { monsters } = useMonsters();

  return (
    <div className='flex flex-col w-3/4 bg-linear-to-b from-bazaarDark to-bazaarDarkLight'>
      <div className='mb-4 flex flex-wrap justify-center items-center'>
        {monsters.map((item) => (
          <DayBtn key={item.day} item={item} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default DayList;
