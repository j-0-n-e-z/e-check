import type { FC } from 'react'

import { getOriginIcon } from './getOriginIcon'

export const Additive: FC<Additive> = ({ code, danger, name, origins }) => (
		<li className='flex bg-indigo-900 text-white'>
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
