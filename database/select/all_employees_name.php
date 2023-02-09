<?php

use Database\Queries;
use Database\DbHandler;

new DbHandler();

$Query = new Queries("select_all_employees_name");
$all_emps = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
return $all_emps;
