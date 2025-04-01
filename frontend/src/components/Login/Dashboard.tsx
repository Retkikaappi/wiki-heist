import { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const LinkBtn = ({ children, to }: { children: ReactNode; to: string }) => (
  <NavLink
    className={({ isActive }) =>
      `p-3 font-bold text-lg hover:text-blue-500 odd:bg-neutral-900 even:bg-neutral-800 ${
        isActive && 'text-blue-500 underline'
      }`
    }
    to={to}
  >
    {children}
  </NavLink>
);

const Dashboard = () => {
  return (
    <div className='flex flex-row'>
      <div className='w-1/12 bg-neutral-900'>
        <div className='flex flex-col justify-center text-center'>
          <LinkBtn to='/admin/routes'>Routes</LinkBtn>
          <LinkBtn to='/admin/scrapers'>Scrapers</LinkBtn>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
