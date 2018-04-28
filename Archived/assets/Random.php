<? 
    $urls = array(
    array(
        '../../BTMCustomSite/Comics/GamedOut.html',
		'../../BTMCustomSite/Comics/StolenXbox.html',
        '../../BTMCustomSite/Comics/MissingVideoGames.html'
    )
);

$randomlink = array_rand($urls, 1);
$thelink = $urls[$randomlink];
echo '<a target="_blank" href="' . $thelink . '">Poop</a>'
?>