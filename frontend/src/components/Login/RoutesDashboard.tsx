import { useState } from 'react';
import useEvents from '../../hooks/useEvents';
import useMonsters from '../../hooks/useMonsters';
import { ActiveData, DataDisplay, SingleDataDisplay } from '../../types';
import useItems from '../../hooks/useItems';
import EditData from './EditData';

const DisplayData = ({
  data,
  editClick,
}: {
  data: DataDisplay;
  editClick: (data: SingleDataDisplay) => void;
}) => {
  if (data.isLoading) {
    return (
      <div className='pt-4 pb-20 flex flex-col items-center '>
        <div className='border-6 border-b-blue-600 animate-spin w-20 h-20 rounded-full'></div>
      </div>
    );
  }
  if (data.isError || !data.data) {
    return (
      <div className='pt-4 pb-20 flex flex-col items-center '>
        Could not find events
      </div>
    );
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
            <td className='text-sm border-1 border-black'>
              <button
                onClick={() => editClick(e)}
                className='bg-neutral-800 p-3 px-6 hover:ring-1 hover:cursor-pointer ring-blue-500'
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const RoutesDashboard = () => {
  const { events } = useEvents();
  const { monsters } = useMonsters();
  const { someItems } = useItems('', '');
  const [data, setData] = useState<DataDisplay>(events);
  const [activeData, setActiveData] = useState<ActiveData>('Events');
  const [singleData, setSingleData] = useState<SingleDataDisplay | null>(null);

  const handleClick = (dataFor: DataDisplay, dataName: ActiveData) => {
    setSingleData(null);
    setData(dataFor);
    setActiveData(dataName);
  };

  const editClick = (data: SingleDataDisplay) => {
    setSingleData(data);
    console.log(data);
    console.log(activeData);
  };

  return (
    <div className='flex-1'>
      <div className='border-black border-1 border-b-0 border-t-0 p-2 flex gap-3'>
        <button
          onClick={() => handleClick(events, 'Events')}
          className={`p-1 font-bold hover:text-blue-500 cursor-pointer ${
            activeData === 'Events' && 'text-blue-500 underline'
          }`}
        >
          Events
        </button>
        <button
          onClick={() => handleClick(monsters, 'Monsters')}
          className={`p-1 font-bold hover:text-blue-500 cursor-pointer ${
            activeData === 'Monsters' && 'text-blue-500 underline'
          }`}
        >
          Monsters
        </button>
        <button
          onClick={() => handleClick(someItems, 'SomeItems')}
          className={`p-1 font-bold hover:text-blue-500 cursor-pointer ${
            activeData === 'SomeItems' && 'text-blue-500 underline'
          }`}
        >
          SomeItems
        </button>
      </div>
      {singleData ? (
        <EditData dataType={activeData} data={singleData} />
      ) : (
        <DisplayData data={data} editClick={editClick} />
      )}
    </div>
  );
};

export default RoutesDashboard;
