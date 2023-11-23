<?php

use Converter\FilterFactures;
use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Database\StandardPreparedStatement;

use function Session\can_visit;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();


new DbHandler();



if (($_SERVER["REQUEST_METHOD"] == "POST") && (can_visit("magasin"))) {
    $data = json_decode(file_get_contents('php://input'), true);

    $FilterObj = new FilterFactures($data);
    $Query = new Queries("filter_factures");
    $myquery = $Query->query . $FilterObj->conditions;

    // TODO : use prepared statement

    print(json_encode(DbHandler::select_query($myquery, MYSQLI_ASSOC)));

    // print(json_encode(DbHandler::execute_prepared_statement($Statement)));


} else {
    print(json_encode([\false, ['error' => "unauthorized"]]));
}