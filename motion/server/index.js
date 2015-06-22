var express = require('express'),
    app = express()

function board_required(url, callback) {
	app.get(url, function(req, res) {
		if (!app.locals.board) {
			console.log('request before bot was connected')
			res.status(404).send('bot not online')
			return
		}

		try {
			if (callback.on) {
				console.log('registering error on callback for ' + url)
				callback.on('error', function(e) {
					console.log('error event for ' + url)
					console.log(e)
					res.json({
						success: false,
						error: e
					})
				})
			}
			var ret = callback(req, res) || {}
			ret.success = true
			res.json(ret)
		} catch (e) {
			console.log('Exception thrown for ' + url)
			console.log(e)
			res.json({
				success: false,
				error: e.toString()
			})
		}
	})
}

app.param('axis', function(req, res, next, id) {
	switch(id) {
		case 'x':
		case 'y':
		case 'z':
		  req.axis = id
		  break
	}
	next()
})

board_required('/board', function(req, res) {
	return {
		success: true,
		version: '1.0.0'
	}
})

board_required('/programmed/:program', function (req, res) {
	var program = req.params.program
	app.locals.delta.runProgram(program)
})

board_required('/inc/:axis', function (req, res) {
	var axis = req.axis
	return app.locals.delta.stepAxis(axis, 1)
})

board_required('/dec/:axis', function (req, res) {
	var axis = req.axis
	return app.locals.delta.stepAxis(axis, -1)
})

board_required('/go/:position', function (req, res) {
	var position = req.params.position
	return app.locals.delta.savedPosition(position)
})


module.exports = app
