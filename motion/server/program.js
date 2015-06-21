var temporal = require('temporal'),
    _ = require('lodash')

function Program(data) {
	if (!(this instanceof Program)) {
		return new Program(data)
	}

	console.log(data)
}

module.exports = Program