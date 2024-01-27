<?php

use Converter\IdentifiableChecker;
use Database\Queries;
use Database\Bindings;
use Database\DbHandler;
use Database\StandardPreparedStatement;


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
