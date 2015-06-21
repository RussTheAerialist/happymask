var express = require('express'),
    app = express()

app.board = null
app.get('/board', function (req, res) {
	if (app.board) {
		res.json(app.board)
	} else {
		res.status(404).send('board not found')
	}
})

module.exports = app
