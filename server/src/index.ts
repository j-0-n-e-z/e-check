import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { Schema, connect, model, connection } from 'mongoose'
import additives from './additives.json'

type Additive = Omit<(typeof additives)[0], 'id'>

const additiveSchema = new Schema<Additive>({
	code: String,
	name: String,
	danger: Number,
	origins: [String]
})

const Additive = model<Additive>('Additive', additiveSchema)

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
const port = process.env.PORT || 8080

const notFoundError = {
	message: 'Nothing found'
}

app.get('/add', async (req, res) => {
	const query = req.query['add'] as string
	console.log('@query', query)

	if (!query) {
		return res.send(notFoundError)
	}

	const foundAdditives = (
		await Additive.find().or([
			{ code: { $regex: query } },
			{ name: { $regex: query } }
		])
	).map(r => r.toObject())

	console.log('@foundAdditives', foundAdditives)

	if (!foundAdditives.length) {
		return res.send(notFoundError)
	}

	res.send(foundAdditives)
})

async function main() {
	try {
		await connect('mongodb://127.0.0.1:27017/e-check')
		app.listen(port, () => {
			console.log(`[server]: Server is running at http://localhost:${port}`)
		})
	} catch (e) {
		console.error(e)
	}
}
main()