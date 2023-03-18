<?php

use Database\Queries;
use Database\DbHandler;

new DbHandler();

$Query = new Queries("select_all_families_name_limit");
$all_families_name = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
return $all_families_name;
