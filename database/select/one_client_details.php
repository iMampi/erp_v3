<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\SelectOneClient;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";


new DbHandler();

// $SelectOneCLientObj = new SelectOneClient(["uid" => "5"]);
// // var_dump($SelectOneCLientObj->data_for_db);
// new DbHandler();
// $Query = new Queries("select_one_client");
// $Binding = new Bindings($SelectOneCLientObj);
// $Statement = new StandardPreparedStatement($Query, $Binding);
// $res_ = DbHandler::execute_prepared_statement($Statement);
// // $res_ = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
// var_dump($res_);

if (($_SERVER["REQUEST_METHOD"] == "POST")) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);

    $SelectOneCLientObj = new SelectOneClient($data);
    // var_dump($NewClientObj);
    $Query = new Queries("select_one_client");
    $Binding = new Bindings($SelectOneCLientObj);
    $Statement = new StandardPreparedStatement($Query, $Binding);
    print(DbHandler::execute_prepared_statement($Statement));

    // foreach ($arr_banks as $value) {
    //     $converter_bank[$value["bank_name"]] = $value["bank_table"];
}
