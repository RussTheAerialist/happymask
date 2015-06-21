var tap = require('tap'),
    app = require('../server/delta')


function createMock() {
  return {
    to: function (angle, speed) {
      this.to.angle = angle
      this.to.speed = speed
      this.to.called = true
    }
  }
}

tap.test('move with no speed uses default speed', function (t) {
  var mockServo = createMock()
  var d = new app(mockServo, null, null)
  d.move('a', 10)
  t.ok(mockServo.to.called)
  t.equal(mockServo.to.angle, 10)
  t.equal(mockServo.to.speed, 100)
})

tap.test('unknown servo name fails', function (t) {
  t.plan(1)

  var mockServo = createMock()
  var d = new app(mockServo, null, null)
  t.throws(function() {
    d.move('z')
  })
})
