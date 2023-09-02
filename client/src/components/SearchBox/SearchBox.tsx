import { FC, useEffect, useRef, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useClickOutside } from '../../hooks/useOnClickOutside'
import { SearchItem } from './components/SearchItem'

interface SearchBoxProps {
	selectAdditive: (additive: Additive) => void
	checkSelected: (additive: Additive) => boolean
}

export const SearchBox: FC<SearchBoxProps> = ({
	selectAdditive,
	checkSelected
}) => {
	const [foundAdditives, setFoundAdditives] = useState<Additive[]>([])
	const [error, setError] = useState('')
	const [inputValue, setInputValue] = useState('')
	const [shouldShowResults, setShouldShowResults] = useState(true)
	const debouncedInputValue = useDebounce(inputValue, 500)

	const clickRef = useRef<HTMLDivElement>(null)
	useClickOutside(clickRef, () => {
		setShouldShowResults(false)
	})

	const fetchAdd = () => {
		if (!debouncedInputValue) return

		fetch(`http://localhost:8080/add?add=${debouncedInputValue}`)
			.then(res => {
				if (!res.ok) {
					setError(res.statusText)
					throw new Error(res.statusText)
				}
				return res.json()
			})
			.then(data => {
				setFoundAdditives(data)
				setError('')
				setShouldShowResults(true)
			})
			.catch(err => console.log(`${debouncedInputValue} ${err.message}`))
	}

	useEffect(() => {
		if (debouncedInputValue) {
			fetchAdd()
		} else {
			setFoundAdditives([])
			setError('')
		}
	}, [debouncedInputValue])

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value)
	}

	const onFocus = () => {
		setShouldShowResults(true)
	}

	return (
		<div className='relative w-[400px]' ref={clickRef}>
			<input
				className='w-full p-2.5 rounded-md focus:outline-none indent-1'
				type='text'
				placeholder='Search an additive'
				value={inputValue}
				onChange={onChange}
				onFocus={onFocus}
			/>
			<div className='w-full absolute top-12'>
				{!error ? (
					shouldShowResults &&
					foundAdditives.map(additive => (
						<SearchItem
							key={additive._id}
							additive={additive}
							isSelected={checkSelected(additive)}
							selectAdditive={selectAdditive}
						/>
					))
				) : (
					<div className='p-3 text-white bg-neutral-800 gap-x-2 text-center'>
						{error}
					</div>
				)}
			</div>
		</div>
	)
}
