(function() {
	/*
	04-28-18 KTM:
	This will read the location, find the current path, and update the correct button.
	 */

	var loc = window.location;
	var btn;

	if ( loc.pathname.indexOf("/") > -1 ) btn = "homePage";
	if ( loc.pathname.indexOf("/comics-") > -1 ) btn = "comicsPage";
	if ( loc.pathname.indexOf("/characters") > -1 ) btn = "charactersPage";
	if ( loc.pathname.indexOf("/the-funk") > -1 ) btn = "theFunkPage";
	if ( loc.pathname.indexOf("/about") > -1 ) btn = "aboutPage";

	function onRdy() {
		$("#"+ btn).addClass("active");
	}

	$( onRdy );

})();