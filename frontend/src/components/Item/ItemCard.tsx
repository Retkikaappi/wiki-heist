import { itemsDataNew } from '../../types';

const ItemCard = ({ item }: { item: itemsDataNew }) => (
  <div
    className={`p-1 gap-1 flex flex-1 hover:brightness-125 hover:ring-1 bg-neutral-900 rounded-sm cursor-pointer`}
  >
    <div className='overflow-hidden flex-2 content-center justify-items-center'>
      <img src={item.img} className='rounded-sm' />
    </div>
    <div className='m-auto flex-4 pr-1'>
      <div className=''>
        <p>{item.name}</p>
      </div>
      <div className='ring-1 ring-bronze rounded-sm my-1'>
        <p className='text-sm text-bronze'>{item.effect}</p>
      </div>
      <div className='ring-1 ring-green-700 rounded-sm my-1'>
        <p className='text-sm text-green-500'>{item.types}</p>
      </div>
      <div className='ring-1 ring-hero rounded-sm'>
        <p className='text-sm text-hero'>
          {item.hero.split('_')[0]} - {item.size}
        </p>
      </div>
    </div>
  </div>
);

export default ItemCard;
