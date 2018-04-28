/*

 */

var COMICS_URL = "\\comics.json";
var COMICS = [];


function getComicsJson() {
	/*
	 04-18-2018 KTM:
	This pulls the comics.json file, which is key for everything.

	You could inject the file into the template engine, so we don't have to wait for the ajax call.

	For weird cases, you can include handling for "fail". I left it blank for now.
	 */

	var comicsRequest = $.ajax({
		url: COMICS_URL,
		dataType: "json",
		method: "GET",
		processData: false
	}).done(function (data) {
		COMICS = data;
		$( onReady );
	}).fail(function (jqXHR, textStatus) {

		//console.log( "Request failed: " + textStatus );
	}).always(function () {
		//
	})
}


var Navigation = (function () {
	/*
	 04-18-2018 KTM:
	 I built this function for a previous project and decided to reuse it for yours. I renamed
	 the functions appropriately.

	 The benefits of this is -

	 - Current comic is loaded in hash (allows you to share that url and go directly to comic).
	 - One page
	 - All controls are handled by javascript (thanks to comics.json)

	 */
	var isLoading = false;
	var comicIndex = 0;
	var __hash = null;

	function initialize() {
		applyControls();
		getHash();
		loadComic();

		/*
		04-28-2018 KTM:
		This is the DISQUS injecting their script onto your page. I modified it (fuck the rules) and made it easier
		to read. It only needs to load one time.
		 */
		var script = document.createElement("script");
		script.id = "commentStrip";
		script.src = 'https://boloneytimemachine.disqus.com/embed.js';
		script.setAttribute('data-timestamp', +new Date());
		$("#disqus_thread").append( script );
	};

	function loadComic() {
		var comic = COMICS[ comicIndex ];

		setHash( comic.title );
		$(".comicStrip").attr("src", "strips"+comic.url);
		$("#BTM-Comic-Title-Mobile").text(comic.title);

		if ( comicIndex == 0 ) {
			//disable ctrl;
			$(".nav-btn-first").hide();
			$(".nav-btn-left").hide();
		}

		if ( comicIndex == (COMICS.length-1) ) {
			//disable ctrl;
			$(".nav-btn-last").hide();
			$(".nav-btn-right").hide();
		}

		loadComments();
	};

	function loadComments() {
		/*
		04-28-2018 KTM:

		This is the DISQUS modification portion. It'll either setup disqus_config for the first time (upon initialization)
		OR it'll reset the entire thing with a new config.

		It begged me when it didn't. True story.
		REF: https://help.disqus.com/developer/using-disqus-on-ajax-sites
		 */

		if ( window.DISQUS != null ) {
			DISQUS.reset({
				reload: true,
				config: function () {
					this.page.url = window.origin;
					this.page.identifier = __hash;
				}
			});
		} else {
			window.disqus_config = function () {
				this.page.url = window.origin;
				this.page.identifier = __hash;
			};
		}

	}

	//{ START - Event Listener / Controls
	function applyControls() {
		var navElements = $("[class*='nav-btn-']");

		navElements.each(applyElementControl);
	};

	function applyElementControl() {
		var $e = $(this);

		$e.on("click", loadComicClick);
	};

	function loadComicClick(event) {
		var $e = $(this);
		var ctrlType = null;
		event.preventDefault();

		if ( $e.hasClass("nav-btn-first") ) ctrlType = "first";
		if ( $e.hasClass("nav-btn-last") ) ctrlType = "last";
		if ( $e.hasClass("nav-btn-left") ) ctrlType = "left";
		if ( $e.hasClass("nav-btn-right") ) ctrlType = "right";
		if ( $e.hasClass("nav-btn-random") ) ctrlType = "random";

		$("[class*='nav-btn']").show();//;.removeClass("disabled");

		switch (ctrlType) {
			case "first": {
				comicIndex = 0;
				break;
			}
			case "last": {
				comicIndex = COMICS.length -1;
				break;
			}
			case "left": {
				if ( comicIndex == 0 ) return;

				comicIndex = comicIndex - 1;
				break;
			}
			case "right": {
				if ( comicIndex == COMICS.length-1 ) return;

				comicIndex = comicIndex + 1;
				break;
			}
			case "random": {
				comicIndex = randomComicIndex();
				break;
			}
		}

		loadComic();
	};

	function randomComicIndex() {
		var rng = Math.floor( Math.random() * (COMICS.length-1) );

		if ( rng == comicIndex ) return randomComicIndex();
		return rng;
	}
	//} END - Event Listener / Controls

	//{ START - Hash Controls
	function setHash(url) {
		window.location.hash = "#/" + url;

		__hash = url;
	};

	function getHash() {
		var hash = window.location.hash;

		hash = hash.split("#/")[1];

		if (hash == "" || hash == undefined) {
			if ( COMICS.length > 0 ) {
				comicIndex = COMICS.length-1;
			}
		} else {
			var decodedHash = decodeURI(hash);
			for ( var i = 0; i < COMICS.length; i++ ) {
				if ( COMICS[i].title == decodedHash ) {
					comicIndex = i;
					break;
				}
			}
		}

		__hash = hash;
		//loadComic();
	};
	//} END - Hash Controls

	//{ START - return
	return {
		initialize: initialize
	};
	//} END - return
})();


function onLoad() {
	getComicsJson();
}

function onReady() {
	Navigation.initialize();
}

onLoad();