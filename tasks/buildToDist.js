var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var cheerio = require('cheerio');
var del = require('del');
var runSequence = require('run-sequence').use(gulp);

var paths = {
	src: __dirname+"/../src/",
	dist: __dirname+"/../dist/",
	public: __dirname+"/../public/",
	tasks: __dirname+"/../tasks/",
};


gulp.task("build-to-dist", function() {
	/*
	 04-18-2018 KTM:
	 This is the primary build to dist folder function. It'll copy files from src to dist. This is meant
	 for development purposes only.
	 */

	//Deletes dist folder
	del.sync(['./dist/**/*']);

	if (!fs.existsSync(paths.dist)){
		fs.mkdirSync(paths.dist);
	}

	//copies files over
	return moveFilesToDist(
		function() {
			runSequence('build-pages', ['build-comics-json', 'build-pages-comics-list'], 'build-thumbnails')
		}


	)
});

gulp.task("move-to-dist", function() {
	return moveFilesToDist();
});

function moveFilesToDist( onCompletionFn ) {
	return gulp.src(
		[
			'src/assets/**/*',
			'src/media/*',
			'src/pictures/**/*',
			'src/strips/**/*',
			'src/thefunk/**/*'
		], {base: './src'})
		.pipe( gulp.dest('./dist') )
		.on('end', function() {
			if ( onCompletionFn ) onCompletionFn();
		})
}

gulp.task("watch-source-sync-dist", function() {
	gulp.watch("./src/*").pipe( gulp.dest('./dist') )
})