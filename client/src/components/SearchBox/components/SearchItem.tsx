import clsx from 'clsx'
import { motion as m } from 'framer-motion'
import type { FC } from 'react'

import type { Additive } from '@/common'

import { CheckIcon } from './CheckIcon'

interface SearchItemProps {
  additive: Additive
  isSelected: boolean
  selectAdditive: (additive: Additive) => void
}

export const SearchItem: FC<SearchItemProps> = ({ additive, selectAdditive, isSelected }) => {
  const { name, code, danger } = additive
  const background = clsx(
    { 'bg-green-100 hover:bg-green-200': danger.level === 0 },
    { 'bg-green-300 hover:bg-green-500': danger.level === 1 },
    { 'bg-yellow-200 hover:bg-yellow-300': danger.level === 2 },
    { 'bg-orange-300 hover:bg-orange-400': danger.level === 3 },
    { 'bg-red-300 hover:bg-red-400': danger.level === 4 },
    { 'bg-red-500 hover:bg-red-600': danger.level === 5 }
  )

  return (
    <m.li
      className={`flex w-full cursor-pointer items-center gap-x-2 p-3 text-dark transition duration-100 ${background}`}
      onClick={() => selectAdditive(additive)}
    >
      <div>{code}</div>
      <div>{name}</div>
      {isSelected && <CheckIcon className='ml-auto h-6 w-6' />}
    </m.li>
  )
}
