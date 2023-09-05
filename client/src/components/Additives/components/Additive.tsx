import type { FC } from 'react'

import type { Additive as IAdditive } from '@/common'

import { getOriginIcon } from './getOriginIcon'

export const Additive: FC<IAdditive> = ({ code, danger, name, origins }) => (
  <li className='flex bg-indigo-900 text-white'>
    <div>
      <div>{code}</div>
      <div>{name}</div>
    </div>
    <div>
      <div>{danger.level}</div>
      <div>
        {danger.reasons.map((reason, idx) => (
          <p key={idx}>{reason}</p>
        ))}
      </div>
      <div>{origins.toString()}</div>
      <div>{origins.map((origin) => getOriginIcon(origin))}</div>
    </div>
  </li>
)
