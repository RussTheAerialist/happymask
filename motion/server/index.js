var express = require('express'),
    app = express()

app.board = null
app.get('/board', function (req, res) {
	if (app.locals.board) {
		res.json(app.locals.board)
	} else {
		res.status(404).send('board not found')
	}
})

module.exports = app
