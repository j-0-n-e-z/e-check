import clsx from 'clsx'
import type { FC } from 'react'

import { dangerLevelTexts } from '@/data'

interface DangerLevelProps {
  level: number
}

export const DangerLevel: FC<DangerLevelProps> = ({ level }) => {
  const background = clsx(
    { 'bg-danger-1-hover': level === 1 },
    { 'bg-danger-2-hover': level === 2 },
    { 'bg-danger-3-hover': level === 3 },
    { 'bg-danger-4-hover': level === 4 },
    { 'bg-danger-5-hover': level === 5 }
  )

  const dangerBlocks = Array.from({ length: 5 }, (_, i) => {
    const blockBackground = i + 1 <= level ? background : 'bg-danger-0'
    return <div key={i} className={`h-4 w-7 rounded-sm ${blockBackground}`} />
  })

  return (
    <div className='flex gap-x-[3px]' title={dangerLevelTexts[level]}>
      {dangerBlocks}
    </div>
  )
}
