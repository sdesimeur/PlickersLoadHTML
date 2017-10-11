<?php
    header('Content-type: text/plain');
    $url=base64_decode($_POST['url']);
    $content=file_get_contents($url);
    echo($content);
?>
