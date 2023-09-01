import { FC } from 'react'

interface SearchItemProps {
	additive: Additive
	selectAdditive: (additive: Additive) => void
}

export const SearchItem: FC<SearchItemProps> = ({
	additive,
	selectAdditive
}) => {
	const { name, danger, code } = additive
	return (
		<div
			className='w-[400px] flex p-3 text-white bg-neutral-800 gap-x-2 cursor-pointer hover:bg-neutral-700 transition'
			onClick={() => selectAdditive(additive)}
		>
			<div>{code}</div>
			<div>{name}</div>
			<div className='ml-auto'>{danger}</div>
		</div>
	)
}
