import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSingleMonster } from '../services/monsterService';

const SingleMonster = () => {
  const { monsterName } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['monster', monsterName],
    queryFn: () => getSingleMonster(monsterName!),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Could not find monster</div>;
  }

  return (
    <div className='mt-8 flex justify-center'>
      <img src={data.image} alt={data.name} className='h-30' />
      <div className='border mx-2 p-2'>
        <p>skills:</p>
        <ul>
          {data.skills.map((e) => (
            <>
              <li key={e.name}>{e.name}</li>
              <img src={e.sprite} />
            </>
          ))}
        </ul>
      </div>

      <div className='border mx-2 p-2'>
        <p>items:</p>
        <ul>
          {data.items.map((e) => (
            <>
              <li key={e.name}>{e.name}</li>
              <img src={e.sprite} />
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleMonster;
