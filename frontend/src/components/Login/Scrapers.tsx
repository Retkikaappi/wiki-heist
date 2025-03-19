const Scrapers = () => {
  return (
    <div className='p-4 flex flex-col gap-4'>
      <button
        className={`p-3 text-sm font-bold rounded-md w-40 shadow-sm shadow-black cursor-pointer transition hover:ring-1 hover:brightness-150 bg-neutral-900`}
      >
        Scrape Events
      </button>
      <button
        className={`p-3 text-sm font-bold rounded-md w-40 shadow-sm shadow-black cursor-pointer transition hover:ring-1 hover:brightness-150 bg-neutral-900`}
      >
        Scrape EventImages
      </button>
      <button
        className={`p-3 text-sm font-bold rounded-md w-40 shadow-sm shadow-black cursor-pointer transition hover:ring-1 hover:brightness-150 bg-neutral-900`}
      >
        Scrape Monsters
      </button>
      <button
        className={`p-3 text-sm font-bold rounded-md w-40 shadow-sm shadow-black cursor-pointer transition hover:ring-1 hover:brightness-150 bg-neutral-900`}
      >
        Scrape MonsterImages
      </button>
    </div>
  );
};

export default Scrapers;
