<?php

use Converter\SelectOneEmployee;
use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Database\StandardPreparedStatement;

use function Session\can_visit;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();


new DbHandler();



if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_visit("employee"))) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);

    $SelectOneObj = new SelectOneEmployee($data);
    // var_dump($NewClientObj);
    $Query = new Queries("select_one_employee");
    $Binding = new Bindings($SelectOneObj);
    $Statement = new StandardPreparedStatement($Query, $Binding);
    print(json_encode(DbHandler::execute_prepared_statement($Statement)));

    // foreach ($arr_banks as $value) {
    //     $converter_bank[$value["bank_name"]] = $value["bank_table"];
} else {
    print(json_encode([\false, ['error' => "unauthorized"]]));
}
