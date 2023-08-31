import { useEffect, useState } from 'react'
import './App.css'

interface Additive {
	id: string
	code: string
	name: string
	danger: number
	origins: string[]
}

function useDebounce<T>(value: T, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState<T>()

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay)

		return () => clearTimeout(timeout)
	}, [value, delay])

	return debouncedValue
}

function App() {
	const [additives, setAdditives] = useState<Additive[]>([])
	const [error, setError] = useState('')
	const [additive, setAdditive] = useState('')
	const debouncedAdditive = useDebounce(additive, 500)

	function fetchAdd() {
		if (!debouncedAdditive) return
		fetch(`http://localhost:8080/add?add=${debouncedAdditive}`)
			.then(res => res.json())
			.then(data => {
				if ('message' in data) {
					setError(data.message)
				} else {
					setAdditives(data)
					setError('')
				}
			})
			.catch(err => console.error(err))
	}

	useEffect(() => {
		if (debouncedAdditive) {
			fetchAdd()
		}
	}, [debouncedAdditive])

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<main>
			<div>
				<form onSubmit={onSubmit}>
					<input
						type='text'
						value={additive}
						onChange={e => setAdditive(e.currentTarget.value)}
					/>
					<button>Find</button>
				</form>
			</div>
			<div>
				{!error ? (
					additives.map(add => (
						<div key={add.id}>
							<div>Code: {add.code}</div>
							<div>Name: {add.name}</div>
							<div>Danger Level: {add.danger}</div>
							<div>Origins: {add.origins.join(', ')}</div>
						</div>
					))
				) : (
					<div>{error}</div>
				)}
			</div>
		</main>
	)
}

export default App
