import { Link } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import { EventDataWithRarity } from '../types';

const EventLink = ({ event }: { event: EventDataWithRarity }) => (
  <Link
    to={`/events/${event.name}`}
    className='p-2 shadow-md bg-neutral-900 shadow-bazaarDarkest rounded-md text-center w-36 transition relative hover:shadow-lg hover:shadow-black hover:ring-1 ring-black'
  >
    <p className='mb-1 text-nowrap overflow-clip'>
      {event.name.replaceAll('_', ' ')}
    </p>

    <img
      src={event.image}
      className='flex-1 w-full max-h-32 object-cover rounded-md transition-opacity duration-300 hover:opacity-50'
      alt={`image_${event.name}`}
    />
  </Link>
);

const EventWrapper = ({
  styling,
  children,
}: {
  children: React.ReactNode;
  styling: string;
}) => (
  <div
    className={`flex flex-wrap flex-1 flex-row gap-2 m-auto p-4 shadow-2xl shadow-black rounded-md bg-gradient-to-r ${styling}`}
  >
    {children}
  </div>
);

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

  const fullData: EventDataWithRarity[] = data.map((e) => {
    const match = eventDays.find((r) => e.name === r.name);
    return match
      ? { ...e, rarity: match.rarity, hero: match.hero }
      : { ...e, rarity: 'No', hero: 'No' };
  });

  return (
    <div className='forepattern text-center flex flex-col gap-2 text-xs'>
      <EventWrapper styling='bg-bazaarDarkLight'>
        {fullData.map(
          (e) =>
            e.hero === 'No' &&
            e.rarity.includes('No') && <EventLink key={e.name} event={e} />
        )}
      </EventWrapper>

      <EventWrapper styling='from-bronze via-amber-800 to-bronze'>
        {fullData.map(
          (e) =>
            e.hero === 'No' &&
            e.rarity.includes('Bronze') && <EventLink key={e.name} event={e} />
        )}
      </EventWrapper>

      <EventWrapper styling='from-silver via-zinc-500 to-zinc-300'>
        {fullData.map(
          (e) =>
            e.hero === 'No' &&
            e.rarity.includes('Silver') && <EventLink key={e.name} event={e} />
        )}
      </EventWrapper>

      <EventWrapper styling='from-gold via-yellow-600 to-yellow-500'>
        {fullData.map(
          (e) =>
            e.hero === 'No' &&
            e.rarity.includes('Gold') && <EventLink key={e.name} event={e} />
        )}
      </EventWrapper>

      <EventWrapper styling='from-diamond via-cyan-500 to-cyan-400'>
        {fullData.map(
          (e) =>
            e.hero === 'No' &&
            e.rarity.includes('Diamond') && <EventLink key={e.name} event={e} />
        )}
      </EventWrapper>

      <EventWrapper styling='from-hero to-purple-400'>
        {fullData.map(
          (e) => e.hero !== 'No' && <EventLink key={e.name} event={e} />
        )}
      </EventWrapper>
    </div>
  );
};

export default Events;
