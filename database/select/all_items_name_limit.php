<?php

use Database\Queries;
use Database\DbHandler;

new DbHandler();

$Query = new Queries("select_all_items_name_limit");
$all_items_name_limit = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
return $all_items_name_limit;
