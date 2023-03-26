<?php

use Database\Queries;
use Database\DbHandler;

new DbHandler();

$Query = new Queries("select_all_active_clients_limit");
$all_active_clients_limit = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
return $all_active_clients_limit;
