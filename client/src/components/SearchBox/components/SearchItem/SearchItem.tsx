import clsx from 'clsx'
import { motion as m } from 'framer-motion'
import type { FC } from 'react'

import type { Additive } from '@/common'
import { CheckIcon } from '@/components'

interface SearchItemProps {
  additive: Additive
  isSelected: boolean
  toggleAdditive: (additive: Additive) => void
}

export const SearchItem: FC<SearchItemProps> = ({ additive, toggleAdditive, isSelected }) => {
  const { name, code, danger } = additive
  const background = clsx(
    { 'bg-danger-0 hover:bg-danger-0-hover': danger.level === 0 },
    { 'bg-danger-1 hover:bg-danger-1-hover': danger.level === 1 },
    { 'bg-danger-2 hover:bg-danger-2-hover': danger.level === 2 },
    { 'bg-danger-3 hover:bg-danger-3-hover': danger.level === 3 },
    { 'bg-danger-4 hover:bg-danger-4-hover': danger.level === 4 },
    { 'bg-danger-5 hover:bg-danger-5-hover': danger.level === 5 }
  )

  return (
    <m.li
      className={`flex w-full cursor-pointer items-center gap-x-2 p-3 text-dark transition duration-100 ${background}`}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => toggleAdditive(additive)}
    >
      <div>
        <strong>{code}</strong>
      </div>
      <div>{name}</div>
      {isSelected && (
        <div className='ml-auto flex items-center gap-x-2'>
          <span>выбрано</span>
          <CheckIcon className='h-6 w-6 text-violet-600' />
        </div>
      )}
    </m.li>
  )
}

export * from './components/CheckIcon'
