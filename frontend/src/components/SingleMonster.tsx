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
    return (
      <div className='pt-4 pb-20 flex flex-col h-dvh items-center bg-linear-to-b from-bazaarDark to-bazaarDarkest'>
        <div className='border-6 border-b-blue-600 animate-spin w-20 h-20 rounded-full'></div>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className='pt-4 pb-20 flex flex-col h-dvh items-center bg-linear-to-b from-bazaarDark to-bazaarDarkest'>
        Could not find monster
      </div>
    );
  }

  const enter = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    e: SkillData | itemsData
  ) => {
    setMouseover(true);
    setTooltipInfo({ x: event.clientX, y: event.clientY, content: e });
  };

  const leave = () => {
    setMouseover(false);
  };

  return (
    <>
      <div className='pt-4 pb-20 flex flex-col gap-4 items-center selector'>
        <img
          src={data.boardImage}
          alt={`${data.name}-board`}
          className='h-60 rounded-xs'
        />
        {data.skills.length > 0 && (
          <div className='flex flex-row gap-4 p-2 px-8 skillsPanel rounded-xs shadow-xl shadow-bazaarDarkest'>
            {data.skills.map((e) => (
              <div
                key={e.name}
                className='p-1 text-center'
                onMouseEnter={(r) => enter(r, e as SkillData)}
                onMouseLeave={leave}
              >
                <p>{e.name}</p>

                <div className='h-24 rounded-xs'>
                  <img
                    className='m-auto w-24 h-24 rounded-full ring-1 ring-bazaarDarkest'
                    src={e.sprite}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className='flex flex-row gap-4 p-2 px-8 itemsPanel rounded-xs shadow-xl shadow-bazaarDarkest'>
          {data.items.map((e) => (
            <div key={e.name} className='p-1 text-center'>
              <p className='mb-2'>{e.name}</p>

              <div className='h-32 rounded-xs'>
                <img
                  className='h-full m-auto rounded-xs ring-1 ring-bazaarDarkest'
                  src={e.sprite}
                  onMouseEnter={(event) => enter(event, e as itemsData)}
                  onMouseLeave={leave}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {mouseOver && <Tooltip tooltipInfo={tooltipInfo} />}
    </>
  );
};

export default SingleMonster;
