import DayList from './components/DayList';
import { Routes, Route, NavLink } from 'react-router-dom';
import MonsterList from './components/MonsterList';
import SingleMonster from './components/SingleMonster';
import Events from './components/Events';
import SingleEvent from './components/SingleEvent';

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
      </Routes>
    </div>
  );
}

export default App;

