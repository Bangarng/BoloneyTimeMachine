var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var runSequence = require('run-sequence').use(gulp);
var minify = require('gulp-minify');
var del = require('del');
var cleanCss = require('gulp-clean-css');
var strip = require('gulp-strip-comments');
var jsonminify = require('gulp-jsonminify');
var htmlmin = require('gulp-htmlmin');

gulp.task("build-to-public", function() {
	/*
	 04-18-2018 KTM:
	This is the primary build to public folder function. It'll copy files from dist to public. For some files, it'll
	perform special handling, such as minification and comment removal. These are to improve performance.
	 */

	del.sync(['./public/*']);

	//JavaScript Files
	gulp.src(['dist/assets/*.js'], {base: './dist'})
		.pipe( minify({
			noSource: true,
			ext: {
				min: '.js'
			}
		}))
		.pipe( gulp.dest('./public') );

	//Css Files
	gulp.src(['dist/assets/*.css'], {base: './dist'})
		.pipe( cleanCss())
		.pipe( gulp.dest('./public') );

	//html files
	gulp.src('dist/*.html', {base: './dist'})
		.pipe( strip() )
		.pipe( htmlmin({ collapseWhitespace: true }) )
		.pipe( gulp.dest('./public') );

	//json file
	gulp.src('dist/*.json', {base: './dist'})
		.pipe( jsonminify() )
		.pipe( gulp.dest('./public') );

	//Remaining Files
	return gulp.src(
		[
			'dist/assets/external/*',
			'dist/assets/boopee/*',
			'dist/media/*',
			'dist/pictures/**/*',
			'dist/strips/**/*',
			'dist/thefunk/**/*'
		], {base: './dist'})
		.pipe( gulp.dest('./public') );

});