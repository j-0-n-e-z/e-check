import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import additives from './additives.json'

// type Additive = (typeof additives)[0]

const notFoundError = {
	message: 'Nothing found'
}

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
const port = process.env.PORT || 8080

app.get('/adds', (req, res) => {
	console.log(req.query)
	const params = req.query['e']

	if (!params) {
		return res.status(404)
	}

	let foundAdds

	if (Array.isArray(params)) {
		const requestedAdds = params as string[]
		console.log('@requestedAdds', requestedAdds)
		if (!requestedAdds.length) {
			return res.sendStatus(404).send(notFoundError)
		}
		foundAdds = requestedAdds
			.map(requestedAdd =>
				additives.filter(add => add.code.includes(requestedAdd))
			)
			.flat()
	} else {
		const requestedAdd = params as string
		console.log('@requestedAdd', requestedAdd)
		if (!requestedAdd) {
			return res.sendStatus(404).send(notFoundError)
		}
		foundAdds = additives.filter(add => add.code.includes(requestedAdd))
	}

	console.log('@foundAdds', foundAdds)
	if (!foundAdds.length) {
		return res.sendStatus(404).send(notFoundError)
	}
	return res.send(foundAdds)
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})
