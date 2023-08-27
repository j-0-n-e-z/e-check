import { useEffect, useState } from 'react'
import './App.css'
import additiveCodes from './codes.json'

interface Additive {
	id: string
	code: string
	name: string
	danger: number
	origins: string[]
}

function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState('')

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay)
		return () => clearTimeout(timeout)
	}, [delay, value])

	return debouncedValue
}

function App() {
	const [additives, setAdditives] = useState<Additive[]>([])
	const [additivesInputValue, setAdditivesInputValue] = useState('')
	const debouncedAdditivesInputValue = useDebounce(additivesInputValue, 1000)

	function fetchAdds(adds: string) {
		console.log('fetch')
		const queryParams = new URLSearchParams(
			adds.split(',').map(add => ['e', add])
		)
		fetch(`http://localhost:8080/adds?${queryParams}`)
			.then(res => res.json())
			.then(data => Array.isArray(data) ? data.filter(Boolean) : [data])
			.then(data => setAdditives(data))
			.catch(err => console.error(err))
	}

	useEffect(() => {
		fetchAdds(debouncedAdditivesInputValue)
	}, [debouncedAdditivesInputValue])

	return (
		<main>
			<div>
				<label>
					<span>Additives:</span>
					<input
						value={additivesInputValue}
						onChange={e => setAdditivesInputValue(e.target.value)}
					/>
				</label>
			</div>
			<div>
				{additives.map(add => (
					<div key={add.id}>
						<div>Code: {add.code}</div>
						<div>Name: {add.name}</div>
						<div>Danger Level: {add.danger}</div>
						<div>
							Origins:{' '}
							{add.origins.map(origin => (
								<div key={origin}>{origin}</div>
							))}
						</div>
					</div>
				))}
			</div>
		</main>
	)
}

export default App
