import DayList from './components/DayList';

import { Routes, Route, NavLink } from 'react-router-dom';
import MonsterList from './components/MonsterList';
import SingleMonster from './components/SingleMonster';

function App() {
  return (
    <div className='flex flex-col items-center'>
      <div className='border border-red-700 m-4 p-4'>
        <NavLink className='m-4' to='/'>
          Home
        </NavLink>
        <NavLink className='m-4' to='/day'>
          Monsters
        </NavLink>
      </div>
      <Routes>
        <Route path='/' element={<div>test</div>} />
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

