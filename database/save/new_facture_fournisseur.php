<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\UpdateStock;
use Converter\UpdateIdentifiable;


use function Session\can_create;

use Database\StandardPreparedStatement;
use Converter\NewFactureFournisseurHeader;
use Converter\NewFactureFournisseurItem;
use Converter\NewIdentifiable;
use Database\Special\PrepareCommandeItems;



require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();

// require_once $_SERVER["DOCUMENT_ROOT"] . "/utilities/check_identifiables.php";


if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_create("facture_fournisseur"))) {
    $data = json_decode(file_get_contents('php://input'), true);

    // create connection
    $step1 = new DbHandler();
    $conn = $step1::$connection;
    $conn->begin_transaction();


    // $stock_to_check = [];
    // $identifiables_to_check = [];
    $preparation = new PrepareCommandeItems($data["items"]);
    $preparation->prepare_identifiables();
    $preparation->check_stocks();
    // // group quantities for easy stock checking
    // foreach ($data["items"] as $array_values) {
    //     // stockable?
    //     if ($array_values[7]) {
    //         if ($array_values[2] == 0) {
    //             continue;
    //         }
    //         // item alredy listed?
    //         if (!array_key_exists($array_values[1], $stock_to_check)) {
    //             $stock_to_check[$array_values[1]] = 0;
    //         }
    //         $stock_to_check[$array_values[1]] += $array_values[2];
    //         // identifiable? 
    //         if ($array_values[6]) {

    //             // item already listed?
    //             if (!array_key_exists($array_values[1], $identifiables_to_check)) {
    //                 $identifiables_to_check[$array_values[1]] = [];
    //             }
    //             // num-serie already listed?
    //             if (!in_array($array_values[4], $identifiables_to_check[$array_values[1]])) {
    //                 $identifiables_to_check[$array_values[1]][] = $array_values[4];
    //                 $test = check_identifiables($array_values[1], $array_values[4]);
    //                 if ($test[0] === false) {
    //                     print(json_encode($test));
    //                     return;
    //                 }
    //             } else {
    //                 print(json_encode([false, [["num serie double//" . $array_values[4]]]]));
    //                 return;
    //             }
    //         }
    //     }
    // }


    // treating headers
    // saving general details order and getting new order uid
    $NewObj = new NewFactureFournisseurHeader($data["header"]);


    $Query1 = new Queries("save_new_facture_fournisseur");
    $Binding = new Bindings($NewObj);
    $Statement = new StandardPreparedStatement($Query1, $Binding);
    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    $data["header"]["uid"] = $temp_array_result[1][0][0];

    if (!$temp_array_result) {
        // could not save factures header
        $conn->rollback();
        print("error01");
        print(json_encode($temp_array_result));
        return;
    } else {
        //success:saving itemrow with the new order uid
        $new_commande_uid = $temp_array_result[1][0][0];

        try {
            foreach ($data["items"] as $array_values) {
                if ($array_values[2] == 0) {
                    // quantity is zero
                    continue;
                }
                $ItemRowObj = new NewFactureFournisseurItem([...$array_values, $new_commande_uid]);
                $Query2 = new Queries("save_new_facture_fournisseur_row");
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

        //updating stock quantity for facture effectively created with no problem
        try {
            foreach ($preparation->stock_to_check as $item_code => $quantity) {
                if ($quantity == 0) {
                    continue;
                }
                $UpdateStockObj = new UpdateStock(["code" => $item_code, "quantity" => $quantity]);
                $queries_name = [
                    "facture" => "update_stock_add",
                    "avoir" => "update_stock_sub"
                ];
                $Query4 = new Queries($queries_name[$data["header"]["mode"]]);
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
        //entering new identifiables
        try {
            foreach ($preparation->identifiables_to_check as $item_code => $num_serie_array) {
                foreach ($num_serie_array as $num_serie) {
                    $NewIdentifiabletockObj = new NewIdentifiable(["item-code" => $item_code, "num-serie" => $num_serie, "actif" => 1, "magasin-uid" => $data["header"]["magasin"], "ref_in" => $new_commande_uid]);
                    $Query5 = new Queries("save_new_identifiable");
                    $Binding5 = new Bindings($NewIdentifiabletockObj);
                    $Statement5 = new StandardPreparedStatement($Query5, $Binding5);
                    $temp_array_identifiable_update = DbHandler::execute_prepared_statement($Statement5, MYSQLI_NUM);
                }
            }
        } catch (\Throwable $th) {
            $conn->rollback();
            //error while updating identifiable
            print("error06 " . $th);
            return;
        }
    }
    $conn->commit();

    print(json_encode($temp_array_result));
}
