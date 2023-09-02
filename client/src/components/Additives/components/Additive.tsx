import { FC } from 'react'
import { getOriginIcon } from './getOriginIcon'

export const Additive: FC<Additive> = ({ code, danger, name, origins }) => {
	return (
		<li className='flex text-white bg-indigo-900'>
			<div>
				<div>{code}</div>
				<div>{name}</div>
			</div>
			<div>
				<div>{danger}</div>
				<div>
					{origins.toString()}
				</div>
				<div>
					{origins.map(origin => getOriginIcon(origin))}
				</div>
			</div>
		</li>
	)
}
