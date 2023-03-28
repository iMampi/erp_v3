<?php

use Converter\SelectionItems;
use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Database\StandardPreparedStatement;

use function Session\can_visit;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();


new DbHandler();



if (($_SERVER["REQUEST_METHOD"] == "POST")) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);

    $SelectionObj = new SelectionItems($data);
    // var_dump($NewClientObj);
    $Query = new Queries("selection_items");
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
