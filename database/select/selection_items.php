<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\SelectionItems;
use function Session\can_visit;
use Converter\SelectionItemsAchat;

use Converter\SelectionItemsVente;
use Database\StandardPreparedStatement;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();


new DbHandler();



if (($_SERVER["REQUEST_METHOD"] == "POST")) {
    $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);
    $SelectionObj;
    if (str_contains($_SERVER["HTTP_REFERER"], "facts_clt.php")) {
        $SelectionObj = new SelectionItemsVente($data);
    } else if (str_contains($_SERVER["HTTP_REFERER"], "facts_frnsr.php")) {
        $SelectionObj = new SelectionItemsAchat($data);
    } else {
        $SelectionObj = new SelectionItems($data);
    }
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
