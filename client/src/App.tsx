import { useState } from 'react'

import type { Additive } from '@/common'
import { Additives, SearchBox } from '@/components'

const App = () => {
  const [selectedAdditives, setSelectedAdditives] = useState<Additive[]>([])

  const checkSelected = (additive: Additive) =>
    !!selectedAdditives.find((add) => add._id === additive._id)

  const selectAdditive = (additive: Additive) => {
    setSelectedAdditives((additives) => {
      if (checkSelected(additive)) {
        return additives.filter((add) => add._id !== additive._id)
      }
      return [...additives, additive]
    })
  }

  const clearSelectedAdditives = () => {
    setSelectedAdditives([])
  }

  return (
    <>
      <header className='grid h-[20vh] w-full place-items-center bg-header'>
        <SearchBox checkSelected={checkSelected} selectAdditive={selectAdditive} />
      </header>
      <main className='flex w-full flex-1 flex-col items-center bg-[#cdb7ff]'>
        <Additives
          clearSelectedAdditives={clearSelectedAdditives}
          selectedAdditives={selectedAdditives}
        />
      </main>
    </>
  )
}

export default App
