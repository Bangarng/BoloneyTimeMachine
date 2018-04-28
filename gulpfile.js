var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var fs = require('fs');
var requireDir = require('require-dir');
var runSequence = require('run-sequence').use(gulp);

var paths = {
	src: __dirname+ "\\src\\",
	dist: __dirname+ "\\dist\\",
	public: __dirname+ "\\public\\",
	tasks: __dirname+ "\\tasks\\"
};

requireDir( paths.tasks );


gulp.task('server-dev', function() {
	/*
	 04-17-18 KTM:
	This allows you to have your local server and keeps URLs at root-relative. I was having issues with Webstorm
	built-in server, as it wouldn't allow for Root-Relative (without hacks) and almost had to change everything to
	relative urls.
	 */
	return browserSync.init({
		open: "local",
		server: {
			baseDir: "./dist/",
			index: "index.html",
			directory: false
		},
		files: ['**']
	});
});

gulp.task('server-public', function() {
	/*
	 04-17-18 KTM:
	This allows you to have your local server and keeps URLs at root-relative. I was having issues with Webstorm
	built-in server, as it wouldn't allow for Root-Relative (without hacks) and almost had to change everything to
	relative urls.
	 */
	return browserSync.init({
		open: "local",
		server: {
			baseDir: "./public/",
			index: "index.html",
			directory: false
		},
		files: ['**']
	});
});


gulp.task('watch-templates', function() {
	/*
	04-17-18 KTM:
	This guy will monitor the templates and build them when changes happen. It should trigger before
	browsersync reloads. Once files are modified, browsersync reloads.
	*/
	return gulp.watch(['src/templates/*', 'src/templates/**/*'], ['build-pages', 'build-pages-comics-list']);
});

gulp.task('watch-assets', function() {
	/*
	 04-28-18 KTM:
	Temporary fix. Need to make sure the solution is watching JS changes.
	 */

	return gulp.watch(['src/assets/*'], ['move-to-dist']);
});

gulp.task('master-watch', function() {
	runSequence('watch-templates', 'watch-assets')
});

gulp.task('main-dev', function() {
	runSequence('build-to-dist', 'server-dev', 'master-watch');
});

gulp.task('main-public', function() {
	runSequence('build-to-dist', 'build-to-public', 'server-public');
});

/*
	04-17-18: KTM
	This is your default task. When it executes, it'll run watch (monitors files), build, and then server.
	All you have to do is to configure this task to your default debug/run in WebStorm or open up a command line prompt,
	travel to this directory, and run "gulp".

	If you wish to run specific tasks, it is gulp [taskname]. Example: gulp watch, gulp build, etc.

 */
gulp.task('default', ['main-dev']);