<?php

use Database\Queries;
use Database\DbHandler;

new DbHandler();

$Query = new Queries("select_all_places_name_limit");
$all_places_name_limit = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
return $all_places_name_limit;
