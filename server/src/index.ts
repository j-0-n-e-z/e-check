import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import additives from './additives.json'

const notFoundError = {
	message: 'Nothing found'
}

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
const port = process.env.PORT || 8080

app.get('/add', (req, res) => {
	const query = req.query['add'] as string
	console.log('@query', query)

	if (!query) {
		return res.send(notFoundError)
	}

	const foundAdditives = additives.filter(
		add => add.code.includes(query) || add.name.includes(query)
	)

	console.log('@foundAdditives', foundAdditives)

	if (!foundAdditives.length) {
		return res.send(notFoundError)
	}

	res.send(foundAdditives)
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})
