<?php

use Database\Queries;
use Database\DbHandler;

new DbHandler();

try {
    $Query = new Queries("select_all_avoirs_client_header_limit");
    $all_avoirs_client_header_limit = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
    return $all_avoirs_client_header_limit;
} catch (\Throwable $th) {
    return "error here : " . $th;
}
