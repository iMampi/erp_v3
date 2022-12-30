<?php

use Database\Queries;
use Database\DbHandler;

new DbHandler();

$Query = new Queries("select_all_fournisseurs");
$all_fournisseurs_name = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
return $all_fournisseurs_name;
