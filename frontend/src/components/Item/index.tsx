import { useMemo, useState } from 'react';
import useItems from '../../hooks/useItems';
import ItemCard from './ItemCard';
import Loading from '../Loading';
import ErrorComponent from '../../ErrorComponent';
import LoadingDots from '../Loading/LoadingDots';
import debounce from 'lodash.debounce';

const FilterBtn = ({
  type,
  handleClick,
  activeType,
}: {
  type: string;
  handleClick: () => void;
  activeType: string;
}) => {
  return (
    <button
      onClick={handleClick}
      className={`p-1 m-1 bg-neutral-900 rounded-sm hover:brightness-125 hover:ring-1 cursor-pointer
        ${activeType === type && 'text-blue-500 underline'}`}
    >
      {type}
    </button>
  );
};

const Items = () => {
  const [type, setType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const { someItems, types, withType, withName } = useItems(type, name);

  const debouncedSearch = useMemo(
    () =>
      debounce((val) => {
        setName(val);
      }, 600),
    []
  );

  const handleClick = (type: string) => {
    setNameInput('');
    setName('');
    setType(type);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType('');
    debouncedSearch(e.target.value);
    setNameInput(e.target.value);
  };

  return (
    <div className='text-center'>
      <div className=''>
        <input
          className='bg-white w-50 text-xs rounded-md text-black text-center placeholder-grey mx-auto my-2 p-2'
          placeholder='Search with item name'
          onChange={handleNameChange}
          value={nameInput}
          autoFocus
        />
        <br />

        {types.data ? (
          types.data.map((e) => (
            <FilterBtn
              activeType={type}
              handleClick={() => handleClick(e)}
              type={e}
              key={e}
            />
          ))
        ) : types.isLoading ? (
          <LoadingDots />
        ) : (
          <ErrorComponent
            msg='Cannot find types'
            failReason={types.failureReason}
          />
        )}
      </div>

      {withType.isLoading || withName.isLoading || someItems.isLoading ? (
        <Loading />
      ) : withName.isError || withType.isError || someItems.isError ? (
        <ErrorComponent
          msg='Error loading item data'
          failReason={
            withName.failureReason ||
            withType.failureReason ||
            someItems.failureReason
          }
        />
      ) : name !== '' ? (
        withName.data && (
          <div className='mt-4 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-5/6 m-auto'>
            {withName.data.map((item, index) => (
              <ItemCard item={item} key={`item_${index}`} />
            ))}
          </div>
        )
      ) : type !== '' ? (
        withType.data && (
          <div className='mt-4 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-5/6 m-auto'>
            {withType.data.map((item, index) => (
              <ItemCard item={item} key={`item_${index}`} />
            ))}
          </div>
        )
      ) : (
        someItems.data && (
          <div className='mt-4 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-5/6 m-auto'>
            {someItems.data.map((item, index) => (
              <ItemCard item={item} key={`item_${index}`} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Items;
