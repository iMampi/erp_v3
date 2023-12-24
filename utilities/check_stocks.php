<?php

use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Converter\ItemStockChecker;
use Database\StandardPreparedStatement;

function check_available_stock($item_code, $quantity)
{
    $ItemStock = new ItemStockChecker(["code" => $item_code]);
    $Query1 = new Queries("check_item_stock");
    $Binding = new Bindings($ItemStock, $Query1 = new Queries("check_item_stock"));
    $Statement = new StandardPreparedStatement($Query1, $Binding);
    $temp_array_result = DbHandler::execute_prepared_statement($Statement, MYSQLI_NUM);
    return $temp_array_result;
}
