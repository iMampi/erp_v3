<?php

use Converter\NewClient;
use Database\Bindings;
use Database\DbHandler;
use Database\Queries;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

new DbHandler();


// print "<br>TESTED<br>";
// var_dump(DbHandler::select_query("select * from bidet")->dataArray);
// print "<br>TESTED<br>";




if (($_SERVER["REQUEST_METHOD"] == "POST")) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);

    $NewClientObj = new NewClient($data);
    // var_dump($NewClientObj);
    $Query = new Queries("save_new_client");
    $Binding = new Bindings($NewClientObj);
    $Statement = new StandardPreparedStatement($Query, $Binding);
    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    print(json_encode($temp_array_result));

    // foreach ($arr_banks as $value) {
    //     $converter_bank[$value["bank_name"]] = $value["bank_table"];
}
