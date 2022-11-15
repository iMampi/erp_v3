<?php 

use Database\Queries;
use Database\DbHandler;
new DbHandler();

$Query = new Queries("select_all_clients");
$all_clients = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
return $all_clients;
