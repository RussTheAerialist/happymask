var gulp = require('gulp'),
    server = require('../reload'),
    path = require('path'),
    gutil = require('gulp-util'),
    express = require('express'),
    app = require('../../../motion/server'),
    bot = require('../../../motion/server/bot')

  gulp.task('express', function() {
    var distPath = path.resolve('./dist')
    gutil.log(distPath)
    app.use(express.static(distPath))
    app.listen(1337, function() {
        bot(function (board, delta) {
                app.locals.board = board
                app.locals.delta = delta
        })      
    })
    gutil.log('http://localhost:1337/')
  })

  gulp.task('watch', ['express', 'css', 'templates'], function () {
    server.listen(35729, function (err) {
      if (err) {
        return console.log(err)
      }

      gulp.watch('src/assets/stylesheets/*.sass', ['css'])
      gulp.watch('src/assets/scripts/*.js', ['app'])
      gulp.watch('src/*.jade', ['templates'])
  })
})
