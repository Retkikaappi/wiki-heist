import { ItemsDataNew } from '../../types';

const LargeItem = ({
  largeItem,
  setLargeItem,
}: {
  largeItem: ItemsDataNew | null;
  setLargeItem: React.Dispatch<React.SetStateAction<ItemsDataNew | null>>;
}) => {
  if (largeItem) {
    return (
      <div
        onClick={() => setLargeItem(null)}
        className='z-10 fixed inset-0 flex justify-center w-dvw h-dvh bg-largeItemBg'
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className='z-11 flex justify-center align-center p-10 w-3/4 h-4/6 bg-neutral-800 rounded-md shadow-lg shadow-black'
        >
          <div className='rounded-lg overflow-hidden flex-2 content-center justify-items-center'>
            <img
              src={largeItem.img}
              className='rounded-sm object-contain w-full h-full'
            />
          </div>
          <div className='flex-4 px-2 pl-4'>
            <div className='my-4 '>
              <p className='text-2xl'>{largeItem.name}</p>
            </div>
            <div className='p-4 ring-1 ring-bronze rounded-sm my-4'>
              <p className='text-md text-bronze'>{largeItem.effect}</p>
            </div>
            <div className='p-2 ring-1 ring-green-700 rounded-sm my-4'>
              <p className='text-lg text-green-500'>{largeItem.types}</p>
            </div>
            <div className='p-2 ring-1 ring-hero rounded-sm'>
              <p className='text-lg text-hero'>
                {largeItem.hero.split('_')[0]} - {largeItem.size}
              </p>
            </div>
          </div>
          <button
            className='p-2 m-2 w-40 h-12 cursor-pointer bg-amber-700 hover:brightness-115 transition hover:ring-1 ring-neutral-500 rounded-sm'
            onClick={() => setLargeItem(null)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  return null;
};

export default LargeItem;
