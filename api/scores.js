const fetch = require('node-fetch')

module.exports = async (req, res) => {
	const promises = req.body.ids.map(async id => {
		const res = await fetch(`https://api.jikan.moe/v3/anime/${id}/`)
		const { score } = await res.json()
		return score
	})

	const scores = await Promise.all(promises)
	res.status(200).send(scores)
}
