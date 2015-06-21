var tap = require('tap'),
    req = require('supertest'),
    app = require('../server')

tap.test('/board returns a 404 when board is not present', function (t) {
  app.board = null
  req(app)
    .get('/board')
    .expect(404)
    .end(function() {
      t.end()
    })

})

tap.test('/board returns information when the board is present', function (t) {
  app.board = { success: true}
  req(app)
    .get('/board')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function(res) {
      t.similar(JSON.parse(res.body), {
        success: true
      })      
    })
    .end(function() {
      t.end()
    })
})
