import { Link } from 'react-router-dom';
import useEvents from '../hooks/useEvents';

const Events = () => {
  const { eventDays, data, isLoading, isError } = useEvents();

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

  const fullData = data.map((e) => {
    const match = eventDays.find((r) => e.name === r.name);
    return match
      ? { ...e, rarity: match.rarity, hero: match.hero }
      : { ...e, rarity: 'No', hero: 'No' };
  });

  return (
    <div className='forepattern text-center flex flex-col gap-2'>
      <div className='flex flex-wrap flex-row gap-2 m-auto bg-bazaarDarkLight p-4 shadow-2xl shadow-black rounded-md'>
        {fullData.map(
          (e) =>
            e.hero === 'No' &&
            e.rarity.includes('No') && (
              <Link
                to={`/events/${e.name}`}
                className='p-2 shadow-md bg-neutral-900 shadow-bazaarDarkest rounded-md text-center w-42 transition relative hover:shadow-lg hover:shadow-black hover:ring-1 ring-black'
                key={e.name}
              >
                <p className='text-nowrap overflow-hidden'>
                  {e.name.replaceAll('_', ' ')}
                </p>

                <img
                  src={e.image}
                  className='flex-1 w-full max-h-32 object-cover rounded-md transition-opacity duration-300 hover:opacity-50'
                  alt={`image_${e.name}`}
                />
              </Link>
            )
        )}
      </div>

      <div className='flex flex-wrap flex-1 flex-row gap-2 m-auto bg-linear-to-r from-bronze via-amber-800 to-bronze p-4 shadow-2xl shadow-black rounded-md'>
        {fullData.map(
          (e) =>
            e.hero === 'No' &&
            e.rarity.includes('Bronze') && (
              <Link
                to={`/events/${e.name}`}
                className='p-2 shadow-md bg-neutral-900 shadow-bazaarDarkest rounded-md text-center w-42 transition relative hover:shadow-lg hover:shadow-black hover:ring-1 ring-black'
                key={e.name}
              >
                <p>{e.name.replaceAll('_', ' ')}</p>

                <img
                  src={e.image}
                  className='flex-1 w-full max-h-32 object-cover rounded-md transition-opacity duration-300 hover:opacity-50'
                  alt={`image_${e.name}`}
                />
              </Link>
            )
        )}
      </div>

      <div className='flex flex-wrap flex-1 flex-row gap-2 m-auto bg-linear-to-r from-silver via-zinc-500 to-zinc-300 p-4 shadow-2xl shadow-black rounded-md'>
        {fullData.map(
          (e) =>
            e.hero === 'No' &&
            e.rarity.includes('Silver') && (
              <Link
                to={`/events/${e.name}`}
                className='p-2 shadow-md bg-neutral-900 shadow-bazaarDarkest rounded-md text-center w-42 transition relative hover:shadow-lg hover:shadow-black hover:ring-1 ring-black'
                key={e.name}
              >
                <p>{e.name.replaceAll('_', ' ')}</p>

                <img
                  src={e.image}
                  className='flex-1 w-full max-h-32 object-cover rounded-md transition-opacity duration-300 hover:opacity-50'
                  alt={`image_${e.name}`}
                />
              </Link>
            )
        )}
      </div>

      <div className='flex flex-wrap flex-1 flex-row gap-2 m-auto bg-linear-to-r from-gold via-yellow-600 to-yellow-500 p-4 shadow-2xl shadow-black rounded-md'>
        {fullData.map(
          (e) =>
            e.hero === 'No' &&
            e.rarity.includes('Gold') && (
              <Link
                to={`/events/${e.name}`}
                className='p-2 shadow-md bg-neutral-900 shadow-bazaarDarkest rounded-md text-center w-42 transition relative hover:shadow-lg hover:shadow-black hover:ring-1 ring-black'
                key={e.name}
              >
                <p>{e.name.replaceAll('_', ' ')}</p>

                <img
                  src={e.image}
                  className='flex-1 w-full max-h-32 object-cover rounded-md transition-opacity duration-300 hover:opacity-50'
                  alt={`image_${e.name}`}
                />
              </Link>
            )
        )}
      </div>

      <div className='flex flex-wrap flex-1 flex-row gap-2 m-auto shadow-2xl shadow-black bg-linear-to-r from-diamond via-cyan-500 to-cyan-400 p-4 rounded-md'>
        {fullData.map(
          (e) =>
            e.hero === 'No' &&
            e.rarity.includes('Diamond') && (
              <Link
                to={`/events/${e.name}`}
                className='p-2 shadow-md bg-neutral-900 shadow-bazaarDarkest rounded-md text-center w-42 transition relative hover:shadow-lg hover:shadow-black hover:ring-1 ring-black'
                key={e.name}
              >
                <p>{e.name.replaceAll('_', ' ')}</p>

                <img
                  src={e.image}
                  className='flex-1 w-full max-h-32 object-cover rounded-md transition-opacity duration-300 hover:opacity-50'
                  alt={`image_${e.name}`}
                />
              </Link>
            )
        )}
      </div>

      <div className='flex pb-4 gap-2 m-auto bg-linear-to-r from-hero to-purple-400 p-4 shadow-2xl shadow-black rounded-md'>
        {fullData.map(
          (e) =>
            e.hero !== 'No' && (
              <Link
                to={`/events/${e.name}`}
                className='p-2 shadow-md bg-neutral-900 shadow-bazaarDarkest rounded-md text-center w-42 transition relative hover:shadow-lg hover:shadow-black hover:ring-1 ring-black'
                key={e.name}
              >
                <p>{e.name.replaceAll('_', ' ')}</p>

                <img
                  src={e.image}
                  className='flex-1 w-full max-h-32 object-cover rounded-md transition-opacity duration-300 hover:opacity-50'
                  alt={`image_${e.name}`}
                />
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default Events;
