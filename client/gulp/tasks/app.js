var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify')

gulp.task('app', [ 'browserify', 'components' ], function() {
  return gulp.src('build/*.js')
             .pipe(concat('bundle.js'))
             .pipe(uglify())
             .pipe(gulp.dest('dist/'))
})
