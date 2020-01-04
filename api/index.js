module.exports = (req, res) => {
	res.send(`<h1>UNOFFICIAL jikan bulk API</h1>
	<h3>/scores</h3>
	<p>Returns the average scores of the requested anime</p>
	<p><i>parameters</i> ➜ <code>body: {ids: [...animeIds]}</code></p>`)
}
