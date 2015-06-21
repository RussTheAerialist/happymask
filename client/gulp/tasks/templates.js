var gulp = require('gulp'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload'),
    server = require('../reload')

gulp.task('templates', function() {
  return gulp.src('src/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload(server))
})
