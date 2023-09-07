import type { FC } from 'react'

import type { Additive as IAdditive } from '@/common'

import { Additive } from './components/Additive/Additive'

interface AdditivesProps {
  selectedAdditives: IAdditive[]
  clearSelectedAdditives: () => void
}

export const Additives: FC<AdditivesProps> = ({ selectedAdditives, clearSelectedAdditives }) => {
  const isAnyAdditiveSelected = selectedAdditives.length > 0

  return (
    <div className='mb-6 max-w-[1440px]'>
      <h3 className='my-4 text-center text-xl text-dark'>
        {isAnyAdditiveSelected ? 'Выбранные добавки' : 'Добавки не выбраны'}
      </h3>
      {isAnyAdditiveSelected && (
        <div className='mb-6 flex justify-center gap-x-4'>
          <button className='rounded-xl bg-white p-3 text-sm text-dark'>
            Добавить продукт в список
          </button>
          <button
            className='rounded-xl bg-white p-3 text-sm text-dark transition hover-hover:hover:bg-dark-whity'
            onClick={clearSelectedAdditives}
          >
            Очистить
          </button>
        </div>
      )}
      <ul className='flex flex-wrap justify-center gap-5'>
        {selectedAdditives.map((additive) => (
          <Additive key={additive._id} {...additive} />
        ))}
      </ul>
    </div>
  )
}
