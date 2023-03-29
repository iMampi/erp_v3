<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\GetItemPrice;
use Converter\SelectionItems;

use function Session\can_visit;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();


new DbHandler();



if (($_SERVER["REQUEST_METHOD"] == "POST")) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);

    $SelectionObj = new GetItemPrice($data);
    // var_dump($NewClientObj);
    $Query = new Queries("get_item_price");
    $myquery = $Query->query . $SelectionObj->conditions;
    // print($SelectOneCLientObj->conditions);
    // $Binding = new Bindings($SelectOneCLientObj);
    // $Statement = new StandardPreparedStatement($Query, $Binding);
    // DbHandler::select_query($myquery);

    // TODO : use prepared statement and bind it all
    // print($myquery);
    print(json_encode(DbHandler::select_query($myquery, MYSQLI_ASSOC)));

    // print(json_encode(DbHandler::execute_prepared_statement($Statement)));


} else {
    print(json_encode([\false, ['error' => "unauthorized"]]));
}
