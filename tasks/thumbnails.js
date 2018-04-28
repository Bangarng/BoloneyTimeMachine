var gulp = require('gulp');
var fs = require('fs');
var thumb = require('node-thumbnail').thumb;

var paths = {
	src: __dirname+"/../src/",
	dist: __dirname+"/../dist/",
	public: __dirname+"/../public/",
	tasks: __dirname+"/../tasks/",
};


gulp.task('build-thumbnails', function() {
	/*
	 04-17-18 KTM:
	 Experimental. This will do a recursive function through all directories and create
	 thumbnails in one location.

	 */
	var path = paths.src +"strips";
	var dist = paths.dist +"strips/autoThumbnails";

	if (!fs.existsSync(dist)){
		fs.mkdirSync(dist);
	}

	scanDirectory(path);

	function scanDirectory( path ) {
		var dir = fs.readdirSync( path );

		for ( var i = 0; i < dir.length; i++ ) {
			var newPath = path + "/"+ dir[i];

			if ( fs.lstatSync(newPath).isDirectory() == true ) {
				scanDirectory(newPath);
			} else {
				createThumbnail(newPath);
			}
		}
	}

	function createThumbnail( path ) {
		//https://www.npmjs.com/package/node-thumbnail
		thumb({
			prefix: '',
			suffix: '',
			digest: false,
			hashingType: 'sha1', // 'sha1', 'md5', 'sha256', 'sha512'
			quiet: true,
			overwrite: false,
			skip: false,
			basename: undefined,
			ignore: false,
			source: path, // could be a filename: dist/path/image.jpg
			destination: dist,
			concurrency: 4,
			width: 100
		}, function(files, err, stdout, stderr) {
			if ( err ) throw err;
			//console.log( files );
			var filename = files[0].dstPath.split("\\");
			filename = filename[filename.length-1];

			console.log("Created thumbnails for "+ filename );
		});
	}
})

