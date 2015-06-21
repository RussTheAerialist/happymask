var gulp = require('gulp'),
    sass = require('gulp-sass'),
    optimize = require('gulp-csso'),
    livereload = require('gulp-livereload'),
    bower = require('gulp-bower'),
    server = require('../reload')

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./bower_components'))
})

gulp.task('icons', ['bower'], function() {
  return gulp.src('./bower_components/fontawesome/fonts/**.*')
    .pipe(gulp.dest('dist/fonts/'))
})

gulp.task('css', ['bower', 'icons'], function() {
  return gulp.src('src/assets/stylesheets/main.sass')
    .pipe(sass({
      includePaths: [
        './src/assets/stylesheets',
        './bower_components/bootstrap-sass-official/assets/stylesheets',
        './bower_components/fontawesome/scss'
      ],
      errLogToConsole: true
    })).pipe( optimize() )
       .pipe( gulp.dest('dist') )
       .pipe( livereload( server ) )
})
