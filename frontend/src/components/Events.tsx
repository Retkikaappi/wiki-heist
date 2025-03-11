import { Link } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import { EventByDay } from '../types';
import { ReactNode, useState } from 'react';

const EventLink = ({ event }: { event: EventByDay }) => (
  <Link
    to={`/events/${event.name}`}
    className='p-2 shadow-md bg-neutral-900 shadow-bazaarDarkest rounded-md text-center w-36 transition relative hover:shadow-lg hover:shadow-black hover:ring-1 ring-black'
  >
    <p className='mb-1 text-nowrap overflow-clip'>{event.name}</p>

    <img
      src={event.img}
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
    className={`flex flex-wrap justify-center flex-1 flex-row gap-2 m-auto p-4 shadow-2xl shadow-black rounded-md bg-gradient-to-r ${styling}`}
  >
    {children}
  </div>
);

const EventModal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}) => {
  return isOpen ? (
    <div>
      <button
        className='p-2 m-2 bg-blue-500'
        onClick={() => setIsOpen(!isOpen)}
      >
        Click me
      </button>
      {children}
    </div>
  ) : (
    <button className='p-2 m-2 bg-blue-500' onClick={() => setIsOpen(!isOpen)}>
      Click me
    </button>
  );
};

const Events = () => {
  //maybe handle modals with useref or useimperativehandle
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { eventImages, data, isLoading, isError } = useEvents();

  if (isLoading || eventImages.isLoading) {
    return (
      <div className='pt-4 pb-20 flex flex-col h-dvh items-center bg-linear-to-b from-bazaarDark to-bazaarDarkest'>
        <div className='border-6 border-b-blue-600 animate-spin w-20 h-20 rounded-full'></div>
      </div>
    );
  }
  if (isError || !data || eventImages.isError || !eventImages.data) {
    return (
      <div className='pt-4 pb-20 flex flex-col h-dvh items-center bg-linear-to-b from-bazaarDark to-bazaarDarkest'>
        Could not find events
      </div>
    );
  }

  return (
    <div className='forepattern text-center flex flex-col gap-2 text-xs'>
      <input
        placeholder='Search for an event'
        className='bg-white text-black text-center placeholder-grey mx-auto my-2 p-2'
      />

      <EventModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <EventWrapper styling='from-bronze via-amber-800 to-bronze'>
          {eventImages.data.map(
            (e) =>
              e.isHeroEvent === 'No' &&
              e.rarity.includes('Bronze') && (
                <EventLink key={e.name} event={e} />
              )
          )}
        </EventWrapper>
      </EventModal>
      <EventModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <EventWrapper styling='from-silver via-zinc-500 to-zinc-300'>
          {eventImages.data.map(
            (e) =>
              e.isHeroEvent === 'No' &&
              e.rarity.includes('Silver') && (
                <EventLink key={e.name} event={e} />
              )
          )}
        </EventWrapper>
      </EventModal>
      <EventModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <EventWrapper styling='from-gold via-yellow-600 to-yellow-500'>
          {eventImages.data.map(
            (e) =>
              e.isHeroEvent === 'No' &&
              e.rarity.includes('Gold') && <EventLink key={e.name} event={e} />
          )}
        </EventWrapper>
      </EventModal>
      <EventModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <EventWrapper styling='from-diamond via-cyan-500 to-cyan-400'>
          {eventImages.data.map(
            (e) =>
              e.isHeroEvent === 'No' &&
              e.rarity.includes('Diamond') && (
                <EventLink key={e.name} event={e} />
              )
          )}
        </EventWrapper>
      </EventModal>
      <EventModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <EventWrapper styling='from-hero to-purple-400'>
          {eventImages.data.map(
            (e) =>
              e.isHeroEvent !== 'No' && <EventLink key={e.name} event={e} />
          )}
        </EventWrapper>
      </EventModal>
    </div>
  );
};

export default Events;
