import { ItemsDataNew } from '../../types';

const ItemCard = ({
  item,
  handleMag,
}: {
  item: ItemsDataNew;
  handleMag: (item: ItemsDataNew) => void;
}) => (
  <div
    onClick={() => handleMag(item)}
    className={`p-1 gap-1 flex flex-1 hover:brightness-125 hover:ring-1 bg-neutral-900 rounded-sm cursor-pointer h-40`}
  >
    <div className='overflow-hidden flex-1 content-center justify-items-center'>
      <img src={item.img} className='rounded-sm object-contain h-full w-full' />
    </div>
    <div className='flex-4 px-1 pl-1'>
      <div className=''>
        <p>{item.name}</p>
      </div>
      {item.effect.length > 100 ? (
        <div className='p-1 ring-1 ring-bronze rounded-sm my-1'>
          <p className='text-sm text-bronze'>
            {item.effect.substring(0, 100)}...
          </p>
        </div>
      ) : (
        <div className='p-1 ring-1 ring-bronze rounded-sm my-1'>
          <p className='text-sm text-bronze'>{item.effect}</p>
        </div>
      )}
      <div className='p-1 ring-1 ring-green-700 rounded-sm my-1'>
        <p className='text-sm text-green-500'>{item.types}</p>
      </div>
      <div className='p-1 ring-1 ring-hero rounded-sm'>
        <p className='text-sm text-hero'>
          {item.hero.split('_')[0]} - {item.size}
        </p>
      </div>
    </div>
  </div>
);

export default ItemCard;
