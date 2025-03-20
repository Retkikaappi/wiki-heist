import { NavLink, Outlet } from 'react-router-dom';
import useMonsters from '../../hooks/useMonsters';

const DayBtn = ({ index }: { index: number }) => (
  <NavLink
    className={({ isActive }: { isActive: boolean }) =>
      `m-2 h-12 w-20 rounded-md text-center content-center shadow-sm shadow-black hover:from-blue-400 hover:via-blue-500 hover:to-blue-500 transition ${
        isActive
          ? 'bg-linear-to-br from-blue-500 via-blue-700 to-blue-600 ring-2 ring-btnBorder'
          : 'bg-linear-to-br from-blue-900 via-blue-900 to-blue-950'
      }`
    }
    to={index === 10 ? `/day/${index}+` : `/day/${index}`}
  >
    <p className='text-lg'>{index}</p>
  </NavLink>
);

const DayList = () => {
  const { monsters } = useMonsters();
  return (
    <div className='flex flex-col forepattern'>
      <div className='mb-4 flex flex-wrap justify-center items-center'>
        {[...Array(10)].map((_e, index) => (
          <DayBtn key={`day_${index + 1}`} index={index + 1} />
        ))}
        <NavLink
          className={`m-2 h-12 w-20 rounded-md text-center content-center shadow-sm shadow-black hover:from-blue-400 hover:via-blue-500 hover:to-blue-500 transition bg-linear-to-br from-blue-900 via-blue-900 to-blue-950`}
          to='/day/'
        >
          <p className='text-lg'>All</p>
        </NavLink>
      </div>

      <Outlet context={monsters} />
    </div>
  );
};

export default DayList;
