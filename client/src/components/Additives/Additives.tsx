import { FC } from 'react'
import { Additive } from './components/Additive'

interface AdditivesProps {
	selectedAdditives: Additive[]
}

export const Additives: FC<AdditivesProps> = ({ selectedAdditives }) => {
	const title = selectedAdditives.length
		? 'Selected additives'
		: 'No additives selected'
	return (
		<div className='w-[500px] mt-3.5'>
			<h3 className='text-white text-xl text-center mb-4'>{title}</h3>
			<ul className='space-y-2'>{selectedAdditives.map(additive => <Additive key={additive.id} {...additive} />)}</ul>
		</div>
	)
}
