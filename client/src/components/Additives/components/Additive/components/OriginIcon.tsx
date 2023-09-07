import type { FC } from 'react'

import type { Origin } from '@/common'
import { originIconNames } from '@/src/data/originIconNames'

interface OriginIconProps {
  origin: Origin
}

export const OriginIcon: FC<OriginIconProps> = ({ origin }) => (
  <img
    key={origin}
    className='inline h-10 w-10'
    src={`http://localhost:8080/assets/${originIconNames[origin]}.png`}
    title={`${origin} происхождение`}
  />
)

