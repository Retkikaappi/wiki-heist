import { Link } from 'react-router-dom';
import { EventByDay, EventData } from '../../types';
import { ReactNode, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { UseQueryResult } from '@tanstack/react-query';
import ErrorComponent from '../../ErrorComponent';
import LoadingDots from '../Loading/LoadingDots';

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
    className={`flex flex-wrap justify-center flex-1 flex-row gap-2 m-auto max-w-3/4 p-4 shadow-2xl shadow-black rounded-md bg-gradient-to-r ${styling}`}
  >
    {children}
  </div>
);

const EventModal = ({
  children,
  styling,
  label,
}: {
  children: ReactNode;
  styling: string;
  label: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return isOpen ? (
    <div>
      <button
        className={`p-3 mb-2 cursor-pointer rounded-md text-md font-bold bg-gradient-to-r bg-blue-700 shadow-sm shadow-black hover:from-blue-400 hover:via-blue-500 hover:to-blue-500 transition`}
        onClick={() => setIsOpen(false)}
      >
        Close {label}
      </button>
      {children}
    </div>
  ) : (
    <button
      className={`p-3 text-md font-bold self-center rounded-md w-50 shadow-sm shadow-black cursor-pointer transition hover:ring-1 hover:brightness-150 bg-neutral-900 text-gradient ${styling}`}
      onClick={() => setIsOpen(true)}
    >
      <span
        className={`text-lg bg-gradient-to-r ${styling} text-transparent bg-clip-text`}
      >
        {label}
      </span>
    </button>
  );
};

const Events = ({
  events,
  eventImages,
}: {
  events: UseQueryResult<EventData[], Error>;
  eventImages: UseQueryResult<EventByDay[], Error>;
}) => {
  const [search, setSearch] = useState<string | null>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce((val) => {
        setSearch(val);
      }, 250),
    []
  );

  const filteredEvents =
    search &&
    eventImages.data &&
    eventImages.data.filter((e) => e.name.toLowerCase().includes(search));

  return (
    <div className='forepattern text-center flex flex-col gap-2 text-xs'>
      <input
        placeholder='Search for an event'
        className='bg-white w-50 rounded-md text-black text-center placeholder-grey mx-auto my-2 p-2'
        onChange={({ target }) => debouncedSearch(target.value)}
        autoFocus
      />
      {search ? (
        filteredEvents && filteredEvents.length > 0 ? (
          <EventWrapper styling='forepattern'>
            {filteredEvents.map((e) => (
              <EventLink key={e.name} event={e} />
            ))}
          </EventWrapper>
        ) : (
          <div className='items-center text-lg'>Could not find events</div>
        )
      ) : events.isLoading || eventImages.isLoading ? (
        <>
          <EventModal label='Bronze' styling='from-bronze to-amber-600'>
            <LoadingDots />
          </EventModal>
          <EventModal label='Silver' styling='from-silver to-zinc-300'>
            <LoadingDots />
          </EventModal>
          <EventModal label='Gold' styling='from-gold to-yellow-500'>
            <LoadingDots />
          </EventModal>
          <EventModal label='Diamond' styling='from-diamond to-cyan-400'>
            <LoadingDots />
          </EventModal>
          <EventModal label='Hero' styling='from-hero to-purple-500'>
            <LoadingDots />
          </EventModal>
        </>
      ) : events.isError || eventImages.isError ? (
        <ErrorComponent
          msg='Could not find events'
          failReason={events.failureReason || eventImages.failureReason}
        />
      ) : (
        eventImages.data && (
          <>
            <EventModal label='Bronze' styling='from-bronze to-amber-600'>
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
            <EventModal label='Silver' styling='from-silver to-zinc-300'>
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
            <EventModal label='Gold' styling='from-gold to-yellow-500'>
              <EventWrapper styling='from-gold via-yellow-600 to-yellow-500'>
                {eventImages.data.map(
                  (e) =>
                    e.isHeroEvent === 'No' &&
                    e.rarity.includes('Gold') && (
                      <EventLink key={e.name} event={e} />
                    )
                )}
              </EventWrapper>
            </EventModal>
            <EventModal label='Diamond' styling='from-diamond to-cyan-400'>
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
            <EventModal label='Hero' styling='from-hero to-purple-500'>
              <EventWrapper styling='from-hero to-purple-400'>
                {eventImages.data.map(
                  (e) =>
                    e.isHeroEvent !== 'No' && (
                      <EventLink key={e.name} event={e} />
                    )
                )}
              </EventWrapper>
            </EventModal>
          </>
        )
      )}
    </div>
  );
};

export default Events;
