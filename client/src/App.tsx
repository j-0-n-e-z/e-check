import { useState } from 'react'
import './App.css'
import { Additives } from './components/Additives/Additives'
import { SearchBox } from './components/SearchBox/SearchBox'

const App = () => {
	const [selectedAdditives, setSelectedAdditives] = useState<Additive[]>([])

	const selectAdditive = (additive: Additive) => {
		setSelectedAdditives(additives => {
			const isNotSelected = !additives.find(add => add.id === additive.id)
			if (isNotSelected) {
				return [...additives, additive]
			}
			return additives
		})
	}

	return (
		<main className='flex flex-col items-center'>
			<SearchBox selectAdditive={selectAdditive} />
			<Additives selectedAdditives={selectedAdditives} />
		</main>
	)
}

export default App
