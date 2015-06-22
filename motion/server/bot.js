var five = require('johnny-five'),
    delta = require('./delta'),
    botController = require('./controller')

function ready(b, callback) {

  var servo1 = five.Servo({
    pin: process.env.npm_config_servo_1 || 9,
    range: [0, 90]
  })
  var servo2 = five.Servo({
    pin: process.env.npm_config_servo_2 || 10,
    range: [0, 90]
  })
  var servo3 = five.Servo({
    pin: process.env.npm_config_servo_3 || 11,
    range: [0, 90]
  })

  var controller = new botController(new delta(servo1, servo2, servo3))
  callback(b, controller)
}

module.exports = function (callback) {
  var board = new five.Board()
  board.on('ready', function() {
    ready(board, callback)
  })  
}
