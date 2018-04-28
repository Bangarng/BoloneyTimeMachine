<!--===============================GOOGLE FONTS=============================================================-->
if(!document.getElementById('googleFont1')) {
    var link = document.createElement('link');
    link.id = 'googleFont1';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css?family=Architects+Daughter';
    document.head.appendChild(link);
}
<!--===============================BOOTSTRAP CDN COMPILED AND MINIFIED CSS==================================-->
if(!document.getElementById('bootstrapCDN')) {
    var link = document.createElement('link');
    link.id = 'bootstrapCDN';
    link.rel = 'stylesheet';
    link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
    link.integrity = 'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u';
    link.crossorigin="anonymous";
    document.head.appendChild(link);
}
<!--===============================BTM CSS==================================================================-->
if(!document.getElementById('btmCSS')) {
    var link = document.createElement('link');
    link.id = 'btmCSS';
    link.rel = 'stylesheet';
    link.href = '/assets/btmcss.css';
    link.type = 'text/css';
    document.head.appendChild(link);
}
<!--===============================BTM FAVICON=========================================================-->
if(!document.getElementById('btmFavIcon')) {
    var link = document.createElement('link');
    link.id = 'btmFavIcon';
    link.rel = 'icon';
    link.href = '/pictures/btmfavicon.png';
    document.head.appendChild(link);
}
<!--========================SCRIPT TEMPLATE======================================-->
if(!document.getElementById('id1')) {
    var script = document.createElement('script');
    script.id = 'id1';
    script.src = 'Scripts/Script1.js';
    document.head.appendChild(script);
}

/*$("#meta").before("<meta name='description' content='A silly superhero comic about Hero, Sidekick and friends. New comic every Thursday.'>");*/
