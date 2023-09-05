import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connect, disconnect } from 'mongoose'
import path from 'path'
import routerAdd from './routes/add'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(express.static('public'))

const PORT = process.env.PORT || 8080

app.use('/', routerAdd)

app.all('*', (req, res) => {
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, '../public/views/404.html'))
	} else if (req.accepts('json')) {
		res.send({ message: '404 - Not found' })
	} else {
		res.type('txt').send('404 - Not found')
	}
})

async function main() {
	try {
		await connect('mongodb://127.0.0.1:27017/e-check')
		app.listen(PORT, () => {
			console.log(`[server]: Server is running at http://localhost:${PORT}`)
		})
	} catch (e) {
		console.error(e)
		await disconnect()
	}
}
main()
