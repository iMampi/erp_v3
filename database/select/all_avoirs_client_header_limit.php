<?php

use Database\Queries;
use Database\DbHandler;

new DbHandler();

try {
    $Query = new Queries("select_all_avoirs_client_header_limit");
    $all_avoirs_client_header_limit = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
} catch (\Throwable $th) {
}

//return $all_commandes_header_limit;
