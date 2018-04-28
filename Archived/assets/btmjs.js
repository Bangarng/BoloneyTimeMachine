function randomComic() {
    var arr = [
	"/comic/welcome-aboard.html",
	"/comic/first-day.html",
	"/comic/havvoc.html",
	"/comic/im-dickie-stevens.html",
	"/comic/superhero-starter-kit.html",
	"/comic/technology.html",
	"/comic/grapple-gun-practice.html",
	"/comic/dammit-spidey.html",
	"/comic/first-fight.html",
	"/comic/heros-super-car.html",
	"/comic/the-mothman.html",
	"/comic/mr-bears-new-look.html",
	"/comic/bad-haircut.html",
	"/comic/new-fad.html",
	"/comic/stfu.html",
	"/comic/forgetful.html",
	"/comic/where-have-you-been.html",
	"/comic/can-i-get-that-to-go.html",
	"/comic/sharing-is-caring.html"];
	
    var value = arr[Math.floor(Math.random() * arr.length)];
    window.location = value;
    // window.location = value;     // remove the comment at the beginning to actually navigate
}	

$("#meta").before("<meta name='description' content='A silly superhero comic about Hero, Sidekick and friends. New comic every Thursday.'>");
