<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\UpdateStock;
use Converter\NewAvoirClient;
use function Session\can_create;
use Converter\UpdateIdentifiable;
use Converter\NewCommandeAvoirItem;
use Converter\NewCommandeAvoirHeader;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();


if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_create("avoir_client"))) {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data["header"]["commande-uid"])) {
        $data["header"]["commande-uid"] = \null;
    }
    if (!isset($data["header"]["fact-origin"])) {
        $data["header"]["fact-origin"] = \null;
    }

    // DbHandler::$connection->autocommit(\false);

    $step1 = new DbHandler();
    $conn = $step1::$connection;
    $conn->begin_transaction();


    // CREATE NEW COMMANDE GET COMMANDE UID. SAVE HEADERS
    $NewObj = new NewCommandeAvoirHeader($data["header"]);

    $Query1 = new Queries("save_new_commande");
    $Binding = new Bindings($NewObj);
    $Statement = new StandardPreparedStatement($Query1, $Binding);
    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    $data["header"]["uid"] = $temp_array_result[1][0][0];
    // echo "<br>jk<br>";
    // var_dump($temp_array_result);
    if (!$temp_array_result) {
        //unsuccesful
        $conn->rollback();
        print("error01");
        print(json_encode($temp_array_result));
        exit;
    } else {
        //succesful
        $new_commande_uid = $temp_array_result[1][0][0];

        try {
            // SAVE ITEM DETAILS FOR COMMANDE
            foreach ($data["items"] as $array_values) {
                if ($array_values[2] == 0) {
                    continue;
                }
                $ItemRowObj = new NewCommandeAvoirItem([...$array_values, $new_commande_uid, $data["header"]["commande-uid"]]);
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
                    exit;
                }
                // IF RETURN OF ITEMS
                try {
                    if ($data["header"]["type"] === "1" && $ItemRowObj->data_for_db["stockable"]) {
                        $UpdateStockObj = new UpdateStock(["code" => $ItemRowObj->data_for_db["item_uid"], "quantity" => $ItemRowObj->data_for_db["quantity"]]);
                        $Query4 = new Queries("update_stock_add");
                        $Binding4 = new Bindings($UpdateStockObj);
                        $Statement4 = new StandardPreparedStatement($Query4, $Binding4);
                        $temp_array_stock_update = DbHandler::execute_prepared_statement($Statement4, MYSQLI_NUM);
                    }
                } catch (\Throwable $th) {
                    $conn->rollback();
                    print("error03b");
                    exit;
                }

                try {
                    if ($data["header"]["type"] === "1" && $ItemRowObj->data_for_db["identifiable"]) {
                        $UpdateIdentifiabletockObj = new UpdateIdentifiable(["code" => $ItemRowObj->data_for_db["item_uid"], "num_serie" => $ItemRowObj->data_for_db["num_serie"], "actif" => 1]);
                        $Query5 = new Queries("update_identifiable");
                        $Binding5 = new Bindings($UpdateIdentifiabletockObj);
                        $Statement5 = new StandardPreparedStatement($Query5, $Binding5);
                        $temp_array_identifiable_update = DbHandler::execute_prepared_statement($Statement5, MYSQLI_NUM);
                    }
                } catch (\Throwable $th) {
                    $conn->rollback();
                    print("error03c");
                    exit;
                }
            }
        } catch (\Throwable $th) {
            $conn->rollback();
            print("error03");
            exit;
        }

        if (($_SERVER["REQUEST_METHOD"] == "POST") &&  (can_create("avoir_client"))) {
            try {
                // EFFECTIVELY CREATING AVOIR
                if ($data["header"]["state"] === "3") {

                    $NewAvoirClientObj = new NewAvoirClient([$data["header"]["uid"], $data["header"]["commercial"], $data["header"]["type"], $data["header"]["fact-origin"]]);
                    $Query3 = new Queries("save_new_avoir_client");
                    $Binding3 = new Bindings($NewAvoirClientObj);
                    $Statement3 = new StandardPreparedStatement($Query3, $Binding3);
                    $temp_array_result_fact = DbHandler::execute_prepared_statement($Statement3, MYSQLI_NUM);
                } else {
                    $conn->rollback();
                    print("error06 : not correct state");
                }
            } catch (\Throwable $th) {
                $conn->rollback();
                //error with new facture client
                print("error04" . $th);
                exit;
            }
        } else {
            $conn->rollback();
            print("error05 : NOT AUTHORIZED TO CREATE AVOIR CLIENT");
            exit;
        }
    }
    $conn->commit();


    //just returning the command uid in the end
    if (\str_contains($_SERVER["HTTP_REFERER"], "avoirs_clt.php")) {
        $temp_array_result_fact[1][0][] = $data["header"]["uid"];
        print(json_encode($temp_array_result_fact));
    } else if (\str_contains($_SERVER["HTTP_REFERER"], "commandes.php")) {
        print(json_encode($temp_array_result));
    }
}
