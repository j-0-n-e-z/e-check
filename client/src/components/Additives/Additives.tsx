import type { FC } from 'react'

import { Additive } from './components/Additive'

interface AdditivesProps {
  selectedAdditives: Additive[]
}

export const Additives: FC<AdditivesProps> = ({ selectedAdditives }) => {
  const headerText = selectedAdditives.length ? 'Selected additives' : 'No additives selected'

  return (
    <div className='w-[500px]'>
      <h3 className='mb-4 text-center text-xl text-white'>{headerText}</h3>
      <ul className='space-y-2'>
        {selectedAdditives.map((additive) => (
          <Additive key={additive._id} {...additive} />
        ))}
      </ul>
    </div>
  )
}
