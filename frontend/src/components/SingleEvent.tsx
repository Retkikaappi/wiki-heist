import { useNavigate, useParams } from 'react-router-dom';
import useEvents from '../hooks/useEvents';

const SingleEvent = () => {
  const nav = useNavigate();
  const { eventName } = useParams();
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
        Could not find event
      </div>
    );
  }

  const event = data.find((e) => e.name === eventName);
  console.log(event);

  return (
    <div className='m-auto text-center'>
      <button
        className='m-2 h-12 w-40 rounded-md text-center content-center shadow-sm shadow-black hover:from-blue-400 hover:via-blue-500 hover:to-blue-500 transition bg-linear-to-br from-blue-900 via-blue-900 to-blue-950 hover:cursor-pointer'
        onClick={() => nav(-1)}
      >
        Go back
      </button>

      {event && (
        <div className='m-auto flex flex-col w-3/4 justify-center pb-4 gap-4'>
          <p className='text-xl my-4'>{event.description}</p>

          <div className='m-auto h-40 w-40'>
            <img
              src={event.image}
              className='max-h-1/1 max-w-1/1 m-auto ring-1 ring-bazaarDarkest'
            />
          </div>

          <div className='w-1/2 m-auto shadow-xl shadow-bazaarDarkest'>
            {event.functions.map((e) => (
              <p
                className='p-1 odd:bg-bazaarDarkLight even:bg-bazaarDarkest'
                key={e}
              >
                {e}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleEvent;
