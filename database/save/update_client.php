<?php

use Converter\UpdateClient;
use Database\Bindings;
use Database\DbHandler;
use Database\Queries;
use Database\StandardPreparedStatement;

use function Session\can_update;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();

new DbHandler();

if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_update("client"))) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);

    $UpdateClientObj = new UpdateClient($data);
    // var_dump($NewClientObj);
    $Query = new Queries("update_client");
    $Binding = new Bindings($UpdateClientObj);
    $Statement = new StandardPreparedStatement($Query, $Binding);

    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    print(json_encode($temp_array_result));
} else {
    print(json_encode([\false, ['error' => "unauthorized"]]));
}
