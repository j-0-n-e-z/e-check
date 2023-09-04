import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useClickOutside, useDebounce } from '@/hooks'

import { SearchItem } from './components/SearchItem'

interface SearchBoxProps {
  selectAdditive: (additive: Additive) => void
  checkSelected: (additive: Additive) => boolean
}

export const SearchBox: FC<SearchBoxProps> = ({ selectAdditive, checkSelected }) => {
  const [foundAdditives, setFoundAdditives] = useState<Additive[]>([])
  const [error, setError] = useState('')
  const [shouldShowResults, setShouldShowResults] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const debouncedInputValue = useDebounce(inputValue, 500)

  const clickRef = useRef<HTMLDivElement>(null)
  useClickOutside(clickRef, () => {
    setShouldShowResults(false)
  })

  useEffect(() => {
    const fetchAdd = async () => {
      if (!debouncedInputValue) return

      const queryParams = new URLSearchParams({
        add: debouncedInputValue
      })

      try {
        const res = await fetch(`http://localhost:8080/add?${queryParams}`)
        if (!res.ok) {
          setError(res.statusText)
          throw new Error(res.statusText)
        }
        const data = await res.json() as Additive[]
        setFoundAdditives(data)
        setError('')
      } catch (err) {
        if (typeof err === 'string') {
          console.log(`${debouncedInputValue} ${err}`)
        } else {
          console.log(`${debouncedInputValue} ${(err as Error).message}`)
        }
      } finally {
        setShouldShowResults(true)
      }
    }

    if (debouncedInputValue) {
      fetchAdd()
    } else {
      setFoundAdditives([])
      setError('')
      setShouldShowResults(false)
    }
  }, [debouncedInputValue])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onFocus = () => {
    if (foundAdditives.length || error) {
      setShouldShowResults(true)
    }
  }

  return (
    <div ref={clickRef} className='relative mx-auto w-1/2'>
      <input
        className='w-full rounded-md p-4 indent-1 text-lg focus:outline-none'
        placeholder='Search an additive'
        type='text'
        value={inputValue}
        onChange={onChange}
        onFocus={onFocus}
      />
      {shouldShowResults && (
        <ul className='absolute top-16 w-full overflow-hidden rounded-[0_0_.5rem_.5rem] border-[1px] border-dark-whity shadow-searchResults'>
          {!error ? (
            foundAdditives.map((additive) => (
              <SearchItem
                key={additive._id}
                additive={additive}
                isSelected={checkSelected(additive)}
                selectAdditive={selectAdditive}
              />
            ))
          ) : (
            <li className='bg-neutral-600 p-3 text-center text-white'>{error}</li>
          )}
        </ul>
      )}
    </div>
  )
}
