var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var cheerio = require('cheerio');
var strip = require('gulp-strip-comments');

var paths = {
	src: __dirname+"/../src/",
	dist: __dirname+"/../dist/",
	public: __dirname+"/../public/",
	tasks: __dirname+"/../tasks/",
};


gulp.task('build-pages', function() {
	/*
	 04-17-18 KTM:
	 I made a rough build function, which will build out your static pages. Thus, you can do templating
	 in separate files, build into the correct files, and deploy the public site.

	 This removes the need to do the ajax call for header/footer.

	 If you wish, feel free to find a template engine that can build static pages.
	 */
	var template = "";
	var path = paths.src + "templates\\";

	var pages = ["about.html", "characters.html", "index.html", "the-funk.html"];

	for ( var i = 0; i < pages.length; i++ ) {
		var distPath = paths.dist + pages[i];

		template = buildTemplate( fs.readFileSync(path +"body/"+ pages[i] ) );
		buildFile( distPath, template );
	}
});

gulp.task('build-pages-comics-list', function() {
	/*
	 04-17-18 KTM:
	 This reads the comics.json file and builds out the comics-new & comics-old list.

	 It is pretty ugly, but it works.
	 */
	var path = paths.src +"templates\\";

	var body = fs.readFileSync(path +'\\body\\comics-list.html');
	var comics = JSON.parse( fs.readFileSync( paths.dist+'comics.json') );

	var $old = cheerio.load(body);
	var $new = cheerio.load(body);


	for ( var i = 0; i < comics.length; i++ ) {
		/*
		var thumbUrl = comics[i].url.split("/");
		thumbUrl = thumbUrl[ thumbUrl.length - 1];

		if ( comics[i].hasThumbnail == true ) {
			thumbUrl = "/strips/thumbnails/"+ thumbUrl;
		} else {
			thumbUrl = "/strips/autoThumbnails/"+ thumbUrl;
		}

		$old("tbody").append("<tr class='comics-item'><td><a href=\"/index.html#/"+comics[i].title+"\">"+ (i+1) +") "+ comics[i].title +"</a><img src=\""+thumbUrl+"\" /></td></tr>");
		*/
		$old("tbody").append("<tr class='comics-item'><td><a href=\"/index.html#/"+comics[i].title+"\">"+ (i+1) +") "+ comics[i].title +"</a></td></tr>");
	}

	for ( var i = comics.length-1; i >= 0; i--) {
		$new("tbody").append("<tr><td><a href=\"/index.html#/"+comics[i].title+"\">"+ (i+1) +") "+ comics[i].title +"</a></td></tr>");
	}

	var templateNew = buildTemplate($new.html());
	var templateOld = buildTemplate($old.html());

	buildFile( paths.dist +"comics-new.html", templateNew );
	buildFile( paths.dist +"comics-old.html", templateOld );
	//buildFile( paths.public +"comics-new.html", templateNew );
	//buildFile( paths.public +"comics-old.html", templateOld );
})


function buildFile(filePath, content) {
	fs.writeFile(filePath, content, function(err) {
		if ( err ) throw err;
	});
}

function buildTemplate(content) {
	var path =	paths.src +'templates\\';

	var meta = fs.readFileSync(path +'meta.html');
	var header = fs.readFileSync(path +'header.html');
	var footer = fs.readFileSync(path +'footer.html');

	var template = "<!DOCTYPE html><html>";
	template += meta + "<body>"+ header + content;
	template += footer +"</body></html>";

	return template;
}

