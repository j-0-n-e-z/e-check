import { motion as m } from 'framer-motion'
import { useState, type FC } from 'react'

import type { Additive as IAdditive } from '@/common'

import { DangerModal } from '../../DangerModal/DangerModal'

import { DangerLevel } from './DangerLevel'
import { getOriginIcon } from './helpers/getOriginIcon'

export const Additive: FC<IAdditive> = (additive) => {
  const { code, danger, name, origins } = additive
  const [shouldShowDangerModal, setShouldShowDangerModal] = useState(false)

  const onOpenModal = () => {
    setShouldShowDangerModal(true)
  }

  const onCloseModal = () => {
    setShouldShowDangerModal(false)
  }

  return (
    <m.li
      key={code}
      animate={{ opacity: 1, scale: 1 }}
      className='flex w-[500px] rounded-xl bg-indigo-900 p-5 text-white'
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3, type: 'spring' }}
    >
      <div className='flex w-full flex-col gap-y-3'>
        <div className='flex items-center justify-between'>
          <div className='text-2xl'>{code}</div>
          <DangerLevel level={danger.level} />
        </div>
        <div>{name}</div>
        <div className='flex flex-1 justify-between'>
          <ul className='flex flex-col gap-y-3'>
            {origins.map((origin) => (
              <li key={origin} className='flex items-center gap-x-2'>
                {getOriginIcon(origin)}
                <span>{origin}</span>
              </li>
            ))}
          </ul>
          <div className='mt-auto'>
            {danger.level > 0 ? (
              <button className='rounded-xl bg-white p-2 text-sm text-dark' onClick={onOpenModal}>
                Почему вредно?
              </button>
            ) : (
              <span>Безвреден</span>
            )}
          </div>
        </div>
      </div>

      {shouldShowDangerModal && <DangerModal additive={additive} close={onCloseModal} />}
    </m.li>
  )
}
