const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const fetch = require('node-fetch')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.status(200).send(`<h1>UNOFFICIAL jikan bulk API</h1>
<h3>/scores</h3>
<p>Returns the average scores of the requested anime</p>
<p><i>parameters</i> ➜ <code>body: {ids: [...animeIds]}</code></p>`)
})

app.post('/scores', async (req, res) => {
	const promises = req.body.ids.map(async id => {
		const res = await fetch(`https://api.jikan.moe/v3/anime/${id}/`)
		const { score } = await res.json()
		return score
	})

	const scores = await Promise.all(promises)
	res.status(200).send(scores)
})

http.createServer(app).listen(8080, () => {
	console.log('Server started at http://localhost:8080')
})
