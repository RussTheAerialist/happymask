var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify')

gulp.task('browserify', [], function() {
	return browserify('src/assets/scripts/main.js')
	  .bundle()
	  .pipe(source('bundle.js'))
	  .pipe(gulp.dest('build'))
})
