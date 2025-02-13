import { NavLink, Outlet } from 'react-router-dom';
import useMonsters from '../hooks/useMonsters';
import { Day } from '../types';

const DayBtn = ({ item }: { item: Day }) => (
  <NavLink
    className={({ isActive }: { isActive: boolean }) =>
      `m-6 p-6 h-18 w-18 rounded-full text-center overflow-hidden hover:bg-blue-500 transition ${
        isActive
          ? 'bg-bazaarBtnActive border-3 border-btnBorder'
          : 'bg-bazaarBtn'
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
