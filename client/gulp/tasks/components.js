var gulp = require('gulp'),
    concat = require('gulp-concat'),
    dir = "./bower_components/"


gulp.task('components', function() {
  return gulp.src([
      dir + 'jquery/dist/jquery.js',
      dir + 'bootstrap-sass-official/assets/javascripts/bootstrap.js'
  ]).pipe(concat('bower.js'))
    .pipe(gulp.dest('build'))
})
