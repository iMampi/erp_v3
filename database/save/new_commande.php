<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\NewCommandeItem;
use Converter\NewFactureClient;
use Converter\NewCommandeHeader;

use function Session\can_create;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();

require_once $_SERVER["DOCUMENT_ROOT"] . "/utilities/check_stocks.php";

if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_create("commande"))) {
    $data = json_decode(file_get_contents('php://input'), true);


    // DbHandler::$connection->autocommit(\false);
    $step1 = new DbHandler();
    $conn = $step1::$connection;
    $conn->begin_transaction();


    //check the inventory item disponibilities 
    $disponibilities = [];
    try {
        // TODO : dont forget to put me back to normal
        if ($data["header"]["state"] === 2) {
        // if (true) {
            foreach ($data["items"] as $array_values) {
                // stockable?
                # code...
                if ($array_values[7]) {
                    if (!array_key_exists($array_values[0], $disponibilities)) {
                        $disponibilities[$array_values[1]] = 0;
                    }
                    $disponibilities[$array_values[1]] += $array_values[2];
                    // identifiable? 
                    if ($array_values[6]) {
                        // check if in stock identifiable
                    }
                    // }
                }
            }
        }
        // check stocks
        foreach ($disponibilities as $code => $quantity) {
            // TODO : insert directlu $teste in the if condition
            $teste = check_available_stock($code, $quantity);
            if ($teste[0]) {
                if ($teste[1][0][1] < $quantity) {
                    print(json_encode([false, [["not enough stock//".$code]]]));
                    return;
                }
            } else {
                throw new Exception("Error Processing Request teh query");
            }
        }
    } catch (\Throwable $th) {
        $conn->rollback();
        print("error000");
    }

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
    } else {
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
                    break;
                }
            }
        } catch (\Throwable $th) {
            $conn->rollback();
            print("error03");
        }

        if (($_SERVER["REQUEST_METHOD"] == "POST") &&  (can_create("facture_client"))) {
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
                print("error04" . $th);
            }
        } else {
            $conn->rollback();
            print("error05 : NOT AUTHORIZED TO CREATE FACTURE CLIENT");
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
