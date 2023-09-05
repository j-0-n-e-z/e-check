import clsx from 'clsx'
import type { FC } from 'react'

import type { Additive } from '@/common'

interface SearchItemProps {
  additive: Additive
  isSelected: boolean
  selectAdditive: (additive: Additive) => void
}

export const SearchItem: FC<SearchItemProps> = ({ additive, selectAdditive, isSelected }) => {
  const { name, code, danger } = additive
  const background = clsx(
    { 'bg-green-300 hover:bg-green-400': isSelected },
    { 'bg-white hover:bg-dark-whity': !isSelected }
  )

  return (
    <li
      className={`flex w-full cursor-pointer gap-x-2 p-3 text-dark transition duration-100 ${background}`}
      onClick={() => selectAdditive(additive)}
    >
      <div>{code}</div>
      <div>{name}</div>
      <div className='ml-auto'>{danger.level}</div>
    </li>
  )
}
