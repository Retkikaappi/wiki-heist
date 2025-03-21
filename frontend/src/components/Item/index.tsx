import { useEffect, useState } from 'react';
import useItems from '../../hooks/useItems';
import { itemsDataNew } from '../../types';

const Item = ({ item }: { item: itemsDataNew }) => (
  <div
    className={`p-2 flex flex-1 hover:brightness-125 hover:ring-1 bg-neutral-900`}
  >
    <div className='overflow-hidden h-25 content-center'>
      <img src={item.img} className='' />
    </div>
    <div className='m-auto'>
      <p>Name: {item.name}</p>
      <p className='text-sm'>{item.effect}</p>
      <p className='text-sm'>{item.types}</p>
      <p className='text-sm'>
        {item.hero.split('_')[0]} - {item.size}
      </p>
    </div>
  </div>
);

const Items = () => {
  const { someItems } = useItems();
  const [items, setItems] = useState<itemsDataNew[] | null>(null);

  useEffect(() => {
    if (someItems.data) {
      setItems(someItems.data);
    }
  }, [someItems.data]);

  if (!someItems.data || someItems.isError) {
    return (
      <div className='pt-4 pb-20 flex flex-col items-center'>
        <p>No items found</p>
      </div>
    );
  }

  if (someItems.isLoading) {
    return (
      <div className='pt-4 pb-20 flex flex-col items-center'>
        <div className='border-6 border-b-blue-600 animate-spin w-20 h-20 rounded-full'></div>
      </div>
    );
  }

  const setSize = (size: number) => {
    setItems(someItems.data.slice(0, size));
  };

  return (
    <div className='text-center'>
      <button
        className='p-1 m-1 bg-neutral-900 rounded-sm hover:brightness-125 hover:ring-1 cursor-pointer'
        onClick={() => setSize(11)}
      >
        Filter to 10
      </button>
      <button
        className='p-1 m-1 bg-neutral-900 rounded-sm hover:brightness-125 hover:ring-1 cursor-pointer'
        onClick={() => setSize(21)}
      >
        Filter to 20
      </button>
      <button
        className='p-1 m-1 bg-neutral-900 rounded-sm hover:brightness-125 hover:ring-1 cursor-pointer'
        onClick={() => setSize(51)}
      >
        Filter to 50
      </button>

      <div className='mt-4 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-5/6 m-auto'>
        {items &&
          items.map((item, index) => (
            <Item item={item} key={`item_${index}`} />
          ))}
      </div>
    </div>
  );
};

export default Items;
