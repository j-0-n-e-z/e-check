import { useEffect } from 'react'

export const useClickOutside = (
	ref: React.MutableRefObject<HTMLDivElement | null>,
	callback: () => void
) => {
	const handleClick = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			callback()
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClick, true)
		return () => {
			document.removeEventListener('click', handleClick, true)
		}
	})
}
