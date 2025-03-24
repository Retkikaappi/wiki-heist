import { useEffect, useState } from 'react';
import useItems from '../../hooks/useItems';
import { itemsDataNew } from '../../types';
import Loading from '../Loading';

const Item = ({ item }: { item: itemsDataNew }) => (
  <div
    className={`p-2 flex flex-1 hover:brightness-125 hover:ring-1 bg-neutral-900 rounded-sm cursor-pointer`}
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

const FilterBtn = ({
  type,
  handleClick,
}: {
  type: string;
  handleClick: () => void;
}) => {
  return (
    <button
      onClick={handleClick}
      className='p-1 m-1 bg-neutral-900 rounded-sm hover:brightness-125 hover:ring-1 cursor-pointer'
    >
      {type}
    </button>
  );
};

const Items = () => {
  const [type, setType] = useState<string>('');
  const { someItems, types, withType } = useItems(type);
  const [items, setItems] = useState<itemsDataNew[] | null>(null);

  // useEffect(() => {
  //   if (someItems.data) {
  //     setItems(someItems.data);
  //   }
  // }, [someItems.data]);

  if (!someItems.data || someItems.isError || !types.data || types.isError) {
    return (
      <div className='pt-4 pb-20 flex flex-col items-center'>
        <p>No items found</p>
      </div>
    );
  }

  const handleClick = (type: string) => {
    setType(type);
  };

  return (
    <div className='text-center'>
      <div className=''>
        <input
          className='m-1 rounded-sm p-1 w-50 bg-white text-center placeholder-gray-700'
          placeholder='I do nothing yet'
        />
        <button className='m-1 p-1 bg-neutral-900 rounded-sm hover:brightness-125 hover:ring-1 cursor-pointer'>
          Search
        </button>
        <br />
        {types.data.map((e) => (
          <FilterBtn handleClick={() => handleClick(e)} type={e} key={e} />
        ))}
      </div>

      <div className='mt-4 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-5/6 m-auto'>
        {someItems.isLoading || types.isLoading || withType.isLoading ? (
          <Loading />
        ) : withType ? (
          withType.data?.map((item, index) => (
            <Item item={item} key={`item_${index}`} />
          ))
        ) : (
          items &&
          items.map((item, index) => <Item item={item} key={`item_${index}`} />)
        )}
      </div>
    </div>
  );
};

export default Items;
