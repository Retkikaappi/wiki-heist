import { useState } from 'react';
import useEvents from '../../hooks/useEvents';
import useMonsters from '../../hooks/useMonsters';
import { DataDisplay } from '../../types';

const DisplayData = ({ data }: { data: DataDisplay }) => {
  if (data.isError || !data.data) {
    return <div>Error fetching data</div>;
  }
  if (data.isLoading) {
    return <div>Loading data</div>;
  }

  return (
    <table className='text-center'>
      <thead>
        <tr>
          {Object.keys(data.data[0]).map((e) => (
            <th key={`header_${e}`} className='p-1 border-black border-1'>
              {e}
            </th>
          ))}
          <th className='p-1 border-black border-1'>-</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((e, index) => (
          <tr
            key={`datarow_${index}`}
            className=' odd:bg-bazaarDarkest even:bg-bazaarDark hover:bg-bazaarDarkLight'
          >
            {Object.values(e).map((t, tIndex) => (
              <td
                key={`data_${index}_${tIndex}`}
                className='p-1 text-sm border-1 border-black'
              >
                {t}
              </td>
            ))}
            <td className='p-1 px-6 text-sm border-1 border-black'>
              <a>Edit</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const RoutesDashboard = () => {
  const { events, eventImages } = useEvents();
  const { monsters, monsterImages } = useMonsters();
  const [data, setData] = useState<DataDisplay>(events);

  return (
    <div className='flex-1'>
      <div className='border-black border-1 border-b-0 p-2 flex gap-3'>
        <button
          onClick={() => setData(events)}
          className={`p-1 font-bold hover:text-blue-500`}
        >
          Events
        </button>
        <button
          onClick={() => setData(eventImages)}
          className={`p-1 font-bold hover:text-blue-500`}
        >
          EventImages
        </button>
        <button
          onClick={() => setData(monsters)}
          className={`p-1 font-bold hover:text-blue-500`}
        >
          Monsters
        </button>
        <button
          onClick={() => setData(monsterImages)}
          className={`p-1 font-bold hover:text-blue-500`}
        >
          MonsterImages
        </button>
      </div>
      <DisplayData data={data} />
    </div>
  );
};

export default RoutesDashboard;
