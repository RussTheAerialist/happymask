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

tap.test('invalid position throws', function (t) {
  var mockA = createMock(),
      mockB = createMock(),
      mockC = createMock()
      d = new app(mockA, mockB, mockC)

  t.plan(1)
  t.throws(function() {
      d.to(0,0,500)
  }, 'invalid position')
})

tap.test('0,0,-150 is close to the top', function (t) {
  var mockA = createMock(),
      mockB = createMock(),
      mockC = createMock()
      d = new app(mockA, mockB, mockC)

  d.to(0,0, -150)
  t.end()
})
