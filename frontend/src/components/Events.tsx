import { Outlet } from 'react-router-dom';
import useEvents from '../hooks/useEvents';

const Events = () => {
  const { data, isLoading, isError } = useEvents();

  if (isLoading) {
    return (
      <div className='pt-4 pb-20 flex flex-col h-dvh items-center bg-linear-to-b from-bazaarDark to-bazaarDarkest'>
        <div className='border-6 border-b-blue-600 animate-spin w-20 h-20 rounded-full'></div>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className='pt-4 pb-20 flex flex-col h-dvh items-center bg-linear-to-b from-bazaarDark to-bazaarDarkest'>
        Could not find events
      </div>
    );
  }
  return (
    <div className='m-auto pt-2 flex w-3/4 justify-center pb-4 gap-2 forepattern'>
      <div className='flex flex-wrap flex-1 flex-row gap-2 justify-center'>
        {data.map((e) => (
          <div
            className='p-2 shadow-md shadow-bazaarDarkest rounded-md text-center w-48 hover:ring-2 hover:bg-bazaarDarkLight ring-bazaarBtnActive transition'
            key={e.name}
          >
            <img src={e.image} className='h-30 m-auto rounded-md' />
            {e.name.replaceAll('_', ' ')}
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Events;
