const fetch = require('node-fetch')

async function getScoresWaitingPreviousFetch(ids, scores = {}) {
	const id = ids.next().value
	if (!id) return scores

	scores[id] = 'NOT FOUND'
	try {
		let res = await fetch(`https://api.jikan.moe/v3/anime/${id}/`)
		if (res.status !== 200 && res.status !== 404) res = await fetch(`https://api.jikan.moe/v3/anime/${id}/`)
		if (res.status !== 200 && res.status !== 404) res = await fetch(`https://api.jikan.moe/v3/anime/${id}/`)
		const { score } = await res.json()
		scores[id] = score || 'NOT FOUND'
	} catch (error) {
		console.error(error)
	}

	return await getScoresWaitingPreviousFetch(ids, scores)
}

module.exports = async (req, res) => {
	function* ids() {
		yield* req.body.ids
	}
	const scores = getScoresWaitingPreviousFetch(ids())
	res.status(200).send(await scores)
}
