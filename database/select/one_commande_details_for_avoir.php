<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use function Session\can_visit;
use Converter\SelectOneCommande;

use Converter\SelectionCommandeItems;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();


new DbHandler();



if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_visit("commande"))) {
    // if (\true) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);

    $SelectOneObj = new SelectOneCommande($data);
    // var_dump($NewClientObj);
    $Query = new Queries("select_one_commande");
    $Binding = new Bindings($SelectOneObj);
    $Statement = new StandardPreparedStatement($Query, $Binding);
    $commande_headers = DbHandler::execute_prepared_statement($Statement, \MYSQLI_ASSOC);

    $SelectionCommandeItems = new SelectionCommandeItems($data);
    $QueryDetails = new Queries("selection_commande_items_for_avoir");
    $BindingDetails = new Bindings($SelectionCommandeItems);
    $StatementDetails = new StandardPreparedStatement($QueryDetails, $BindingDetails);

    $commande_items = DbHandler::execute_prepared_statement($StatementDetails, \MYSQLI_ASSOC);

    print(json_encode(["header" => $commande_headers, "items" => $commande_items]));
    // print(json_encode(DbHandler::execute_prepared_statement($Statement)));
    // foreach ($arr_banks as $value) {
    //     $converter_bank[$value["bank_name"]] = $value["bank_table"];
} else {
    print(json_encode([\false, ['error' => "unauthorized"]]));
}
