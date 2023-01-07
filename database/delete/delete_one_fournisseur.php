<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\DeleteFournisseur;
use Database\StandardPreparedStatement;

use function Session\can_delete;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();

new DbHandler();
if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_delete("fournisseur"))) {

    $data = json_decode(file_get_contents('php://input'), true);

    $DeleteFournisseurObj = new DeleteFournisseur($data);

    $Query = new Queries("delete_fournisseur");
    // echo 'query <br>';
    // var_dump($Query);
    $Binding = new Bindings($DeleteFournisseurObj);
    $Statement = new StandardPreparedStatement($Query, $Binding);
    print(json_encode(DbHandler::execute_prepared_statement($Statement)));
}
