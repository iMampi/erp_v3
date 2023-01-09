<?php

use Converter\DeleteCategorie;
use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\DeleteFournisseur;
use Database\StandardPreparedStatement;

use function Session\can_delete;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";
session_start();

new DbHandler();
if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_delete("categorie"))) {

    $data = json_decode(file_get_contents('php://input'), true);

    $DeleteObj = new DeleteCategorie($data);

    $Query = new Queries("delete_categorie");
    // echo 'query <br>';
    // var_dump($Query);
    $Binding = new Bindings($DeleteObj);
    $Statement = new StandardPreparedStatement($Query, $Binding);
    print(json_encode(DbHandler::execute_prepared_statement($Statement)));
}
