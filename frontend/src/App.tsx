import DayList from './components/DayList';
import { Routes, Route, NavLink } from 'react-router-dom';
import MonsterList from './components/MonsterList';
import SingleMonster from './components/SingleMonster';

function App() {
  return (
    <div className='flex flex-col items-center'>
      <div className=' bg-bazaarDarkLight p-2'>
        <NavLink
          className={({ isActive }) =>
            `p-4 font-bold text-lg hover:text-blue-500 ${
              isActive && 'text-blue-500 underline'
            }`
          }
          to='/'
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `p-4 font-bold text-lg hover:text-blue-500 ${
              isActive && 'text-blue-400 underline'
            }`
          }
          to='/day'
        >
          Monsters
        </NavLink>
      </div>

      <Routes>
        <Route
          path='/'
          element={<div className='bg-neutral-900 p-4'>Coming soon</div>}
        />
        <Route path='/day' element={<DayList />}>
          <Route path='/day/:dayIndex' element={<MonsterList />}>
            <Route
              path='/day/:dayIndex/:monsterName'
              element={<SingleMonster />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

