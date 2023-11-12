<?php

use Converter\SelectionCommandeAvoirItems;
use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use function Session\can_visit;

use Converter\SelectionCommandeItems;
use Converter\SelectOneFactureClient;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();


new DbHandler();



if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_visit("facture_client"))) {
    // if (\true) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);

    $SelectOneObj = new SelectOneFactureClient($data);
    // var_dump($NewClientObj);
    $Query = new Queries("select_one_facture_client");
    $Binding = new Bindings($SelectOneObj);
    $Statement = new StandardPreparedStatement($Query, $Binding);
    $commande_headers = DbHandler::execute_prepared_statement($Statement, \MYSQLI_ASSOC);

    if (!$data["uid"]) {
        if (empty($commande_headers[1][0])) {
            print(json_encode([true, "no match"]));
        } else {
            $data["uid"] = $commande_headers[1][0]["commande_uid"];
        }
    }
    $SelectionCommandeAvoirItems = new SelectionCommandeAvoirItems($data);
    $QueryDetails = new Queries("selection_commande_items_for_avoir");
    $BindingDetails = new Bindings($SelectionCommandeAvoirItems);
    $StatementDetails = new StandardPreparedStatement($QueryDetails, $BindingDetails);

    $commande_items = DbHandler::execute_prepared_statement($StatementDetails, \MYSQLI_ASSOC);

    print(json_encode(["header" => $commande_headers, "items" => $commande_items]));
    // print(json_encode(DbHandler::execute_prepared_statement($Statement)));
    // foreach ($arr_banks as $value) {
    //     $converter_bank[$value["bank_name"]] = $value["bank_table"];

} else {
    print(json_encode([\false, ['error' => "unauthorized"]]));
}
