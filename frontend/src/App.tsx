import DayList from './components/DayList';
import { Routes, Route, NavLink } from 'react-router-dom';
import MonsterList from './components/MonsterList';
import SingleMonster from './components/SingleMonster';
import Events from './components/Events';
import SingleEvent from './components/SingleEvent';
import Login from './components/Login';

function App() {
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
            `absolute right-1 place-self-center p-3 rounded-sm font-bold text-lg hover:bg-blue-500 ${
              isActive && 'bg-blue-800'
            }`
          }
          to='/login'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#ffffff'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
            <circle cx='12' cy='7' r='4'></circle>
          </svg>
        </NavLink>
      </div>

      <Routes>
        <Route path='/' element={<Events />} />
        <Route path='/day' element={<DayList />}>
          <Route path='/day/:dayIndex' element={<MonsterList />}>
            <Route
              path='/day/:dayIndex/:monsterName'
              element={<SingleMonster />}
            />
          </Route>
        </Route>
        <Route path='/events/:eventName' element={<SingleEvent />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

