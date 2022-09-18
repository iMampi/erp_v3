<?php

// use Session\User;
require_once __DIR__ . '/vendor/autoload.php';

use MySpace\Testeur;

// require __DIR__ . "/classes/Testeur.php";
$myauthoriz = [
    1, 0, 0, 0,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1

];
// echo count($myauthoriz);
// $dummy_user = new User(26, "Mampi", $myauthoriz);
$x = new Testeur("this stilll works");


echo "this is our test zone <br>";
var_dump($x->property);
// var_dump($dummy_user);