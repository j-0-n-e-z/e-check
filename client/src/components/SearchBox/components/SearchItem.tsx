import { FC } from 'react'

interface SearchItemProps {
	additive: Additive
	selectAdditive: (additive: Additive) => void
	isSelected: boolean
}

export const SearchItem: FC<SearchItemProps> = ({
	additive,
	selectAdditive,
	isSelected
}) => {
	const { name, danger, code } = additive
	return (
		<div
			className={`w-full flex p-3 text-white bg-neutral-800 gap-x-2 cursor-pointer hover:bg-neutral-700 transition duration-100 ${
				isSelected ? 'bg-green-900 hover:bg-green-800' : ''
			}`}
			onClick={() => selectAdditive(additive)}
		>
			<div>{code}</div>
			<div>{name}</div>
			<div className='ml-auto'>{danger}</div>
		</div>
	)
}
