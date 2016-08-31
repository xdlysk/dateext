const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

gulp.task('default',function(){
	return gulp.src('index.js')
    .pipe(rename('date-ext.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});