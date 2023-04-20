<?php

use Converter\NewCommandeHeader;
use Converter\NewCommandeItem;
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

    DbHandler::$connection->autocommit(false);
    DbHandler::$connection->begin_transaction(false);

    $NewObj = new NewCommandeHeader($data["header"]);

    // var_dump($NewClientObj);
    $Query1 = new Queries("save_new_commande");
    $Binding = new Bindings($NewObj);
    $Statement = new StandardPreparedStatement($Query1, $Binding);
    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);

    if ($temp_array_result[0] == "error") {
        DbHandler::$connection->rollback();
        print(json_encode($temp_array_result));
    } else {
        $new_commande_uid = $temp_array_result[1][0];

        try {
            foreach ($data["items"] as $array_values) {
                $ItemRowObj = new NewCommandeItem([...$array_values, $new_commande_uid]);
                $Query2 = new Queries("save_new_commande_row");
                $Binding = new Bindings($ItemRowObj);
                $Statement = new StandardPreparedStatement($Query2, $Binding);
                $temp_insert_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
                if (!$temp_insert_result[0]) {
                    print(json_encode($temp_insert_result));
                    DbHandler::$connection->rollback();
                    break;
                }
            }
            DbHandler::$connection->commit();
        } catch (\Throwable $th) {
            print(json_encode($temp_array_result));
            DbHandler::$connection->rollback();
        }
    }





    // echo "ttttttt<br>";

    // print(json_encode($temp_array_result));

    // foreach ($arr_banks as $value) {
    //     $converter_bank[$value["bank_name"]] = $value["bank_table"];
}
