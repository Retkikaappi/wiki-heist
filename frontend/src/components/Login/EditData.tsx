import { useNavigate } from 'react-router-dom';
import {
  ActiveData,
  EventData,
  ItemsDataNew,
  MonsterData,
  SingleDataDisplay,
} from '../../types';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEvent } from '../../services/eventService';
import { updateItem } from '../../services/itemService';
import { updateMonster } from '../../services/monsterService';

const EditData = ({
  data,
  dataType,
}: {
  data: SingleDataDisplay;
  dataType: ActiveData;
}) => {
  const qc = useQueryClient();
  const nav = useNavigate();
  const mutateEvent = useMutation({
    mutationFn: (updatedObj: EventData) => updateEvent(updatedObj),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
  const mutateItem = useMutation({
    mutationFn: (updatedObj: ItemsDataNew) => updateItem(updatedObj),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['items'] }),
  });
  const mutateMonster = useMutation({
    mutationFn: (updatedObj: MonsterData) => updateMonster(updatedObj),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['monsters'] }),
  });
  const [formData, setFormData] = useState(() => ({ ...data }));

  let assertedData: SingleDataDisplay | null = null;
  switch (dataType) {
    case 'Monsters':
      assertedData = data as MonsterData;
      break;
    case 'Events':
      assertedData = data as EventData;
      break;
    case 'AllItems':
      assertedData = data as ItemsDataNew;
      break;
    default:
      return null;
  }

  if (!assertedData) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure?')) {
      console.log(data);
      console.log(formData);
      switch (dataType) {
        case 'Events':
          mutateEvent.mutate(formData as EventData);
          nav(-1);
          break;
        case 'Monsters':
          mutateMonster.mutate(formData as MonsterData);
          nav(-1);
          break;
        case 'AllItems':
          mutateItem.mutate(formData as ItemsDataNew);
          nav(-1);
          break;
        default:
          break;
      }
    } else {
      nav(-1);
    }
  };
  return (
    <div className='flex flex-col justify-center items-center'>
      <button
        className='h-14 w-50 rounded-md text-center content-center shadow-sm shadow-black hover:from-blue-400 hover:via-blue-500 hover:to-blue-500 transition bg-linear-to-br from-blue-900 via-blue-900 to-blue-950 hover:cursor-pointer'
        onClick={() => nav(-1)}
      >
        Go back
      </button>
      <form
        onSubmit={handleSubmit}
        className='m-auto flex flex-col w-3/4 justify-center items-center'
      >
        {Object.entries(assertedData).map(([key], index) => (
          <div className='' key={`input_${index}`}>
            <label>{key}</label>
            <br />
            <textarea
              name={key}
              className='w-100 min-h-10 h-20 p-1 bg-white text-black disabled:bg-neutral-400'
              value={
                (formData as typeof assertedData)?.[
                  key as keyof typeof assertedData
                ] ?? ''
              }
              onChange={handleChange}
              disabled={key === 'id'}
            />
          </div>
        ))}
        <button
          type='submit'
          className={`p-1 m-2 w-50 h-14 bg-neutral-900 rounded-sm hover:brightness-125 hover:ring-1 cursor-pointer
          `}
          disabled={mutateEvent.isPending}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditData;
