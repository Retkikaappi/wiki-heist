import { useState } from 'react';

const Items = () => {
  const [size, setsize] = useState(50);

  return (
    <div className='text-center'>
      <button
        className='p-1 m-1 bg-neutral-900 rounded-sm hover:brightness-125 hover:ring-1 cursor-pointer'
        onClick={() => setsize(10)}
      >
        Filter to 10
      </button>
      <button
        className='p-1 m-1 bg-neutral-900 rounded-sm hover:brightness-125 hover:ring-1 cursor-pointer'
        onClick={() => setsize(20)}
      >
        Filter to 20
      </button>
      <button
        className='p-1 m-1 bg-neutral-900 rounded-sm hover:brightness-125 hover:ring-1 cursor-pointer'
        onClick={() => setsize(50)}
      >
        Filter to 50
      </button>

      <div className='flex flex-wrap pt-4 gap-2 justify-center'>
        {[...Array(size)].map((_e, index) => (
          <div
            className='w-25 h-25 bg-neutral-800 hover:brightness-150 hover:ring-1'
            key={`item_${index}`}
          >
            I am an item WIP
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
