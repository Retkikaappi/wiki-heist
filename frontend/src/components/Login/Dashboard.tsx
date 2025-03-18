import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='flex flex-row'>
      <div className=' w-1/12 h-dvh'>
        <div className='flex flex-col justify-center text-center'>
          <NavLink
            className={({ isActive }) =>
              `p-3 font-bold text-lg hover:text-blue-500 ${
                isActive && 'text-blue-500 underline'
              }`
            }
            to='/admin/routes'
          >
            Routes
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `p-3 font-bold text-lg hover:text-blue-500 ${
                isActive && 'text-blue-500 underline'
              }`
            }
            to='/admin'
          >
            Events
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
