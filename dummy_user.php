<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/roles/classes.php";
$myauthoriz = [
    0, 1, 0, 0,
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
$dummy_user = new User(1, "tester_mampi", $myauthoriz);