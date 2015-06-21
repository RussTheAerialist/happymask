var app = require('./server'),
    bot = require('./server/bot')

var server = app.listen(4200, function() {
	bot(function (board, delta) {
		app.locals.board = board
		app.locals.delta = delta
	})
})