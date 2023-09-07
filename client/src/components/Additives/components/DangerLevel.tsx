import type { FC } from 'react'

import { getDangerBackground } from './helpers/getDangerBackground'

interface DangerLevelProps {
  level: number
}

export const DangerLevel: FC<DangerLevelProps> = ({ level }) => {
  // TODO: make getDangerBackground clsx
  const dangerBlockBackground = getDangerBackground(level)
  const dangerBlocks = Array.from({ length: 5 }, (_, i) => {
    if (i + 1 <= level)
      return <div key={i} className={`h-4 w-7 ${dangerBlockBackground} rounded-sm`} />
    return <div key={i} className='h-4 w-7 rounded-sm bg-green-100' />
  })

  // TODO: make title with certail danger level ex. 'низкая опасность'
  return (
    <div className='flex gap-x-[3px]' title='Уровень опасности'>
      {dangerBlocks}
    </div>
  )
}
