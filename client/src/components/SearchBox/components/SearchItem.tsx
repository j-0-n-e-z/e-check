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
	const background = isSelected
		? 'bg-green-900 hover:bg-green-800'
		: 'bg-neutral-800 hover:bg-neutral-700'
	return (
		<div
			className={`w-full flex p-3 text-white  gap-x-2 cursor-pointer transition duration-100 ${background}`}
			onClick={() => selectAdditive(additive)}
		>
			<div>{code}</div>
			<div>{name}</div>
			<div className='ml-auto'>{danger}</div>
		</div>
	)
}
