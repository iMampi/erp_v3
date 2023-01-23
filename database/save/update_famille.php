<?php

use Converter\UpdateFamille;
use Database\Bindings;
use Database\DbHandler;
use Database\Queries;
use Database\StandardPreparedStatement;

use function Session\can_update;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();

new DbHandler();

if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_update("famille"))) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);
    //we had a prblem it was solved by rewriting a bit DbHandler::update_query(). before that, we had to write query manully with concatenation string.
    ////////////////////
    $UpdateObj = new UpdateFamille($data);
    $Query = new Queries("update_famille");
    $Binding = new Bindings($UpdateObj);
    $Statement = new StandardPreparedStatement($Query, $Binding);

    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    ////////////////////
    // with concatenation string.//
    // $query = "update categories set name=\"" . $data["name"] . "\", active=" . $data["actif"] . " where uid=" . $data["uid"] . ";";
    // $temp_array_result = DbHandler::update_query($query);
    ////////////////////////
    // print("callllllled update");
    // var_dump($temp_array_result);
    print(json_encode($temp_array_result));
} else {
    print(json_encode([\false, ['error' => "unauthorized"]]));
}
