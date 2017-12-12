<?php
$myPDO = new PDO('mysql:host=localhost;dbname=PHPtask', 'root', '');

$result = $myPDO->query("SELECT * FROM majstori");

var_dump($result);

function echothis () {
    echo 'dsadsa';
}
// blah blah blah
echothis();



