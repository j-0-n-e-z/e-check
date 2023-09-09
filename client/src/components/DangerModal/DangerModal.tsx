import { motion as m } from 'framer-motion'
import { useRef, type FC } from 'react'

import type { Additive } from '@/common'
import { XMark } from '@/components'
import { dangerLevelTexts } from '@/data'
import { useClickOutside } from '@/hooks'

interface DangerModalProps {
  additive: Additive
  close: () => void
}
export const DangerModal: FC<DangerModalProps> = ({ additive, close }) => {
  const { code, name, danger } = additive

  const modalRef = useRef<HTMLDivElement>(null)
  useClickOutside(modalRef, close)

  return (
    <div className='fixed left-0 top-0 grid min-h-screen w-screen place-items-center bg-black/[0.5]'>
      <m.div
        ref={modalRef}
        animate={{ opacity: 1, scale: 1 }}
        className='flex w-1/2 flex-col gap-y-3 rounded-md bg-whity p-6 text-dark'
        initial={{ opacity: 0, scale: 0.5 }}
      >
        <div className='flex justify-between'>
          <h3 className='text-lg font-bold'>
            {code} ({name}) - {dangerLevelTexts[danger.level]}
          </h3>
          <button onClick={close}>
            <XMark />
          </button>
        </div>
        <div>
          {danger.reasons.length ? (
            danger.reasons.map((r, i) => <p key={i}>{r}</p>)
          ) : (
            <p>Причина опасноти {code} неизвестна.</p>
          )}
        </div>
      </m.div>
    </div>
  )
}

export * from './components/XMark'
