var gulp = require('gulp');
var fs = require('fs');

var paths = {
	src: __dirname + "/../src/",
	dist: __dirname + "/../dist/",
	public: __dirname + "/../public/",
	tasks: __dirname + "/../tasks/",
};

function c(title, url, hasVertical, hasThumbnail) {
	list.push({
		title: title,
		url: url,
		hasVertical: false || hasVertical,
		hasThumbnail: false || hasThumbnail
	});
}

gulp.task("build-comics-json", function () {
	var publicPath = paths.public + "comics.json";
	var destPath = paths.dist + "comics.json";
	var content = JSON.stringify(list, null, 4);

	fs.writeFileSync(publicPath, content, function (err) {
		if (err) throw err;
	});
	fs.writeFileSync(destPath, content, function (err) {
		if (err) throw err;
	});
})

/*
	04-18-2018 KTM:
	This may be an easier way of handling the data for right now. It will generate a JSON file based on the arguments
	below. We can easily generate the object through the function "c" and update properties on the fly as needed.

	When this grows even further, we may need to revise this and find an improved maintainable method.

	Unfortunately, we cannot associate this to a "watch" task. Any changes may to the below requires a manual execution
	of "build-comics-json" and "build-pages-comics-list" OR "master-build". If you are running "gulp" already, you can
	stop and start "gulp", which will also execute the above.

	The purpose of watch was to run "gulp", edit this file, and see changes automatically. It is possible, imo, but
	it may require moving the list to another file and trying to import the list into the function.
 */

var list = [];
c("Welcome Aboard", "/2017/06/1-CS-6P-Welcome-Aboard.png", true);
c("First Day", "/2017/06/2-BW-6P-First-Day.png", true);
c("H.A.V.V.O.C", "/2017/06/3-CS-4P-H.A.V.V.O.C.png", true);
c("I'm Dickie Stevens", "/2017/06/4-CS-4P-Im-Dickie-Stevens.png", true);
c("Superhero Starter Kit", "/2017/06/5-BW-3P-Superhero-Starter-Kit.png", true);
c("Technology", "/2017/06/6-BW-4P-Technology.png", true);
c("Grapple Practice", "/2017/07/7-CS-4P-Grapple-Practice.png", true);
c("Damnit Spiedy", "/2017/07/8-CS-6P-Damnit-Spidey.png", true);
c("First Fight", "/2017/07/9-CS-4P-First-Fight.png", true);
c("Heroes Super Car", "/2017/07/10-CS-6P-Heros-Super-Car.png", true);
c("The Mothman", "/2017/08/11-CS-6P-The-Mothman.png", true);
c("Mr Bear's New Look", "/2017/08/12-CS-8P-Mr-Bears-New-Look.png", true);
c("Bad Haircut", "/2017/08/13-CS-4P-Bad-Haircut.png", true);
c("New Fad", "/2017/08/14-CS-4P-New-Fad.png", true);
c("STFU", "/2017/09/15-CS-4P-STFU.png", true);
c("Forgetful", "/2017/09/16-CS-3P-Forgetful.png", true);
c("Where have you been", "/2017/09/17-CS-6P-Where-Have-You-Been.png", true);
c("Can I get that to go", "/2017/09/18-CS-4PW-Can-I-Get-That-To-Go.png", false);
c("Sharing is Caring", "/2017/10/19-CS-4P-Sharing-Is-Caring.png", true);
c("Video Games", "/2017/10/19-CS-4P-Video-Games.png", true);
c("Gamed Out", "/2017/10/20-BW-3P-Gamed-Out.png", true);
c("Hiatus", "/2017/10/XX-BW-4P-Hiatus.png", false);
c("Remission", "/2018/01/21-CS-4P-Remission.png", false);
c("High Kick", "/2018/01/22-CS-4P-High-Kick.png", false);
c("Doppelganger", "/2018/02/23-CS-4P-Doppelganger.png", false);
c("Persuasion", "/2018/02/24-CS-4P-Persuasion.png", false);
c("The Shadowtaken", "/2018/03/25-CS-4P-The-Shadowtaken.png", false);
c("The Shadowtaken Part 2", "/2018/03/26-CS-6P-The-Shadowtaken-Part-2.png", false);
c("Common Courtesy", "/2018/04/27-CS-4P-Common-Courtesy-GIF.gif", false);
c("Robo-Bot", "/2018/04/28-CS-9P-Robo-Bot.png", false, true);
//c("", "/2018/0/", false);



