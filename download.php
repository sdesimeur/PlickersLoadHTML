<?php
    header('Content-type: text/plain');
    $url=base64_decode($_POST['url']);
	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$content = curl_exec($ch);
	curl_close($ch);

    //$content=file_get_contents($url);
    echo($content);
?>
