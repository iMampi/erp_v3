<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\NewCommandeItem;
use Converter\NewFactureClient;

use function Session\can_create;
use function Session\can_update;

use Converter\UpdateCommandeItem;
use Converter\UpdateCommandeHeader;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();

new DbHandler();

if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_update("commande") && (can_create("commande")))) {
    $data = json_decode(file_get_contents('php://input'), true);

    // var_dump($data);
    // DbHandler::$connection->autocommit(\false);
    $step1 = new DbHandler();
    $conn = $step1::$connection;
    $conn->begin_transaction();

    $UpdateObj = new UpdateCommandeHeader($data["header"]);

    $Query1 = new Queries("update_commande");
    $Binding = new Bindings($UpdateObj);
    $Statement = new StandardPreparedStatement($Query1, $Binding);
    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    // echo "<br>jk<br>";
    // var_dump($temp_array_result);
    if (!$temp_array_result) {
        $conn->rollback();
        print("error01");
        print(json_encode($temp_array_result));
    } else {
        // $new_commande_uid = $temp_array_result[1][0][0];

        try {
            foreach ($data["items"] as $array_values) {
                if (!$array_values[0]) {
                    $ItemRowObj = new NewCommandeItem([...$array_values, $data["header"]["uid"]]);
                    // echo "xxxx";
                    // var_dump($ItemRowObj);
                    // echo "xxxx";
                    $Query2 = new Queries("save_new_commande_row");
                    $Binding = new Bindings($ItemRowObj);
                    $Statement = new StandardPreparedStatement($Query2, $Binding);
                    $temp_insert_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
                    if (!$temp_insert_result[0]) {
                        print(json_encode($temp_insert_result));
                        print("error02");
                        $conn->rollback();
                        break;
                    }
                } else {
                    $ItemRowObj = new UpdateCommandeItem([...$array_values, $data["header"]["uid"]]);
                    $Query3 = new Queries("update_commande_row");
                    $Binding2 = new Bindings($ItemRowObj);
                    $Statement2 = new StandardPreparedStatement($Query3, $Binding2);
                    $temp_insert_result = DbHandler::execute_prepared_statement($Statement2, MYSQLI_NUM);
                }
            }
        } catch (\Throwable $th) {
            $conn->rollback();
            //error with commande item row
            print("error03" . $th);
        }
        if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_update("facture_client") && (can_create("facture_client")))) {
            try {
                if ($data["header"]["state"] === 2) {

                    $NewFactureClientObj = new NewFactureClient([$data["header"]["uid"], $data["header"]["commercial"]]);
                    $Query3 = new Queries("save_new_facture_client");
                    $Binding3 = new Bindings($NewFactureClientObj);
                    $Statement3 = new StandardPreparedStatement($Query3, $Binding3);
                    $temp_array_result = DbHandler::execute_prepared_statement($Statement3, MYSQLI_NUM);
                }
            } catch (\Throwable $th) {
                $conn->rollback();
                //error with new facture client
                print("error04" . $th);
            }
        } else {
            $conn->rollback();
            print("error05 : NOT AUTHORIZED TO CREATE FACTURE CLIENT");
        }

        $conn->commit();

        //just returning the command uid in the end
        print(json_encode($temp_array_result));
    }
}
