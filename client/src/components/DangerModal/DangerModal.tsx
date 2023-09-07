import { useRef, type FC } from 'react'

import type { Additive } from '@/common'
import { useClickOutside } from '@/hooks'
import { dangerLevelTexts } from '@/src/data/dangerLevelTexts'

import { XMark } from './XMark'

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
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  useClickOutside(modalRef, close)

  return (
    <div className='fixed left-0 top-0 grid min-h-screen w-screen place-items-center bg-black/[0.5]'>
      <div ref={modalRef} className='flex w-1/2 flex-col gap-y-3 rounded-md bg-whity p-6 text-dark'>
        <div className='flex justify-between'>
          <h3 className='text-lg font-bold'>
            {code} ({name}) - {dangerLevelTexts[level]}
          </h3>
          <button onClick={close}>
            <XMark />
          </button>
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
}
