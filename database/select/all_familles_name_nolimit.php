<?php

use Database\Queries;
use Database\DbHandler;

new DbHandler();

$Query = new Queries("select_all_familles_name_nolimit");
$all_familles_name = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
return $all_familles_name;
