var	emitter = require('events').EventEmitter,
    program = require('./program')
	path = require('path'),
	fs = require('fs'),
	programDir = path.resolve('./programs/')

var ALLOWED_PROGRAMS = [
	'dance',
	'shake',
	'nod',
	'circle'
]

var SAVED_POSITIONS = JSON.parse(fs.readFileSync(programDir + '/positions.json'))
console.log(SAVED_POSITIONS)

function Controller(delta) {
	if (!(this instanceof Controller)) {
		return new Controller(delta)
	}

	this.delta = delta
	this.currentProgram = null
}

module.exports = Controller

Controller.prototype = new emitter()

Controller.prototype.runProgram = function (name) {
	if (this.currentProgram) {
		if (this.currentProgram.name === name) {
			return // Already running this program
		}

		this.currentProgram.stop()
		this.currentProgram = null
	}

	if (ALLOWED_PROGRAMS.indexOf(name) < 0) {
		throw 'Invalid Program'
	}

	data = fs.readFileSync(programDir + '/' + name + '.json')
	this.currentProgram = new Program(JSON.parse(data))
}

Controller.prototype.stepAxis = function (axis, step) {
    var position = {
    	x: this.delta.lastPosition.x,
    	y: this.delta.lastPosition.y,
    	z: this.delta.lastPosition.z
    }

    position[axis] += step
    this.delta.to(position.x, position.y, position.z)

    return position
}

Controller.prototype.savedPosition = function (name) {
	var position = SAVED_POSITIONS[name]
	if (!position) {
		throw 'unknown position "' + name + '"'
	}

	this.delta.to(position.x, position.y, position.z)
	return {
		message: 'moved to ' + name,
		x: position.x,
		y: position.y,
		z: position.z
	}
}