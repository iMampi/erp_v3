<?php

// TODO:HASH PASSWORD 
require_once $_SERVER["DOCUMENT_ROOT"] . "/database/db.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

use Session\User;

// print_r($_POST);
echo "<br>";
// $query= "select * from users";
// var_dump(Myquery($connection,$query));
$signing_in = login($connection, $_POST["login"], $_POST["password"]);
$host  = $_SERVER['HTTP_HOST'];




if ($signing_in) {
    session_start();
    $permissions = array_slice($signing_in, 3, count($signing_in) - 4);
    $_SESSION["user"] = new User(intval($signing_in[0]), $signing_in[1], $permissions);
    $_SESSION["logged"] = $signing_in["logged"];
    // va:r_dump($_SESSION["user"]);
    header("Location: http://$host/index.php");
    exit;
} else {
    header("Location: http://$host/index.php");
    exit;
}
?>;