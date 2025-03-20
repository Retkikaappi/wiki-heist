import DayList from './components/Monster';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import MonsterList from './components/Monster/MonsterList';
import SingleMonster from './components/Monster/SingleMonster';
import Events from './components/Event';
import SingleEvent from './components/Event/SingleEvent';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import UserContext from './context/userContext';
import RoutesDashboard from './components/Login/RoutesDashboard';
import Scrapers from './components/Login/Scrapers';
import DefaultView from './components/Login/DefaultView';
import MonsterCards from './components/Monster/MonsterCards';
import Items from './components/Item';
import useEvents from './hooks/useEvents';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const nav = useNavigate();
  const { eventImages, events } = useEvents();

  useEffect(() => {
    const token = localStorage.getItem('bazaar-token');
    if (token) {
      setUser(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bazaar-token');
    setUser(null);
    nav('/');
  };

  return (
    <div className=''>
      <div className='flex justify-center bg-neutral-900'>
        <NavLink
          className={({ isActive }) =>
            `p-3 font-bold text-lg hover:text-blue-500 ${
              isActive && 'text-blue-500 underline'
            }`
          }
          to='/'
        >
          Events
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `p-3 font-bold text-lg hover:text-blue-500 ${
              isActive && 'text-blue-500 underline '
            }`
          }
          to='/day'
        >
          Monsters
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `p-3 font-bold text-lg hover:text-blue-500 ${
              isActive && 'text-blue-500 underline '
            }`
          }
          to='/items'
        >
          Items
        </NavLink>

        {user && (
          <button
            className={`absolute right-20 place-self-center p-3 cursor-pointer rounded-sm font-bold text-lg hover:bg-blue-500 transition`}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
        <NavLink
          className={({ isActive }) =>
            `absolute right-1 place-self-center p-3 rounded-sm font-bold text-lg hover:bg-blue-500 ${
              isActive && 'bg-blue-800'
            }`
          }
          to='/admin'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#ffffff'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
            <circle cx='12' cy='7' r='4'></circle>
          </svg>
        </NavLink>
      </div>

      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route
            path='/'
            element={<Events events={events} eventImages={eventImages} />}
          />
          <Route path='/day' element={<DayList />}>
            <Route path='/day/:dayIndex' element={<MonsterList />}>
              <Route
                path='/day/:dayIndex/:monsterName'
                element={<SingleMonster />}
              />
            </Route>
            <Route path='/day' element={<MonsterCards />} />
          </Route>
          <Route
            path='/events/:eventName'
            element={<SingleEvent events={events} />}
          />
          <Route path='/items' element={<Items />} />
          <Route path='/admin' element={<Login />}>
            <Route path='/admin' element={<DefaultView />} />
            <Route path='/admin/routes' element={<RoutesDashboard />} />
            <Route path='/admin/scrapers' element={<Scrapers />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

