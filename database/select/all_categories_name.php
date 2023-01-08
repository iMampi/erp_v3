<?php

use Database\Queries;
use Database\DbHandler;

new DbHandler();

$Query = new Queries("select_all_categories_name");
$all_categories_name = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
return $all_categories_name;
