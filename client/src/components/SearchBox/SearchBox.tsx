import { motion as m } from 'framer-motion'
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'

import type { Additive } from '@/common'
import { useClickOutside, useDebounce } from '@/hooks'
import { useAppDispatch, useAppSelector } from '@/src/redux/common/hooks'
import { clearAdditives, fetchAdditives, getAdditives } from '@/src/redux/slices/additivesSlice'

import { SearchItem } from './components/SearchItem'

interface SearchBoxProps {
  selectAdditive: (additive: Additive) => void
  checkSelected: (additive: Additive) => boolean
}

export const SearchBox: FC<SearchBoxProps> = ({ selectAdditive, checkSelected }) => {
  const [isShowResults, setIsShowResults] = useState(false)

  const dispatch = useAppDispatch()
  const { additives, status, error } = useAppSelector(getAdditives)

  const [inputValue, setInputValue] = useState('')
  const debouncedInputValue = useDebounce(inputValue, 500)

  const clickRef = useRef<HTMLDivElement>(null)
  useClickOutside(clickRef, () => {
    setIsShowResults(false)
  })

  useEffect(() => {
    if (debouncedInputValue) {
      dispatch(fetchAdditives(debouncedInputValue))
      setIsShowResults(true)
    } else if (additives) {
      dispatch(clearAdditives())
    }
  }, [debouncedInputValue])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onFocus = () => {
    if (additives.length || error) {
      setIsShowResults(true)
    }
  }

  return (
    <div ref={clickRef} className='relative mx-auto w-1/2'>
      <input
        className='w-full rounded-md p-4 indent-1 text-lg focus:outline-none'
        disabled={status === 'loading'}
        placeholder='Найти пищевую добавку'
        type='text'
        value={inputValue}
        onChange={onChange}
        onFocus={onFocus}
      />
      {isShowResults && status !== 'loading' && (
        <m.ul
          key={additives.length}
          animate={{ opacity: 1, scale: 1 }}
          className='absolute top-16 max-h-[calc(48px_*_10)] w-full overflow-hidden overflow-y-auto rounded-[0_0_.5rem_.5rem] border-[1px] border-dark-whity bg-white shadow-searchResults'
          initial={{ opacity: 0, scale: 0.9, zIndex: 1 }}
          transition={{ duration: 0.2, type: 'spring' }}
        >
          {!error ? (
            additives.map((additive) => (
              <SearchItem
                key={additive._id}
                additive={additive}
                isSelected={checkSelected(additive)}
                selectAdditive={selectAdditive}
              />
            ))
          ) : (
            <li className='bg-whity p-3 text-center text-dark '>{error}</li>
          )}
        </m.ul>
      )}
    </div>
  )
}
