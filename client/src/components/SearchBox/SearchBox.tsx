import { FC, useEffect, useRef, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useClickOutside } from '../../hooks/useOnClickOutside'
import { SearchItem } from './components/SearchItem'

interface SearchBoxProps {
	selectAdditive: (additive: Additive) => void
}

export const SearchBox: FC<SearchBoxProps> = ({ selectAdditive }) => {
	const [foundAdditives, setFoundAdditives] = useState<Additive[]>([])
	const [error, setError] = useState('')
	const [inputValue, setInputValue] = useState('')
	const debouncedInputValue = useDebounce(inputValue, 500)
	const clickRef = useRef<HTMLDivElement>(null)
	useClickOutside(clickRef, () => {
		setFoundAdditives([])
	})

	const fetchAdd = () => {
		if (!debouncedInputValue) return

		fetch(`http://localhost:8080/add?add=${debouncedInputValue}`)
			.then(res => res.json())
			.then(data => {
				if ('message' in data) {
					setError(data.message)
				} else {
					setFoundAdditives(data)
					setError('')
				}
			})
			.catch(err => console.error(err))
	}

	useEffect(() => {
		if (debouncedInputValue) {
			fetchAdd()
		} else {
			setFoundAdditives([])
			setError('')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedInputValue])

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value)
	}

	const onFocus = () => {
		if (debouncedInputValue) {
			fetchAdd()
		}
	}

	return (
		<div className='relative w-[400px]' ref={clickRef}>
			<div>
				<label>
					<input
						className='w-full p-2.5 rounded-md focus:outline-none indent-1'
						type='text'
						placeholder='Search an additive'
						value={inputValue}
						onChange={onChange}
						onFocus={onFocus}
					/>
				</label>
			</div>
			<div className='w-full absolute top-12'>
				{!error ? (
					foundAdditives.map(additive => (
						<SearchItem
							key={additive.id}
							additive={additive}
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
