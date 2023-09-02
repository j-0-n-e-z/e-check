import { useState } from 'react'
import './App.css'
import { Additives } from './components/Additives/Additives'
import { SearchBox } from './components/SearchBox/SearchBox'

const App = () => {
	const [selectedAdditives, setSelectedAdditives] = useState<Additive[]>([])

	const selectAdditive = (additive: Additive) => {
		setSelectedAdditives(additives => {
			if (checkSelected(additive)) {
				return additives.filter(add => add._id !== additive._id)
			}
			return [...additives, additive]
		})
	}

	const checkSelected = (additive: Additive) => {
		return !!selectedAdditives.find(add => add._id === additive._id)
	}

	return (
		<main className='flex flex-col items-center'>
			<SearchBox
				checkSelected={checkSelected}
				selectAdditive={selectAdditive}
			/>
			<Additives selectedAdditives={selectedAdditives} />
		</main>
	)
}

export default App
