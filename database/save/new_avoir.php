<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\NewAvoirClient;
use function Session\can_create;
use Converter\NewCommandeAvoirItem;
use Converter\NewCommandeAvoirHeader;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();


if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_create("avoir_client"))) {
    $data = json_decode(file_get_contents('php://input'), true);


    // DbHandler::$connection->autocommit(\false);

    $step1 = new DbHandler();
    $conn = $step1::$connection;
    $conn->begin_transaction();

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
    } else {
        //succesful
        $new_commande_uid = $temp_array_result[1][0][0];

        try {
            foreach ($data["items"] as $array_values) {
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
                }
            }
        } catch (\Throwable $th) {
            $conn->rollback();
            print("error03");
        }

        if (($_SERVER["REQUEST_METHOD"] == "POST") &&  (can_create("avoir_client"))) {
            try {
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
            }
        } else {
            $conn->rollback();
            print("error05 : NOT AUTHORIZED TO CREATE AVOIR CLIENT");
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
