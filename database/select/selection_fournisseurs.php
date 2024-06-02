<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;

use function Session\can_visit;

use Converter\SelectionFournisseurs;
use Database\StandardPreparedStatement;

require_once __DIR__ . "/../../vendor/autoload.php";

session_start();


new DbHandler();



if (($_SERVER["REQUEST_METHOD"] == "POST")) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);

    $SelectionObj = new SelectionFournisseurs($data);
    // var_dump($NewClientObj);
    $Query = new Queries("selection_fournisseurs");
    $myquery = $Query->query . $SelectionObj->conditions;
    // print($SelectOneCLientObj->conditions);
    // $Binding = new Bindings($SelectOneCLientObj);
    // $Statement = new StandardPreparedStatement($Query, $Binding);
    // DbHandler::select_query($myquery);

    // TODO : use prepared statement
    // print($myquery);
    print(json_encode(DbHandler::select_query($myquery, MYSQLI_ASSOC)));

    // print(json_encode(DbHandler::execute_prepared_statement($Statement)));


} else {
    print(json_encode([\false, ['error' => "unauthorized"]]));
}
