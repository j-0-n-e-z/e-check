import type { FC } from 'react'

import type { Additive } from '@/common'

import { getDangerLevelInText } from '../Additives/components/helpers/getDangerText'

interface DangerModalProps {
  additive: Additive
  close: () => void
}

export const DangerModal: FC<DangerModalProps> = ({
  additive: {
    danger: { reasons, level },
    code,
    name
  },
  close
}) => (
  <div className='fixed left-0 top-0 grid min-h-screen w-screen place-items-center bg-black/[0.5]'>
    <div className='flex w-1/2 flex-col gap-y-3 rounded-md bg-whity p-6 text-dark'>
      <div className='flex justify-between'>
        <h3 className='text-lg font-bold'>
          {code} ({name}) - {getDangerLevelInText(level)}
        </h3>
        <button onClick={close}>close</button>
      </div>
      <div>
        {reasons.length ? (
          reasons.map((r, i) => <p key={i}>{r}</p>)
        ) : (
          <p>Причина опасноти {code} неизвестна.</p>
        )}
      </div>
    </div>
  </div>
)
