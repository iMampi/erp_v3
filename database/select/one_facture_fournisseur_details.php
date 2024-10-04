<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use function Session\can_visit;

use Converter\SelectionFactureFournisseurItemsObj;
use Converter\SelectionFactureFournisseurItems;
use Converter\SelectOneFactureFournisseur;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();


new DbHandler();



if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_visit("facture_fournisseur"))) {
    $data = json_decode(file_get_contents('php://input'), true);

    $SelectOneObj = new SelectOneFactureFournisseur($data);
    // var_dump($NewClientObj);
    $Query = new Queries("select_one_facture_fournisseur");
    $Binding = new Bindings($SelectOneObj);
    $Statement = new StandardPreparedStatement($Query, $Binding);
    $commande_headers = DbHandler::execute_prepared_statement($Statement, \MYSQLI_ASSOC);

    if (!$data["facture-uid"]) {
        if (empty($commande_headers[1][0])) {
            print(json_encode([true, "no match"]));
        } else {
            $data["facture-uid"] = $commande_headers[1][0]["facture_uid"];
        }
    }
    $SelectionFactureFournisseurItemsObj = new SelectionFactureFournisseurItems($data);
    $QueryDetails = new Queries("selection_facture_fournisseur_items");
    $BindingDetails = new Bindings($SelectionFactureFournisseurItemsObj);
    $StatementDetails = new StandardPreparedStatement($QueryDetails, $BindingDetails);

    $commande_items = DbHandler::execute_prepared_statement($StatementDetails, \MYSQLI_ASSOC);

    print(json_encode(["header" => $commande_headers, "items" => $commande_items]));
    // print(json_encode(DbHandler::execute_prepared_statement($Statement)));
    // foreach ($arr_banks as $value) {
    //     $converter_bank[$value["bank_name"]] = $value["bank_table"];

} else {
    print(json_encode([\false, ['error' => "unauthorized"]]));
}
