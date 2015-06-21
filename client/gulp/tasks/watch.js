var gulp = require('gulp'),
    server = require('../reload'),
    express = require('express'),
    path = require('path'),
    gutil = require('gulp-util')
    app = express()

  gulp.task('express', function() {
    var distPath = path.resolve('./dist')
    gutil.log(distPath)
    app.use(express.static(distPath))
    app.listen(1337)
    gutil.log('http://localhost:1337/')
  })

  gulp.task('watch', ['express', 'css', 'templates'], function () {
    server.listen(35729, function (err) {
      if (err) {
        return console.log(err)
      }

      gulp.watch('src/assets/stylesheets/*.sass', ['css'])
      // gulp.watch('src/assets/js/*.js', ['js'])
      gulp.watch('src/*.jade', ['templates'])
  })
})
