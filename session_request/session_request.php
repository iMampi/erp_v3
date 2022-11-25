<?php

use Session\User;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();

if (($_SERVER["REQUEST_METHOD"] == "POST")) {
    $data = json_decode(file_get_contents('php://input'), true);
    $cycle = $data["cycle"];
    $action = $data["action"];
    try {
        $value = $_SESSION['user']->authorizations->$cycle->$action;
        print(json_encode(["response" => $value]));
    } catch (e) {
        print(json_encode(["response" => -1]));
    }
}
// $mc = "client";
// print_r($_SESSION['user']->authorizations->$mc);
