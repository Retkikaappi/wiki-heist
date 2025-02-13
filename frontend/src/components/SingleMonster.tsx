import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSingleMonster } from '../services/monsterService';
import { MouseEvent, useState } from 'react';
import { SkillData, itemsData } from '../types';

type Info = {
  x: number;
  y: number;
  content: SkillData | itemsData;
};

const Tooltip = ({ tooltipInfo: { x, y, content } }: { tooltipInfo: Info }) => {
  console.log('content', content);
  return (
    <div style={{ left: x, top: y }} className='absolute bg-tooltip p-1'>
      <p className='font-bold'>{content.name}</p>
      <p>{content.effects}</p>
      {'size' in content ? (
        <>
          <p>Size: {content.size}</p>
          {content.types && <p>Types: {content.types}</p>}
        </>
      ) : (
        <>
          <p>Starting tier: {content.startingTier}</p>
        </>
      )}
    </div>
  );
};

const SingleMonster = () => {
  const [mouseOver, setMouseover] = useState<boolean>(false);
  const [tooltipInfo, setTooltipInfo] = useState<Info>({
    x: 0,
    y: 0,
    content: {} as SkillData,
  });
  const { monsterName } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['monster', monsterName],
    queryFn: () => getSingleMonster(monsterName!),
  });

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

  const enter = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    e: SkillData | itemsData
  ) => {
    console.log(event);
    console.log(e);
    setMouseover(true);
    setTooltipInfo({ x: event.clientX, y: event.clientY, content: e });
  };

  const leave = () => {
    setMouseover(false);
  };

  return (
    <>
      <div className='pt-4 pb-20 flex flex-col items-center bg-neutral-900'>
        <img src={data.image} alt={data.name} className='h-30 rounded-md' />
        <p>skills:</p>
        <div className='flex flex-row gap-4 p-2'>
          {data.skills.map((e) => (
            <div
              key={e.name}
              className='p-1 text-center bg-neutral-800 rounded-md'
              onMouseEnter={(r) => enter(r, e as SkillData)}
              onMouseLeave={leave}
            >
              <p>{e.name}</p>
              <img className='h-30 m-auto rounded-md' src={e.sprite} />
            </div>
          ))}
        </div>
        <p>items:</p>
        <div className='flex flex-row gap-4 p-2'>
          {data.items.map((e) => (
            <div
              key={e.name}
              className='p-1 text-center bg-neutral-800 rounded-md'
            >
              <p>{e.name}</p>
              <p>{e.size}</p>
              <p>{e.types}</p>
              <img
                className='h-40 m-auto rounded-md'
                src={e.sprite}
                onMouseEnter={(event) => enter(event, e as itemsData)}
                onMouseLeave={leave}
              />
            </div>
          ))}
        </div>
      </div>
      {mouseOver && <Tooltip tooltipInfo={tooltipInfo} />}
    </>
  );
};

export default SingleMonster;
