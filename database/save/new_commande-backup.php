<?php

use Converter\NewCommandeHeader;
use Converter\NewCommandeItem;
use Database\Bindings;
use Database\DbHandler;
use Database\Queries;
use Database\StandardPreparedStatement;
use DbHandler as GlobalDbHandler;

use function Session\can_create;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();
new DbHandler();

if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_create("fournisseur"))) {
    $data = json_decode(file_get_contents('php://input'), true);

    // DbHandler::$connection->autocommit(\false);
    DbHandler::start_transaction();

    $NewObj = new NewCommandeHeader($data["header"]);

    $Query1 = new Queries("save_new_commande");
    $Binding = new Bindings($NewObj);
    $Statement = new StandardPreparedStatement($Query1, $Binding);
    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    echo "<br>jk<br>";
    var_dump($temp_array_result);
    if ($temp_array_result[0] === "error") {
        // DbHandler::$connection->rollback();
        print("error01");
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
                    print("error02");

                    // DbHandler::$connection->rollback();
                    break;
                }
            }
        } catch (\Throwable $th) {
            // DbHandler::$connection->rollback();
        }
    }
    // DbHandler::$connection->autocommit(\true);

    //just returning the command uid in the end
    print(json_encode($temp_array_result));
}
