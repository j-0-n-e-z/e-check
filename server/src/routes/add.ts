import express from 'express'
import { Additive } from '../models/additive.model'

const router = express.Router()

router.get('/add', async (req, res) => {
	const query = req.query['add'] as string
	console.log('@query', query)

	if (!query) {
		return res.sendStatus(404)
	}

	const foundAdditives = await Additive.includes(query)

	console.log('@foundAdditives', foundAdditives)

	if (!foundAdditives.length) {
		return res.status(404).send({ message: '404 - Not found' })
	}

	res.send({ additives: foundAdditives })
})

export default router
