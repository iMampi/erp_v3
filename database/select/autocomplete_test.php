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



if (true) {
    // var_dump($_GET);
    // $data = json_decode(file_get_contents('php://input'), true);
    // var_dump($data);
    $substring = $_GET["term"];
    $SelectionObj = new SelectionItems(["code" => $substring, "name" => $substring]);
    // var_dump($NewClientObj);
    $Query = new Queries("selection_items");
    $myquery = $Query->query . $SelectionObj->conditions;
    // print($SelectOneCLientObj->conditions);
    // $Binding = new Bindings($SelectOneCLientObj);
    // $Statement = new StandardPreparedStatement($Query, $Binding);
    // DbHandler::select_query($myquery);

    // TODO : use prepared statement
    // print($myquery);

    // print(json_encode(DbHandler::select_query($myquery, MYSQLI_ASSOC)));
    $final = [];
    $results = DbHandler::select_query($myquery, MYSQLI_ASSOC);
    foreach ($results as $value) {
        $final[] = ["label" => $value["code"] . " - " . $value["name"], "value" => $value["name"], "prix" => $value["prix_vente"]];
    }
    print(json_encode($final));
    // print(json_encode([
    //     ["label" => "michael", "value" => "23"],
    //     ["label" => "scotty", "value" => "10"],
    //     ["label" => "denis", "value" => "55"]
    // ]));
    // print(json_encode(DbHandler::execute_prepared_statement($Statement)));


} else {
    print(json_encode([\false, ['error' => "unauthorized"]]));
}
