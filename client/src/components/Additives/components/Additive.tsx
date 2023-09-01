import { FC } from 'react'

export const Additive: FC<Additive> = ({code,danger,name,origins}) => {
  return (
		<li className='flex text-white bg-indigo-900'>
			<div>
				<div>{code}</div>
				<div>{name}</div>
			</div>
			<div>
				<div>{danger}</div>
				<div>{origins}</div>
			</div>
		</li>
	)
}
