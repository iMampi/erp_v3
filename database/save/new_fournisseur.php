<?php

use Converter\NewFournisseur;
use Database\Bindings;
use Database\DbHandler;
use Database\Queries;
use Database\StandardPreparedStatement;

use function Session\can_create;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();
new DbHandler();


// print "<br>TESTED<br>";
// var_dump(DbHandler::select_query("select * from bidet")->dataArray);
// print "<br>TESTED<br>";


if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_create("fournisseur"))) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);
    // echo 'here we are';
    $NewFournisseurObj = new NewFournisseur($data);
    // var_dump($NewClientObj);
    $Query = new Queries("save_new_fournisseur");
    $Binding = new Bindings($NewFournisseurObj);
    $Statement = new StandardPreparedStatement($Query, $Binding);
    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    // echo "ttttttt<br>";

    print(json_encode($temp_array_result));

    // foreach ($arr_banks as $value) {
    //     $converter_bank[$value["bank_name"]] = $value["bank_table"];
}
