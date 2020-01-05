const fetch = require('node-fetch')

async function fetchWithRetry(id, index) {
	let res = await fetch(`https://api.jikan.moe/v3/anime/${id}/`)
	let retries = 0
	while (res.status !== 404 && res.status !== 200 && retries < 5) {
		res = await new Promise(resolve => {
			setTimeout(async () => resolve(await fetch(`https://api.jikan.moe/v3/anime/${id}/`)), 500 * retries * index)
		})
		retries++
	}
	return res
}

module.exports = async (req, res) => {
	const ids = JSON.parse(req.query.ids)
	const promises = ids.map(async (id, index) => {
		try {
			let res = await fetchWithRetry(id, index)
			const { score } = await res.json()
			return score || 'NOT FOUND'
		} catch (error) {
			console.log(error)
			return 'NOT FOUND'
		}
	})

	const scores = await Promise.all(promises)
	const scoresByIds = ids.reduce((acc, id, index) => {
		acc[id] = scores[index]
		return acc
	}, {})

	res.status(200).send(scoresByIds)
}
