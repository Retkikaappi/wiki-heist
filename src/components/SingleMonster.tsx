import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSingleMonster } from '../services/monsterService';

const SingleMonster = () => {
  const { monsterName } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['monster', monsterName],
    queryFn: () => getSingleMonster(monsterName!),
  });
  console.log(data);

  if (isLoading) {
    return <div className='mt-8 flex flex-col items-center'>Loading...</div>;
  }
  if (isError || !data) {
    return (
      <div className='mt-8 flex flex-col items-center'>
        Could not find monster
      </div>
    );
  }

  return (
    <div className='pt-4 mt-4 flex flex-col items-center bg-neutral-900'>
      <img src={data.image} alt={data.name} className='h-30 rounded-md' />
      <p>skills:</p>
      <div className='flex flex-row gap-4 mt-2 p-2'>
        {data.skills.map((e) => (
          <div
            key={e.name}
            className='p-1 text-center bg-neutral-800 rounded-md'
          >
            <p>{e.name}</p>
            <img className='h-30 m-auto rounded-md' src={e.sprite} />
          </div>
        ))}
      </div>
      <p>items:</p>
      <div className='flex flex-row gap-4 mx-2 p-2'>
        {data.items.map((e) => (
          <div
            key={e.name}
            className='p-1 text-center bg-neutral-800 rounded-md'
          >
            <p>{e.name}</p>
            <p>{e.size}</p>
            <p>{e.types}</p>
            <img className='h-40 m-auto rounded-md' src={e.sprite} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleMonster;
