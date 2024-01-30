<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\NewCommandeItem;
use Converter\NewFactureClient;
use Converter\NewCommandeHeader;
use Converter\UpdateIdentifiable;
use Converter\UpdateStock;

use function Session\can_create;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();

require_once $_SERVER["DOCUMENT_ROOT"] . "/utilities/check_stocks.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/utilities/check_identifiables.php";

if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_create("commande"))) {
    $data = json_decode(file_get_contents('php://input'), true);

    // DbHandler::$connection->autocommit(\false);
    $step1 = new DbHandler();
    $conn = $step1::$connection;
    $conn->begin_transaction();

    //check the inventory item stock_to_check 
    $stock_to_check = [];
    $identifiables_to_check = [];
    try {
        // TODO : dont forget to put me back to normal
        if ($data["header"]["state"] === 2) {
            // if (true) {
            // group quantities for easy stock checking
            foreach ($data["items"] as $array_values) {
                // stockable?
                if ($array_values[7]) {
                    // item alredy listed?
                    if (!array_key_exists($array_values[1], $stock_to_check)) {
                        $stock_to_check[$array_values[1]] = 0;
                    }
                    $stock_to_check[$array_values[1]] += $array_values[2];
                    // identifiable? 
                    if ($array_values[6]) {
                        // item already listed?
                        if (!array_key_exists($array_values[1], $identifiables_to_check)) {
                            $identifiables_to_check[$array_values[1]] = [];
                        }
                        // num-serie already listed?
                        if (!in_array($array_values[4], $identifiables_to_check[$array_values[1]])) {
                            $identifiables_to_check[$array_values[1]][] = $array_values[4];
                            $test = check_identifiables($array_values[1], $array_values[4]);
                            if ($test[0] === false) {
                                print(json_encode($test));
                                return;
                            }
                        } else {
                            print(json_encode([false, [["num serie double//" . $array_values[4]]]]));
                            return;
                        }
                    }
                }
            }
            // check stocks
            foreach ($stock_to_check as $code => $quantity) {
                // TODO : insert directlu $teste in the if condition
                $teste = check_available_stock($code, $quantity);
                if ($teste[0] === false) {
                    print(json_encode($teste));
                    return;
                }
            }
        }
    } catch (\Throwable $th) {
        $conn->rollback();
        print("error000");
        return;
    }

    // effectively saving to db
    ////saving general details order and getting new order uid
    $NewObj = new NewCommandeHeader($data["header"]);

    $Query1 = new Queries("save_new_commande");
    $Binding = new Bindings($NewObj);
    $Statement = new StandardPreparedStatement($Query1, $Binding);
    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    $data["header"]["uid"] = $temp_array_result[1][0][0];

    // echo "<br>jk<br>";
    // var_dump($temp_array_result);
    if (!$temp_array_result) {
        $conn->rollback();
        print("error01");
        print(json_encode($temp_array_result));
        return;
    } else {
        ////saving itemrow with the new order uid
        $new_commande_uid = $temp_array_result[1][0][0];

        try {
            foreach ($data["items"] as $array_values) {
                $ItemRowObj = new NewCommandeItem([...$array_values, $new_commande_uid]);
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
                    return;
                }
            }
        } catch (\Throwable $th) {
            $conn->rollback();
            print("error03");
            return;
        }

        //saving turning order to facture
        if (($_SERVER["REQUEST_METHOD"] == "POST") &&  (can_create("facture_client"))) {
            ////creating facture
            try {
                if ($data["header"]["state"] === 2) {

                    $NewFactureClientObj = new NewFactureClient([$data["header"]["uid"], $data["header"]["commercial"]]);
                    $Query3 = new Queries("save_new_facture_client");
                    $Binding3 = new Bindings($NewFactureClientObj);
                    $Statement3 = new StandardPreparedStatement($Query3, $Binding3);
                    $temp_array_result_fact = DbHandler::execute_prepared_statement($Statement3, MYSQLI_NUM);
                }
            } catch (\Throwable $th) {
                $conn->rollback();
                //error with new facture client
                print("error04 " . $th);
                return;
            }
            ////updating stock quantity for facture effectively created
            try {
                foreach ($stock_to_check as $item_code => $quantity) {
                    $UpdateStockObj = new UpdateStock(["code" => $item_code, "quantity" => $quantity]);
                    $Query4 = new Queries("update_stock_sub");
                    $Binding4 = new Bindings($UpdateStockObj);
                    $Statement4 = new StandardPreparedStatement($Query4, $Binding4);
                    $temp_array_stock_update = DbHandler::execute_prepared_statement($Statement4, MYSQLI_NUM);
                }
            } catch (\Throwable $th) {
                $conn->rollback();
                //error while updating stock quantity
                print("error06 " . $th);
                return;
            }
            ////updating status of identifiables
            try {
                foreach ($identifiables_to_check as $item_code => $num_serie_array) {
                    foreach($num_serie_array as $num_serie){
                        $UpdateIdentifiabletockObj = new UpdateIdentifiable(["code" => $item_code, "num_serie" => $num_serie,"actif"=>0]);
                        $Query5 = new Queries("update_identifiable");
                        $Binding5 = new Bindings($UpdateIdentifiabletockObj);
                        $Statement5 = new StandardPreparedStatement($Query5, $Binding5);
                        $temp_array_identifiable_update = DbHandler::execute_prepared_statement($Statement5, MYSQLI_NUM);
                    }

                }
            } catch (\Throwable $th) {
                $conn->rollback();
                //error while updating stock quantity
                print("error06 " . $th);
                return;
            }
        } else {
            $conn->rollback();
            print("error05 : NOT AUTHORIZED TO CREATE FACTURE CLIENT");
            return;
        }
    }
    $conn->commit();


    //just returning the command uid in the end
    if (\str_contains($_SERVER["HTTP_REFERER"], "facts_clt.php")) {
        print(json_encode($temp_array_result_fact));
    } else if (\str_contains($_SERVER["HTTP_REFERER"], "commandes.php")) {

        print(json_encode($temp_array_result));
    }
}
