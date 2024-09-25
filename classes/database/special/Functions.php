<?php

namespace Database\Special;


use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\ItemStockChecker;
use Converter\IdentifiableChecker;
use Database\StandardPreparedStatement;

require_once __DIR__ . "/../../../vendor/autoload.php";

function check_identifiables($item_code, $num_serie): array
{
    $IdentifiableToCheck = new IdentifiableChecker(["code" => $item_code, "num-serie" => $num_serie]);
    $Query1 = new Queries("check_identifiable");
    $Binding = new Bindings($IdentifiableToCheck, $Query1);
    $Statement = new StandardPreparedStatement($Query1, $Binding);
    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    return $temp_array_result;
    if ((!$temp_array_result[0]) || (count($temp_array_result[1]) !== 1) || ($temp_array_result[1][0][2] == 0)) {

        return [false, [["num serie not available//" . $item_code]]];
    }
    return [true];
}

function check_available_stock($item_code, $quantity): array
{
    $ItemStock = new ItemStockChecker(["code" => $item_code]);
    $Query1 = new Queries("check_item_stock");
    $Binding = new Bindings($ItemStock, $Query1 = new Queries("check_item_stock"));
    $Statement = new StandardPreparedStatement($Query1, $Binding);
    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    if ((!$temp_array_result[0]) || ($temp_array_result[1][0][1] < $quantity)) {

        return [false, [["not enough stock//" . $item_code]]];
    }
    return [true];
}

function call_me()
{
    echo "this is f it";
}
